import axios from 'axios';

const API_URL = 'https://mohamedrezk98.github.io/route-job/db.json';

export const fetchCustomers = () => axios.get(`${API_URL}`);
export const fetchTransactions = () => axios.get(`${API_URL}`);

fetchCustomers()
  .then(response => {
    console.log('Customers:', response.data.customers);
  })
  .catch(error => {
    console.error('Error fetching customers:', error);
  });

fetchTransactions()
  .then(response => {
    console.log('Transactions:', response.data.transactions);
  })
  .catch(error => {
    console.error('Error fetching transactions:', error);
  });