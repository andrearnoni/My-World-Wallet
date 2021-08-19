import {
  EXPENSE_DATA,
  REQUEST_CURRENCY,
  RECEIVE_CURRENCY,
  DELETE_ITEM,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  const list = JSON.parse(localStorage.getItem('transactions'));
  switch (action.type) {
  case EXPENSE_DATA:
    list.push(action.payload);
    localStorage.setItem('transactions', JSON.stringify(list));
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
    };
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case DELETE_ITEM:
    { const newList = list.filter((item) => item.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(newList)); }
    return {
      ...state,
      expenses: [...state.expenses.filter(({ id }) => id !== action.payload)],
    };
  default:
    return state;
  }
}

export default wallet;
