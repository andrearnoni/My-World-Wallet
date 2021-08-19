import React, { Component } from 'react';
import '../HeaderList.css';

export default class HeaderList extends Component {
  render() {
    return (
      <thead>
        <tr className="expenseTable">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Excluir</th>
        </tr>
      </thead>
    );
  }
}
