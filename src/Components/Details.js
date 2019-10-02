import React from 'react';
import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";
 
import '../Components/Details.css';


class Details extends React.Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    
    }
    
    onDateChange = ( name , date ) => {
        
        this.props.handleDetailsChange(name, date);
    }

    onInputChange (event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.props.handleDetailsChange(name, value);
    }

    render() {        
        return (
            
            <form>
                <div>
                    <h2>Personopplysninger</h2>
                    <label className="long-input">
                            <span>Navn:</span>
                            <input className="long-input"
                                name="name"
                                value={this.props.name}
                                onChange={this.onInputChange} />
                        </label>
                </div>
                <div>
                    <h2>Spesifikasjon av reisen</h2>
                    <div>
                        <label className="long-input">
                            <span>Kort beskrivelse:</span>
                            <input className="long-input"
                                name="description"
                                value={this.props.description}
                                onChange={this.onInputChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Avreisedato:</span>                            
                            <DatePicker
                                selected={this.props.departDate}
                                showTimeSelect
                                timeFormat="HH:mm"                  
                                dateFormat="dd.MM.yyyy HH:mm"      
                                onChange={(value) => this.onDateChange("departDate", value)}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Hjemkomstdato:</span>                            
                            <DatePicker
                                selected={this.props.ariveDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="dd.MM.yyyy HH:mm"      
                                onChange={(value) => this.onDateChange("ariveDate", value)}
                                min={this.props.departDate}/>
                       </label>

                    </div>
                </div>
            </form>
        );
    }
}

export default Details;