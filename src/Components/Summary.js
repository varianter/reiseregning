import React from 'react';
import './Refund.css';

class Summary extends React.Component {
  render() {
    let formatter = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });
    let expenseRows = [];

    for (let key in this.props.vatList) {
      if (this.props.vatList.hasOwnProperty(key)) {
        expenseRows.push(
          <tr>
            <td>Utlegg</td>
            <td> </td>
            <td className="numeric"> {key} </td>
            <td className="numeric">
              {formatter.format(this.props.vatList[key])}
            </td>
          </tr>
        );
      }
    }

    return (
      <div>
        <h2>Totalt</h2>

        <table>
          <thead>
            <tr className="header-row">
              <th className="descr">Beskrivelse </th>
              <th></th>
              <th className="numeric">% MVA</th>
              <th className="numeric">Beløp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diett</td>
              <td> </td>
              <td className="numeric"> 0 </td>
              <td className="numeric">{formatter.format(this.props.diems)}</td>
            </tr>
            <tr>
              <td>Kilometergodtgjørelse</td>
              <td> </td>
              <td className="numeric"> 0 </td>
              <td className="numeric">
                {formatter.format(this.props.mileage)}
              </td>
            </tr>
            {expenseRows}
            <tr className="sum-row">
              <td>Sum </td>
              <td> </td>
              <td> </td>
              <td className="numeric">
                {formatter.format(
                  this.props.mileage + this.props.diems + this.props.expenses
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Summary;
