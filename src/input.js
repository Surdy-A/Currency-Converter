import React from "react";

function Input(props) {
  return (
    <div>
        <div class="row my-2">
          <div class="col">
            <select
              id="text"
              class="form-control"
              value={props.currValue}
              onChange={props.currFunc}
            >
              {props.currency
                ? props.currency.map((country, id) => (
                    <option value={country.currency_code} key={country.id}>
                      {country.currency_name}{" "}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control"
              placeholder="0"
              value={props.amountValue}
              onChange={props.amountFunc}
            />
          </div>
        </div>
    </div>
  );
}

export default Input;
