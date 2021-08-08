import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Input from "./input";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [currency, setCurrency] = useState(null);
  const [currencyEl_one, setCurrencyEl_one] = useState("USD");
  const [currencyEl_two, setCurrencyEl_two] = useState("EUR");
  const [rate, setRate] = useState();
  const [amountEl_one, setAmountEl_one] = useState(1);
  const [amountEl_two, setAmountEl_two] = useState();

  const endpoint = "latest";
  const api_key = "e00648f89527be1d3a00e3792ce96add";
  const base_url = "https://api.currencyscoop.com/v1/";

  const changeAmountOne = (event) => {
    var amount = event.target.value;
    setAmountEl_one(amount);
  };

  const hnadleCurrencyOne = (event) => {
    var currency = event.target.value;
    setCurrencyEl_one(currency);
  };

  const handleCurrTwo = (event) => {
    var currencyTwo = event.target.value;
    setCurrencyEl_two(currencyTwo);
  };

  const handleSwap = (event) => {
    event.preventDefault();
    var temp = currencyEl_one;
    var temp2 = currencyEl_two;
    setCurrencyEl_two(temp);
    setCurrencyEl_one(temp2);
  };
  const calculate = async () => {
    const currency_one = currencyEl_one;
    const currency_two = currencyEl_two;
    // https://api.exchangerate-api.com/v4/latest/${currency_one}

    try {
      const rates = await fetch(base_url + endpoint + "?api_key=" + api_key);

      const currency = await fetch(
        base_url + "currencies" + endpoint + "?api_key=" + api_key
      );

      const dataJSON = await rates.json();
      const currencyJSON = await currency.json();

      if (dataJSON && currencyJSON) {
        setCurrency(Object.values(currencyJSON.response.fiats));
        console.log(dataJSON.response.rates);
        console.log(currencyJSON.response.fiats);
        setLoading(false);

        const rate = dataJSON.response.rates[currency_two];
        const rate2 = dataJSON.response.rates[currency_one];
        setRate(rate);
        setAmountEl_two((amountEl_one * (rate / rate2)).toFixed(3));
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculate();
  }, [amountEl_one, amountEl_two, currencyEl_one, currencyEl_two]);

  return (
    <>
      <section class="bg-primary bg-gradient text-white pt-0 my-0 base">
        <div class="container px-2 text-center">
          <img
            src="assets/images/money.png"
            alt="currency"
            className="money-img img-fluid mx-auto d-block rotate mt-0"
          />
          <h1 class="fw-bolder">Exchange Rate Calculator</h1>
          <p class="lead">
            Choose the currency and the amounts to get the exchange rate
          </p>
          {loading ? (
            <div className="mb-5">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <form className="my-0">
              <Input
                currValue={currencyEl_one}
                currFunc={hnadleCurrencyOne}
                currency={currency}
                amountvalue={amountEl_one}
                amountFunc={changeAmountOne}
              />
              <div class="row mt-1">
                <div class="col">
                  <button
                    class="btn btn-success ml-5"
                    id="swap"
                    onClick={handleSwap}
                  >
                    Swap
                  </button>
                </div>
                <div class="col">
                  {`1 ${currencyEl_one} = ${
                    rate ? rate.toFixed(3) : rate
                  } ${currencyEl_two}`}
                </div>
              </div>

              <div class="col"></div>
              <Input
                currValue={currencyEl_two}
                currFunc={handleCurrTwo}
                currency={currency}
                amountValue={amountEl_two}
              />
            </form>
          )}
        </div>
      </section>

      <footer class="py-2 pb-2  bg-dark  navbar-static-bottom text-center">
        <div class="">
          <p class="m-0 text-center text-white">
            Built with <i class="fa fa-heart" aria-hidden="true"></i> by
            <a
              href="https://github.com/Surdy-A/Currency-Converter"
              className="text-white"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Ajayi Sodiq{" "}
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
