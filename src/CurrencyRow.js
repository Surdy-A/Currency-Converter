import React from "react";

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <>
      <div className="bgi">
        <div className="row">
          <input
            type="number"
            className="col border-lg space "
            value={amount}
            onChange={onChangeAmount}
          />
          <select
            className="col border-lg space"
            value={selectedCurrency}
            onChange={onChangeCurrency}
          >
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default CurrencyRow;
