import React, { Component } from "react";
import "./App.css";
import moment from "moment";
import Details from "./Components/Details";
import Refund from "./Components/Refund";
import Mileage from "./Components/Mileage";
import Summary from "./Components/Summary";
import Expenses from "./Components/Expenses";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departDate: new Date().setHours(6, 0),
      arrivalDate: new Date().setHours(18, 0),
      name: "",
      overNight: "",
      days: 0,
      hours: 0,
      perDiemDays: [],
      totalDiem: 0,
      mileage: { mileage: 0, rate: 3.5, amount: 0, passenger: false },
      vatList: {},
      expenses: 0,
    };

    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleFreeMealChange = this.handleFreeMealChange.bind(this);
    this.handleMileageInputChange = this.handleMileageInputChange.bind(this);
    this.calculateDiems = this.calculateDiems.bind(this);
    this.calculate = this.calculate.bind(this);
    this.handleExpenseChange = this.handleExpenseChange.bind(this);
    this.print = this.print.bind(this);
  }

  componentDidMount() {
    this.calculate();
  }

  calculate() {
    const dayPerDiem = 617;
    const singleDayPerDiemShort = 200;
    const singleDayPerDiemLong = 400;

    const departDate = moment(this.state.departDate);
    let arrivalDate = moment(this.state.arrivalDate);

    if (this.state.departDate > this.state.arrivalDate) {
      arrivalDate = moment(this.state.departDate);
      this.setState({ arrivalDate: this.state.departDate });
    }

    const days = arrivalDate.diff(departDate, "days");
    const hours = arrivalDate.diff(departDate, "hours") - 24 * days;
    const overNight = days > 0 ? "Ja" : "Nei";

    let perDiemDays = this.state.perDiemDays.slice(0, days + 1);
    let singleDayPerDiem = 0;

    if (hours >= 6) singleDayPerDiem = singleDayPerDiemShort;
    if (hours >= 12) singleDayPerDiem = singleDayPerDiemLong;

    if (perDiemDays.length === 0) {
      perDiemDays.push({
        toDate: "Første dag",
        perDiem: singleDayPerDiem,
        actualDiems: singleDayPerDiem,
        breakfast: false,
        lunch: false,
        dinner: false,
      });
    }

    perDiemDays[0].perDiem = singleDayPerDiem;
    for (let i = perDiemDays.length - 1; i < days; i++) {
      let toDate = new moment(departDate)
        .add(i + 1, "days")
        .format("DD.MM.YYYY");
      perDiemDays.push({
        toDate: toDate,
        perDiem: dayPerDiem,
        actualDiems: dayPerDiem,
        breakfast: false,
        lunch: false,
        dinner: false,
      });
    }

    this.setState({ days, hours, overNight, perDiemDays: perDiemDays }, () =>
      this.calculateDiems()
    );
  }

  calculateDiems() {
    let sum = 0;

    let perDiemDays = this.state.perDiemDays;
    perDiemDays.forEach((element) => {
      element.actualDiems = element.perDiem;
      if (element.breakfast) element.actualDiems -= element.perDiem * 0.2;
      if (element.lunch) element.actualDiems -= element.perDiem * 0.3;
      if (element.dinner) element.actualDiems -= element.perDiem * 0.5;
      sum += element.actualDiems;
    });
    this.setState({ perDiemDays, totalDiem: sum });
  }

  handleDetailsChange(name, value) {
    this.setState(
      {
        [name]: value,
      },
      () => this.calculate()
    );
  }

  handleMileageInputChange(event) {
    const rate = 3.5;
    const target = event.target;
    const name = target.name;
    const value = target.type !== "checkbox" ? target.value : target.checked;

    let mileage = this.state.mileage;
    mileage[name] = value;
    mileage.rate = rate + (mileage.passenger ? 1 : 0);
    mileage.amount = mileage.mileage * mileage.rate;

    this.setState({ mileage });
  }

  handleFreeMealChange(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name.split("-")[1];
    const index = parseInt(target.name.split("-")[0]);

    let perDiemDays = this.state.perDiemDays;
    perDiemDays[index][name] = value;

    this.setState({ perDiemDays: perDiemDays }, () => this.calculateDiems());
  }

  handleExpenseChange(expenses, vatList) {
    this.setState({ expenses, vatList });
  }
  print() {
    window.print();
    window.onafterprint = redirect(this.state);
    function redirect(state) {
      const url = `https://dash.variant.no/climate/registration?${
        state.name && `name=${state.name}&`
      }${
        state.mileage && state.mileage.mileage
          ? `mileage=${state.mileage.mileage}&`
          : ""
      }${
        state.departDate &&
        `travelDate=${new Date(state.departDate).toISOString()}&`
      }`;
      window.location = url;
    }
  }
  render() {
    return (
      <>
        <div className="container">
          <h1>Reiseregning</h1>
          <Details
            handleDetailsChange={this.handleDetailsChange}
            departDate={this.state.departDate}
            departTime={this.state.departTime}
            arrivalDate={this.state.arrivalDate}
            arrivalTime={this.state.arrivalTime}
          />
          <Refund
            handleFreeMealChange={this.handleFreeMealChange}
            perDiemDays={this.state.perDiemDays}
            totalDiem={this.state.totalDiem}
            days={this.state.days}
            hours={this.state.hours}
            overNight={this.state.overNight}
          />
          <Mileage
            handleMileageInputChange={this.handleMileageInputChange}
            mileage={this.state.mileage}
          />
          <Expenses
            handleExpenseChange={this.handleExpenseChange}
            expenses={this.state.expenses}
            departDate={this.state.departDate}
            arrivalDate={this.state.arrivalDate}
          />
          <Summary
            mileage={this.state.mileage.amount}
            diems={this.state.totalDiem}
            vatList={this.state.vatList}
            expenses={this.state.expenses}
          />
        </div>
        <button className="saveButton" onClick={() => this.print()}>
          Last ned og registrer klimaavtrykk
        </button>
      </>
    );
  }
}
export default App;
