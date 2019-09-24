import React from 'react';
import './Refund.css'

class Expences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expences : []
        }
        this.onNewRowButtonClick = this.onNewRowButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }    


    onNewRowButtonClick() {
        let expences = this.state.expences;
        expences.push({amountInclVAT:0, VAT:15, amountVAT:0 })
        this.setState({expences:expences});
    }

    handleChange(event) {
        
        const target = event.target;
        const value = target.value;
        const name = target.name.split('-')[1];
        const index = parseInt(target.name.split('-')[0]);
    
        let expences = this.state.expences;
        expences[index][name]= value;
        expences[index].amountVAT = parseInt(expences[index].amountInclVAT)/(100+parseInt(expences[index].VAT))*parseInt(expences[index].VAT);
    
        let sum = 0;
        let vatList = {};
        expences.forEach( (element, key) => {
            sum += 1.0 * element.amountInclVAT;
            if (!vatList[expences[key].VAT]) {
                vatList[expences[key].VAT]= 0;
            }
            vatList[expences[key].VAT] += expences[key].amountInclVAT;
            
        });

        this.props.handleExpenceChange(sum, vatList);
        this.setState({expences:expences});
        
    }



    render() {
        let formater = new Intl.NumberFormat('no-BM', { style: 'currency' , currency: 'NOK'});
       
        let expenceRows = [];
    
        this.state.expences.forEach( (element, i) => {
            expenceRows.push(
                <tr key={i}>
                    <td><input min={this.props.departDate} defaultValue={this.props.departDate} type="date"/></td>
                    <td>
                    <select >
                        <option value={1}>Flybiletter</option>
                        <option value={2}>Tog/Buss</option>
                        <option value={3}>Bompenger</option>
                        <option value={4}>Taxi</option>        
                        <option value={5}>Hotell</option>                        
                    </select>
                    </td>
                    <td className="numeric"><input onChange={this.handleChange} name={i + "-amountInclVAT"} defaultValue={element.amountInclVAT}></input></td>
                    <td>
                    <select className="numeric" onChange={this.handleChange} name={i + "-VAT"} value={element.VAT}>
                        <option value={0}>0</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                        <option value={25}>25</option>                        
                    </select>
                    </td>
                    <td className="numeric">{formater.format(element.amountVAT)}</td>
                    <td className="numeric">{formater.format(element.amountInclVAT)}</td>
                </tr>)
        } )

        let table = 
            <table>                
                <tbody>
                    <tr className="sum-row">
                        <td>Sum </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td className="numeric">{formater.format(this.props.expences)}</td>
                    </tr>
                </tbody>
            </table>;


        if (expenceRows.length > 0 ){
            table =  <table>
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
                    {expenceRows}
                    <tr className="sum-row">
                        <td>Sum </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td> </td>
                        <td className="numeric">{formater.format(this.props.expences)}</td>
                    </tr>
                </tbody>
            </table>

        }
        
        let hideClass = this.props.expences === 0 ? "print-hidden" : "";

        return (
            <div className={hideClass}>
                <h2>Utlegg</h2>
                <button onClick={this.onNewRowButtonClick}>Nytt utlegg</button>
                {table}
               

            </div>
        );
    }
}

export default Expences;