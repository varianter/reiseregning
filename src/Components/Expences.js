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
        expences.push({amountInclVAT:0, VAT:15, amountExclVAT:0 })
        this.setState({expences:expences});
    }

    handleChange(event) {
        
        const target = event.target;
        const value = target.value;
        const name = target.name.split('-')[1];
        const index = parseInt(target.name.split('-')[0]);
    
        let expences = this.state.expences;
        expences[index][name]= value;
        expences[index].amountExclVAT = expences[index].amountInclVAT/(100+expences[index].VAT)*100;

        let sum = 0;
        expences.forEach( (element) => {
            sum += 1.0 * element.amountInclVAT;
        });
        this.props.handleExpenceChange(sum);
        this.setState({expences:expences});
        
        }



    render() {
        let formater = new Intl.NumberFormat('no-BM', { style: 'currency' , currency: 'NOK'});
       
        let expenceRows = [];
    
        this.state.expences.forEach( (element, i) => {
            expenceRows.push(
                <tr key={i}>
                    <td><input type="date"/></td>
                    <td ><input></input></td>
                    <td className="numeric"><input onChange={this.handleChange} name={i + "-amountInclVAT"} defaultValue={element.amountInclVAT}></input></td>
                    <td className="numeric"><input onChange={this.handleChange} name={i + "-VAT"} defaultValue={element.VAT}></input></td>
                    <td className="numeric">{formater.format(element.amountExclVAT)}</td>
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
                        <th className="numeric">Eksl MVA</th>                    
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
        
        let hideClass = expenceRows.length===0 ? "print-hidden" : "";

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