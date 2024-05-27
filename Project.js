`strict use`

const API_KEY = '36D69972-2491-446A-A9D4-52F1CFD5DE75';
const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
  };

const cryptoHistory = [];
const cryptos = []
// spread operator
const combined = [...cryptos, ...cryptoHistory]

btn.addEventListener("click", async event => {
    event.preventDefault();
    let currency = document.getElementById("currency").value;
    let crypto = document.getElementById("crypto").value;
    let amount = document.getElementById("amount").value;

    localStorage.setItem('crypto', crypto);
    localStorage.setItem('amount', amount);
    localStorage.setItem('currency', currency);
    
    

    
    cryptoHistory.push(crypto);

    if(crypto && currency){
        try {
            const data = await fetchData(crypto,currency);
            displayRate(data);
            getTitle(2);
        }
        catch(error){
            console.log(error);
            ErrorAnimation()
        }
    }
    else{ErrorAnimation()}

} )



// async function fetchData(crypto, currency) {


//     const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}`, {
//       headers: {
//         'X-CoinAPI-Key': API_KEY
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error(`Error status: ${response.status}`);
//     }
    
//     return await response.json();

// }
function fetchData(crypto, currency) {
  return new Promise(async (resolve, reject) => {
      try {
          const response = await fetch(`https://rest.coinapi.io/v1/exchangerate/${crypto}/${currency}`, {
              headers: {
                  'X-CoinAPI-Key': API_KEY
              }
          });
          
          if (!response.ok) {
              throw new Error(`Error status: ${response.status}`);
          }
          
          const data = await response.json();
          resolve(data);
      } catch (error) {
          reject(error);
      }
  });
}


let getSymbol = currency => {
  return currencySymbols[currency] 

}

let displayRate = (data) => {

    const {rate , time  } = data; // destructuring

    let currency = document.getElementById("currency").value;
    console.log(currency.toLowerCase())
    let crypto = document.getElementById("crypto").value;
    let syb = getSymbol(currency);

    setCryptoImage(crypto)
    setCurrencyImage(currency)
    

    p = document.createElement('p')
    p2 = document.createElement('p')
    p3 = document.createElement('p')


    p.textContent = "Rate: " + syb + ' '+ rate.toFixed(4) 
    p2.textContent += "Time: " + new Date(time).toLocaleString();
    p3.textContent = "Amount: " + syb + ' ' + (rate * document.getElementById("amount").value).toFixed(4) + " "
    
    let div = document.getElementsByClassName("output")[1]
    let div2 = document.getElementsByClassName("output")[2]
    let div3 = document.getElementsByClassName("output")[0]

    
    div.textContent = ""
    div2.textContent = ""
    div3.textContent = ""

    div2.appendChild(p2)
    div.appendChild(p)
    div3.appendChild(p3)
    
   
    p.style.fontSize = "20px"
    p2.style.fontSize = "13px"
    p3.style.fontSize = "20px"
  
}

let ErrorAnimation = () => {
    const div = document.getElementById('container')
    div.classList.toggle("error-message")

}

 
let setCryptoImage = (cryptoName) => {
    const imgElement = document.getElementById('crypto-image');
    imgElement.src = `icon/${cryptoName}.svg`;
    imgElement.style.display = 'block';
}
let setCurrencyImage = (currencyName) => {
    const imgElement = document.getElementById('currency-image');
    imgElement.src = `icon/${currencyName}.svg`;
    imgElement.style.display = 'block';
}

let getHistory = (cryptoHistory)=> {

 
  let crypto = document.getElementById("crypto").value;
  
  let history = document.getElementById("history");
  
  history.textContent = "";

  
  // Itereren over de cryptoHistory array
  for (const crypto of cryptoHistory) {
    const li = document.createElement('li');
    li.textContent = crypto;
    history.appendChild(li);
  
    
  }
  
    
}

let btn2 = document.getElementById("btn2");

btn2.addEventListener("click", async event => {
    event.preventDefault();
    
    
    getHistory(cryptoHistory);

})

// Use the spread operator to get the highest rate of the given cryptos
// Example: getHighestRate(1, 2, 3, 4, 5) => 5

let getHighestRate = (...cryptos) => {
    return Math.max(...cryptos);
}


function getTitle(id) {
  const apiURL = `https://jsonplaceholder.typicode.com/posts/${id}`;

  fetch(apiURL)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Error status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          console.log('Title received:', data.title);
          
      })
      .catch(error => {
          console.error('Error :', error);
          
      });
}



















