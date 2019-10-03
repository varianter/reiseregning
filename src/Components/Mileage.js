import React from 'react';
import './Refund.css';

class Mileage extends React.Component {
  render() {
    let formater = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });
    let hideClass = this.props.mileage.amount === 0 ? 'print-hidden' : '';

    return (
      <div className={hideClass}>
        <h2>Bruk av privat bil</h2>

        <table>
          <thead>
            <tr>
              <th className="descr">Antall kilometer </th>
              <th className="checkbox">Passasjer </th>
              <th className="numeric">Sats </th>
              <th className="numeric">Beløp</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  className="numeric"
                  onChange={this.props.handleMileageInputChange}
                  name="mileage"
                  value={this.props.mileage.mileage}
                  type="numeric"
                />
              </td>
              <td className="checkbox">
                <input
                  onChange={this.props.handleMileageInputChange}
                  name="passenger"
                  value={this.props.mileage.passenger}
                  type="checkbox"
                />
              </td>
              <td className="numeric">
                {formater.format(this.props.mileage.rate)}
              </td>
              <td className="numeric">
                {formater.format(this.props.mileage.amount)}
              </td>
            </tr>

            <tr className="sum-row">
              <td>Sum </td>
              <td> </td>
              <td> </td>
              <td className="numeric">
                {formater.format(this.props.mileage.amount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Mileage;
