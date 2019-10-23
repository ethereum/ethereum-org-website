const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const baseURL =
      'https://api.crowdin.com/api/project/ethereumfoundation/status';
    const { CROWDIN_API_KEY } = process.env;

    const response = await fetch(`${baseURL}?key=${CROWDIN_API_KEY}&json`);

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
};
