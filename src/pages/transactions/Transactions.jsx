import React, {useEffect, useState} from 'react'
import axios from "axios";
import { NoDataFound } from '../../components'
import ReactPaginate from 'react-paginate';

import './transactions.css'

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);


  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // ReactPaginate is 0-indexed
    setCurrentPage(selectedPage);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
    
    const FetchTransactionsData = async (page = 1) => {
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem('access_token');
      
            // Make API request to fetch courses
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactions`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            setTransactions(response.data.data);
            setPageCount(response.data.last_page);
          } catch (error) {
            console.error('Error fetching Data:', error);
          }
    } ;
    useEffect(() => {
        FetchTransactionsData(currentPage);
    },[currentPage]);

    const TABLE_HEADS = [
        "Customer",
        "Course",
        "Status",
        "Payment Methode",
        "Amount",
        "purchase Date ",
      ];
  return (
    <div className='elearning__heading'>
        <h4>Transactions</h4>
        {
          transactions.length === 0 ?
          (
            <NoDataFound/>
          ) :
          (
            <section className="content-area-table">
            <div className="data-table-info">
              <h4 className="data-table-title">Latest Purchases</h4>
            </div>
            <div className="data-table-diagram">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS?.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((dataItem) => {
                    return (
                      <tr key={dataItem.id}>
                        <td>{dataItem.user.first_name} {dataItem.user.last_name}</td>
                        <td>{dataItem.course.title}</td>
                        <td><span className='status_span'>{dataItem.status}</span></td>
                        <td>{dataItem.payment_method}</td>
                        <td>${dataItem.course.price}</td>
                        <td>{formatDate(dataItem.purchase_date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
             <ReactPaginate
             previousLabel="<"
             nextLabel=">"
             breakLabel="..."
             breakClassName={"break-me"}
             pageCount={pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={handlePageClick}
             containerClassName={"pagination"}
             subContainerClassName={"pages pagination"}
             activeClassName={"active"}
              />
              </div>
          </section>

          )}
  </div>
  )
}

export default Transactions
