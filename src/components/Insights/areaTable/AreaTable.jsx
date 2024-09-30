import "./AreaTable.scss";
import React, {useEffect, useState} from 'react'
import axios from "axios";
import { IoIosAlert } from "react-icons/io";

const AreaTable = () => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
const [transactions, setTransactions] = useState([]);
const fetchTransactionsData = async () => {
    try {
        // Retrieve token from local storage
        const token = localStorage.getItem('access_token');
  
        // Make API request to fetch courses
        const response = await axios.get('http://localhost:8000/api/transactions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching Data:', error);
      }
} ;
useEffect(() => {
    fetchTransactionsData();
},[]);
const TABLE_HEADS = [
  "Customer",
  "Course",
  "Status",
  "Payment Methode",
  "Amount",
  "purchase Date ",
];

  return (
      <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Purchases</h4>
      </div>
      <div className="data-table-diagram">
        {
          transactions.length === 0 ?
          (
            <div className='areatable__not_found'>
              <IoIosAlert style={{ color: '#17bf9e', fontSize: '20px', marginRight: '5px'}}/>
              <p>No Data Found</p>
            </div>

          ) :
          (
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

          )
        }
        
      </div>
    </section>

  
  );
};

export default AreaTable;