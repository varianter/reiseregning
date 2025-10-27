import React from 'react';
import './Refund.css';

class Refund extends React.Component {

  render() {
    let formatter = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });

    let perDiemsDays = [];
    if (this.props.usePerDiem) {
      this.props.perDiemDays.forEach((element, i) => {
        perDiemsDays.push(
          <tr key={i}>
            <td>{element.toDate}</td>
            <td className="numeric">{formatter.format(element.perDiem)}</td>
            <td className="checkbox">
              <input
                onChange={this.props.handleFreeMealChange}
                name={i + '-breakfast'}
                value={element.breakfast}
                type="checkbox"
              />
            </td>
            <td className="checkbox">
              <input
                onChange={this.props.handleFreeMealChange}
                name={i + '-lunch'}
                value={element.lunch}
                type="checkbox"
              />
            </td>
            <td className="checkbox">
              <input
                onChange={this.props.handleFreeMealChange}
                name={i + '-dinner'}
                value={element.dinner}
                type="checkbox"
              />{' '}
            </td>
            <td className="numeric">{formatter.format(element.actualDiems)}</td>
          </tr>
        );
      });
    }
    
    let hideClass = this.props.totalDiem === 0 ? 'print-hidden' : '';

    return (
      <div className={hideClass}>
        <h2 className="h2-inline">
          Diett innenlands{' '}
          <label className="label-inline">
            <input
                type="checkbox"
                className='checkbox-inline'
                checked={this.props.usePerDiem}
                onChange={this.props.handleUsePerDiemChange}
            />
            Bruk diettberegning
          </label>
        </h2>
        {this.props.usePerDiem && (
        <div>
          <div className="summary">
            <span>Antall dager: {this.props.days} </span>
            <span>Antall timer: {this.props.hours} </span>
            <span>Overnatting: {this.props.overNight}</span>
          </div>

          <table>
            <thead>
              <tr className="header-row">
                <th className="descr">Beskrivelse </th>
                <th className="numeric">Sats </th>
                <th className="checkbox">Dekt frokost </th>
                <th className="checkbox">Dekt lunsj </th>
                <th className="checkbox">Dekt middag </th>
                <th className="numeric">Beløp</th>
              </tr>
            </thead>
            <tbody>
              {perDiemsDays}
              <tr className="sum-row">
                <td>Sum </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td className="numeric">
                  {formatter.format(this.props.totalDiem)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        )}
      </div>
    );
  }
}

export default Refund;
