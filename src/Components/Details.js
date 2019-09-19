import React from 'react';
import '../Components/Details.css';


class Details extends React.Component {

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
                                onChange={this.props.handleInputChange} />
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
                                onChange={this.props.handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Avreisedato:</span>                            
                            <input
                                name="departDate"
                                type="date"
                                value={this.props.departDate}
                                onChange={this.props.handleInputChange} />
                        </label>

                        <label>
                            <span>Avreise tidspunkt:</span>                            
                            <input
                                name="departTime"
                                type="time"
                                value={this.props.departTime}
                                onChange={this.props.handleInputChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Hjemkomstdato:</span>                            
                            <input
                                name="ariveDate"
                                type="date"
                                min={this.props.departDate}
                                value={this.props.ariveDate}
                                onChange={this.props.handleInputChange} />
                        </label>

                        <label>
                            <span>Hjemkomst tidspunkt:</span>
                            <input
                                name="ariveTime"
                                type="time"
                                value={this.props.ariveTime}
                                onChange={this.props.handleInputChange} />
                        </label>
                    </div>
                </div>
            </form>
        );
    }
}

export default Details;