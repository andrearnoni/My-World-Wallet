import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Header.css';

class Header extends Component {
  total() {
    const { totalExpense } = this.props;
    const values = totalExpense.reduce((acc, curr) => {
      const change = curr.exchangeRates[curr.currency].ask;
      return (Number(acc) + Number(curr.value * change)).toFixed(2);
    }, 0);
    return values;
  }

  render() {
    const email = localStorage.getItem('email');
    return (
      <div className="headerContainer">
        <div>
          <p data-testid="email-field" id="emailField">
            <strong>Usuário:</strong>
            {' '}
            {email}
          </p>
        </div>
        <div className="expenseContainer">
          <p
            data-testid="total-field"
            className="totalField"
          >
            <strong>Despesa total:</strong>
            {' '}
            {`R$ ${this.total().toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}
          </p>
          <p data-testid="header-currency-field" id="currencyField">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalExpense: state.wallet.expenses,
});

Header.propTypes = {
  totalExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
