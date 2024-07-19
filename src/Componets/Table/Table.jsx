import React, { useState, useEffect } from "react";
import { fetchCustomers, fetchTransactions } from "../../GetData/GetData";
import Graph from "../Graph/Graph";

function Table() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const customersResponse = await fetchCustomers();
      const transactionsResponse = await fetchTransactions();
      setCustomers(customersResponse.data.customers);
      setTransactions(transactionsResponse.data.transactions);
      // console.log(transactionsResponse.data.transactions[0].date)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const getCustomerTransactions = (customerId) => {
    return transactions.filter((transaction) => {
      const transactionCustomerId = String(transaction.customer_id); // Ensure ID is a string
      return transactionCustomerId === String(customerId); // Ensure comparison is between strings
    });
  };

  const calculateTotalAmount = (customerTransactions) => {
    return customerTransactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.amount); // Ensure amount is a number
      return total + amount;
    }, 0);
  };
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };
  const filterAmountNumber = parseFloat(filterAmount);

  return (
    <div className="container">
      <div>
        <h2 className="mt-2 text-center ">Customer and  Transactions </h2>

        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control mb-3 w-100"
        />
        <input
          type="number"
          placeholder="Filter by transaction amount"
          value={filterAmount}
          onChange={(e) => setFilterAmount(e.target.value)}
          className="form-control mb-3"
        />
      </div>
      <table className="table table-striped table-responsive ">
        <thead className="table-primary">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => {
            const customerTransactions = getCustomerTransactions(customer.id);
            const totalAmount = calculateTotalAmount(customerTransactions);
            if (filterAmountNumber && totalAmount < filterAmountNumber) {
              return null;
            }

            return (
              <tr
                key={customer.id}
                onClick={() => handleCustomerClick(customer)}
                style={{ cursor: "pointer" }}
              >
                <td>{customer.id}</td>
                <td>{customer.name}</td>
          
                <td>{totalAmount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedCustomer && (
        <div className="graph-container">
          <h3>Transaction Graph for {selectedCustomer.name}</h3>
          <Graph
            customers={[selectedCustomer]}
            transactions={getCustomerTransactions(selectedCustomer.id)}
          />
        </div>
      )}
    </div>
  );
}

export default Table;












