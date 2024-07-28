import "./AreaTable.scss";

const TABLE_HEADS = [
  "Courses",
  "Order ID",
  "Date",
  "Customer name",
  "Category",
  "Amount",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "Security",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "Security",
    amount: 400,
  },
  {
    id: 101,
    name: "Networking",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "Networking",
    amount: 288,
  },
  {
    id: 102,
    name: "Cloud",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "Cloud",
    amount: 500,
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Latest Orders</h4>
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
            {TABLE_DATA?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.name}</td>
                  <td>{dataItem.order_id}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.customer}</td>
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${dataItem.status}`}
                      ></span>
                      <span className="dt-status-text">{dataItem.status}</span>
                    </div>
                  </td>
                  <td>${dataItem.amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;