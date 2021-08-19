export const USER_DATA = 'USER_DATA';
export const EXPENSE_DATA = 'EXPENSE_DATA';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const DELETE_ITEM = 'DELETE_ITEM';

export function userExpenses(payload) {
  return {
    type: EXPENSE_DATA,
    payload,
  };
}

export function userLogin({ email }) {
  return {
    type: USER_DATA,
    email,
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
}

function requestCurrency() {
  return {
    type: REQUEST_CURRENCY,
  };
}

function receiveCurrency(currencies) {
  return {
    type: RECEIVE_CURRENCY,
    payload: [
      currencies.USD,
      currencies.CAD,
      currencies.EUR,
      currencies.GBP,
      currencies.ARS,
      currencies.BTC,
      currencies.LTC,
      currencies.JPY,
      currencies.CHF,
      currencies.AUD,
      currencies.CNY,
      currencies.ILS,
      currencies.ETH,
      currencies.XRP,
    ],
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    return dispatch(receiveCurrency(currencies));
  };
}

export function fetchExpenses(payload) {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const rate = await response.json();
    return dispatch(userExpenses({ ...payload, exchangeRates: rate }));
  };
}
