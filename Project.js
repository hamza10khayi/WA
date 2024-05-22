`strict use`

const API_KEY = '36D69972-2491-446A-A9D4-52F1CFD5DE75';

let form = document.getElementById("form")

async function fetchData(crypto, currency) {
  try {
    const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}`, {
      headers: {
        'X-CoinAPI-Key': API_KEY
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data)
    //data.rate => for rate
    // data.time for time
  } catch (error) {
    console.error('Error fetching data from CoinAPI.io:', error);
  }
}



form.addEventListener("submit", event => {
    event.preventDefault();
    let currency = document.getElementById("currency").value;
    let crypto = document.getElementById("crypto").value;
    fetchData(crypto,currency)
} )

