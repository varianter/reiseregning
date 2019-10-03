import React from 'react';
import './Refund.css';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
    this.onNewRowButtonClick = this.onNewRowButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onNewRowButtonClick() {
    let expenses = this.state.expenses;
    expenses.push({ amountInclVAT: 0, VAT: 15, amountVAT: 0 });
    this.setState({ expenses: expenses });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name.split('-')[1];
    const index = parseInt(target.name.split('-')[0]);

    let expenses = this.state.expenses;
    expenses[index][name] = value;
    expenses[index].amountVAT =
      (parseInt(expenses[index].amountInclVAT) /
        (100 + parseInt(expenses[index].VAT))) *
      parseInt(expenses[index].VAT);

    let sum = 0;
    let vatList = {};
    expenses.forEach((element, key) => {
      sum += 1.0 * element.amountInclVAT;
      if (!vatList[expenses[key].VAT]) {
        vatList[expenses[key].VAT] = 0;
      }
      vatList[expenses[key].VAT] += expenses[key].amountInclVAT;
    });

    this.props.handleExpenseChange(sum, vatList);
    this.setState({ expenses: expenses });
  }

  render() {
    let formatter = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });

    let expenseRows = [];

    this.state.expenses.forEach((element, i) => {
      expenceRows.push(
        <tr key={i}>
          <td>
            <input
              min={this.props.departDate}
              defaultValue={this.props.departDate}
              type="date"
            />
          </td>
          <td>
            <select>
              <option value={1}>Flybiletter</option>
              <option value={2}>Tog/Buss</option>
              <option value={3}>Bompenger</option>
              <option value={4}>Taxi</option>
              <option value={5}>Hotell</option>
            </select>
          </td>
          <td className="numeric">
            <input
              onChange={this.handleChange}
              name={i + '-amountInclVAT'}
              defaultValue={element.amountInclVAT}
            ></input>
          </td>
          <td>
            <select
              className="numeric"
              onChange={this.handleChange}
              name={i + '-VAT'}
              value={element.VAT}
            >
              <option value={0}>0</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </td>
          <td className="numeric">{formatter.format(element.amountVAT)}</td>
          <td className="numeric">{formatter.format(element.amountInclVAT)}</td>
        </tr>
      );
    });

    let table = (
      <table>
        <tbody>
          <tr className="sum-row">
            <td>Sum </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td className="numeric">{formatter.format(this.props.expenses)}</td>
          </tr>
        </tbody>
      </table>
    );

    if (expenseRows.length > 0) {
      table = (
        <table>
          <thead>
            <tr>
              <th>Dato </th>
              <th>Beskrivelse </th>
              <th className="numeric">Inkl MVA</th>
              <th className="numeric">% MVA</th>
              <th className="numeric">MVA</th>
              <th className="numeric">Beløp</th>
            </tr>
          </thead>
          <tbody>
            {expenseRows}
            <tr className="sum-row">
              <td>Sum </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td className="numeric">
                {formatter.format(this.props.expenses)}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    let hideClass = this.props.expenses === 0 ? 'print-hidden' : '';

    return (
      <div className={hideClass}>
        <h2>Utlegg</h2>
        <button onClick={this.onNewRowButtonClick}>Nytt utlegg</button>
        {table}
      </div>
    );
  }
}

export default Expenses;
