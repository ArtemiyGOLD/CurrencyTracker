async function fetchExchangeRates() {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    updateCurrencyList(data.rates);
    populateCurrencyOptions(data.rates);
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

function updateCurrencyList(rates) {
  const currencyList = document.getElementById("currencyList");
  currencyList.innerHTML = "";
  for (const [currency, rate] of Object.entries(rates)) {
    const currencyItem = document.createElement("div");
    currencyItem.className = "currency-item";
    currencyItem.innerHTML = `<span>USD/${currency}</span><span>${rate.toFixed(
      2
    )}</span>`;
    currencyList.appendChild(currencyItem);
  }
}

function populateCurrencyOptions(rates) {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  for (const currency in rates) {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);
    const option2 = option1.cloneNode(true);
    toCurrency.appendChild(option2);
  }
}

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[toCurrency];
      const result = amount * rate;
      document.getElementById(
        "conversionResult"
      ).textContent = `${amount} ${fromCurrency} = ${result.toFixed(
        2
      )} ${toCurrency}`;
    });
}

async function fetchExchangeRates() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        console.log(data); // Для отладки
        updateCurrencyList(data.rates);
        populateCurrencyOptions(data.rates);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

window.onload = fetchExchangeRates;
