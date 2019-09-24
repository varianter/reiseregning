import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Details from './Components/Details';
import Refund from './Components/Refund';
import Mileage from './Components/Mileage';
import Summary from './Components/Summary';
import Expences from './Components/Expences';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departDate: "",
      departTime: "",
      ariveDate: "",
      ariveTime: "",
      overNigth: "",
      days: 0,
      hours: 0,
      perDiemDays: [], 
      totalDiem: 0,
      mileage: {mileage:0,  rate: 3.5, amount:0, passenger: false},
      expences : 0

    }
    
    this.handleInputChange = this.handleInputChange.bind(this);        
    this.handleFreeMealChange = this.handleFreeMealChange.bind(this);
    this.handleMileageInputChange = this.handleMileageInputChange.bind(this);
    this.calclateDiems = this.calclateDiems.bind(this);
    this.calclate = this.calclate.bind(this);       
    this.handleExpenceChange = this.handleExpenceChange.bind(this);
    
  }

  componentDidMount() {
    this.calclate();
  }


  calclate() {

    const dayPerDiem = 578;  
    const singleDayPerDiemShort = 200;
    const singleDayPerDiemLong = 400;
    
    const departDate = moment(this.state.departDate + this.state.departTime,"YYYY-MM-DDhh:mm");
    let ariveDate = moment(this.state.ariveDate + this.state.ariveTime,"YYYY-MM-DDhh:mm");     
    
    if (this.state.departDate > this.state.ariveDate) {
      ariveDate = moment(this.state.departDate + this.state.ariveTime,"YYYY-MM-DDhh:mm");
      this.setState({ariveDate: this.state.departDate});
    }

    const days = ariveDate.diff(departDate,"days");
    const hours = ariveDate.diff(departDate,"hours")- 24*days;
    const overNigth = (days>0 ? "Ja": "Nei")        


    let perDiemDays = this.state.perDiemDays.slice(0,days+1);
    let singleDayPerDiem = 0;
  
    if (hours >= 6) singleDayPerDiem = singleDayPerDiemShort;
    if (hours >= 12) singleDayPerDiem = singleDayPerDiemLong; 
    
    if (perDiemDays.length ===  0 ){
      perDiemDays.push({toDate: "Første dag", perDiem: singleDayPerDiem, actualDiems: singleDayPerDiem, breakfast:false,lunch:false,dinner:false});
    } 

    perDiemDays[0].perDiem = singleDayPerDiem;
    for (let i = perDiemDays.length -1 ; i < days; i++){
      let toDate = new moment(departDate).add(i+1,'days').format("DD.MM.YYYY");
      perDiemDays.push({toDate: toDate, perDiem: dayPerDiem, actualDiems: dayPerDiem, breakfast:false,lunch:false,dinner:false});
    }
    
    this.setState({days: days, hours: hours, overNigth: overNigth, perDiemDays:perDiemDays}, () => this.calclateDiems() ) 
  }

  calclateDiems() {
    let sum = 0
    
    let perDiemDays = this.state.perDiemDays;
    perDiemDays.forEach(element => {
      element.actualDiems = element.perDiem;
      if (element.breakfast) element.actualDiems -= element.perDiem * .2;
      if (element.lunch) element.actualDiems -= element.perDiem * .3;
      if (element.dinner) element.actualDiems -= element.perDiem * .5;
      sum += element.actualDiems;
    });
    this.setState({perDiemDays: perDiemDays,  totalDiem: sum});
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    this.setState({
        [name]: value
      }, () => 
          this.calclate()
      );   
  }


  handleMileageInputChange(event) {
    
    const rate = 3.5;
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let mileage = this.state.mileage;
    mileage[name] = value;
    mileage.rate = rate + (mileage.passenger ? 1 : 0);  
    mileage.amount = mileage.mileage * mileage.rate;

    this.setState({mileage: mileage});   
  }


  handleFreeMealChange(event){  
    const target = event.target;
    const value = target.checked;
    const name = target.name.split('-')[1];
    const index = parseInt(target.name.split('-')[0]);

    let perDiemDays = this.state.perDiemDays;
    perDiemDays[index][name]= value;

    this.setState({perDiemDays:perDiemDays}, () => this.calclateDiems());
    
  }

  handleExpenceChange(expences) {
    this.setState({expences:expences});
  }

  render() {
    return (
      <div className="container">
        <h1>Diett</h1>
          <Details handleInputChange={this.handleInputChange}               
                  departDate={this.state.departDate}
                  departTime={this.state.departTime}
                  ariveDate={this.state.ariveDate}
                  ariveTime={this.state.ariveTime}
          />
          <Refund handleFreeMealChange={this.handleFreeMealChange} 
            perDiemDays={this.state.perDiemDays}
            totalDiem={this.state.totalDiem}
            days={this.state.days} 
            hours={this.state.hours} 
            overNigth={this.state.overNigth} 
          />
          <Mileage handleMileageInputChange={this.handleMileageInputChange}
                mileage={this.state.mileage}                       
          />
          <Expences handleExpenceChange={this.handleExpenceChange} 
            expences={this.state.expences}
            departDate={this.state.departDate}
            ariveDate={this.state.ariveDate} 
          />


          <Summary 
                mileage={this.state.mileage.amount}
                diems={this.state.totalDiem}
                expences={this.state.expences}
          />

      </div>
    );
  }
}
export default App;