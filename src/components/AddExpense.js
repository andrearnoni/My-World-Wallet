import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../AddExpense.css';
import { deleteItem } from '../actions/index';
import HeaderList from './HeaderList';

class AddExpense extends Component {
  render() {
    const list = JSON.parse(localStorage.getItem('transactions'));
    const { toDelete } = this.props;
    return (
      <table className="expense-item">
        <HeaderList />
        <tbody>
          { list.map((d, idx) => (
            <tr key={ idx } className="expense-row">
              <td role="cell"><span className="item-description">Descrição: </span>{`${d.description}`}</td>
              <td role="cell"><span className="item-description">Tag: </span>{ d.tag }</td>
              <td role="cell"><span className="item-description">Método de pagamento: </span>{ d.method }</td>
              <td role="cell"><span className="item-description">Valor: </span>{ d.value }</td>
              <td role="cell"><span className="item-description">Moeda: </span>
                {
                  d.currency === 'USD'
                    ? 'Dólar Comercial'
                    : d.exchangeRates[d.currency].name.split('/', 1)
                }
              </td>
              <td role="cell">
                <span className="item-description">Câmbio utilizado: </span>
                { Number(d.exchangeRates[d.currency].ask).toFixed(2) }
              </td>
              <td role="cell"><span className="item-description">Valor convertido: </span>
                { Number(d.value * d.exchangeRates[d.currency].ask)
                  .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }
              </td>
              <td role="cell"><span className="item-description">Moeda conversão: </span>Real</td>
              <td className="resolution-description">Excluir:</td>
              <td>
                <input
                  type="image"
                  className="deleteBtn"
                  alt="Delete button"
                  src="https://icon-library.com/images/trash-icon/trash-icon-16.jpg"
                  data-testid="delete-btn"
                  onClick={ () => toDelete(d.id) }
                />
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  toDelete: (id) => dispatch(deleteItem(id)),
});

AddExpense.propTypes = {
  toDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
