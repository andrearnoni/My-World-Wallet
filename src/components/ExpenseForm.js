import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../ExpenseForm.css';
import TagOptions from './TagOptions';
import { fetchCurrencies, fetchExpenses } from '../actions/index';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
    this.addId = this.addId.bind(this);

    const idLength = 16;

    this.state = {
      id: Math.random().toString(idLength).slice(2),
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  cleanForm() {
    document.getElementById('form1').reset();
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  addId() {
    const idLength = 16;
    const idd = Math.random().toString(idLength).slice(2);
    this.setState({
      id: idd,
    });
  }

  render() {
    const { currencies, fetchExpense } = this.props;
    return (
      <form className="form" id="form1">
        <label htmlFor="value" className="form-item">
          Valor
          <input type="number" name="value" onChange={ this.handleChange } id="value" />
        </label>
        <label htmlFor="currency" className="form-item">
          Moeda
          <select id="currency" name="currency" onChange={ this.handleChange }>
            {currencies.map((curr, idx) => <option key={ idx }>{ curr.code }</option>)}
          </select>
        </label>
        <label htmlFor="method" className="form-item">
          Método de pagamento
          <select id="method" name="method" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag" className="form-item">
          Tag
          <select id="tag" name="tag" onChange={ this.handleChange }>
            <TagOptions />
          </select>
        </label>
        <label htmlFor="description" className="form-item">
          Descrição
          <input
            type="text"
            autoComplete="off"
            name="description"
            onChange={ this.handleChange }
            id="description"
          />
        </label>
        <button
          type="button"
          id="expenseButton"
          className="form-btn"
          onClick={ () => { this.cleanForm(); this.addId(); fetchExpense(this.state); } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  fetchExpense: (payload) => dispatch(fetchExpenses(payload)),
});

ExpenseForm.propTypes = {
  fetchCurrency: PropTypes.func.isRequired,
  fetchExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
