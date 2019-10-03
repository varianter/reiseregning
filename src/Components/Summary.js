import React from 'react';
import './Refund.css';

class Summary extends React.Component {
  render() {
    let formater = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });
    let expenceRows = [];

    for (let key in this.props.vatList) {
      if (this.props.vatList.hasOwnProperty(key)) {
        expenceRows.push(
          <tr>
            <td>Utlegg</td>
            <td> </td>
            <td className="numeric"> {key} </td>
            <td className="numeric">
              {formater.format(this.props.vatList[key])}
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
            <tr>
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
              <td className="numeric">{formater.format(this.props.diems)}</td>
            </tr>
            <tr>
              <td>Kilometergodgjørelse</td>
              <td> </td>
              <td className="numeric"> 0 </td>
              <td className="numeric">{formater.format(this.props.mileage)}</td>
            </tr>
            {expenceRows}

            <tr className="sum-row">
              <td>Sum </td>
              <td> </td>
              <td> </td>
              <td className="numeric">
                {formater.format(
                  this.props.mileage + this.props.diems + this.props.expences
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
