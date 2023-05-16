const axios = require('axios');
const fs = require('fs');

axios.defaults.baseURL = 'http://localhost:3001';

(async () => {
  try {
    const response = await fetch('/api/hello');
    console.log(response);

    console.log('Data written to file');
  } catch (error) {
    console.error(error);
  }
})();
