import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import nb from 'date-fns/locale/nb'; // the locale you want
import './Refund.css';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
    this.onNewRowButtonClick = this.onNewRowButtonClick.bind(this);
    this.onDeleteRowButtonClick = this.onDeleteRowButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  onNewRowButtonClick() {
    let expenses = this.state.expenses;
    expenses.push({ amountInclVAT: 0, VAT: 12, amountVAT: 0 });
    this.setState({ expenses: expenses });
  }

  onDeleteRowButtonClick() {
    let expenses = this.state.expenses;
    expenses.pop();
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
      vatList[expenses[key].VAT] += parseFloat(expenses[key].amountInclVAT);
    });

    this.props.handleExpenseChange(sum, vatList);
    this.setState({ expenses: expenses });
  }

  handleDateChange(date, i) {
    const stateName = `${i}-expenseDate`;
    const stateObj = {};
    stateObj[stateName] = date;
    this.setState(stateObj);
  }

  handleButtonClick(i) {
    let expenses = this.state.expenses;
    expenses[i]['route'] = "Står på kvitteringen";
    this.setState({ expenses });
  }

  handleTypeChange(event, i) {
    let expenses = this.state.expenses;
    let value = event.target.value;
    if (value === "4" || value === "2") {
      expenses[i]['need-route'] = true;
    } else {
      expenses[i]['need-route'] = false;
    }
    
    this.setState({ expenses });
  }

  render() {
    let formatter = new Intl.NumberFormat('no-BM', {
      style: 'currency',
      currency: 'NOK'
    });

    let expenseRows = [];

    registerLocale('nb', nb);



    this.state.expenses.forEach((element, i) => {
      let route = <span></span>;
      if (element['need-route']) {
        
        route = 
        <span className>
          <button className="print-hidden"
              type="checkbox"
              onClick={() => this.handleButtonClick(i)}>
          </button>
          <input
              defaultValue={element.route}>
          </input>
        </span>
      }


      expenseRows.push(
        <tr key={i}>
          <td>
            <DatePicker
              minDate={this.props.departDate}
              placeholderText="Velg dato"
              selected={this.state[i + '-expenseDate']}
              locale="nb"
              dateFormat="dd.MM.yyyy"
              onChange={date => this.handleDateChange(date, i)}
            />
          </td>
          <td>
            <select onChange={(value) => this.handleTypeChange(value, i)}>
              <option value={1}>Flybiletter</option>
              <option value={2}>Tog/Buss</option>
              <option value={3}>Bompenger</option>
              <option value={4}>Taxi</option>
              <option value={5}>Hotell</option>
              <option value={6}>Parkering</option>
            </select>
          </td>
          <td>
            {route}
          </td>
          <td>
            <select
              className="numeric"
              onChange={this.handleChange}
              name={i + '-VAT'}
              value={element.VAT}
            >
              <option value={0}>0</option>
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </td>
          <td className="numeric">
            <input
              onChange={this.handleChange}
              name={i + '-amountInclVAT'}
            ></input>
          </td>
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
            <td className="numeric">{formatter.format(this.props.expenses)}</td>
          </tr>
        </tbody>
      </table>
    );

    if (expenseRows.length > 0) {
      table = (
        <table>
          <thead>
            <tr className="header-row">
              <th>Dato </th>
              <th>Type </th>
              <th>Fra og til </th>
              <th className="numeric">% MVA</th>
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
        <button onClick={this.onDeleteRowButtonClick}>
          Fjern siste utlegg
        </button>
        {table}
      </div>
    );
  }
}

export default Expenses;
