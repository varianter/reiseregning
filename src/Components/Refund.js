import React from 'react';
import './Refund.css'

class Refund extends React.Component {

    

    render() {
        let formater = new Intl.NumberFormat('no-BM', { style: 'currency' , currency: 'NOK'});
       
        let perDiemsDays = [];
        this.props.perDiemDays.forEach( (element, i) => {
            perDiemsDays.push(
                <tr key={i}>
                    <td>{element.toDate}</td>
                    <td className="numeric">{formater.format(element.perDiem)}</td>
                    <td className="checkbox"><input onChange={this.props.handleFreeMealChange} name={i + "-breakfast"} value={element.breakfast} type="checkbox"/></td>
                    <td className="checkbox"><input onChange={this.props.handleFreeMealChange} name={i + "-lunch"} value={element.lunch} type="checkbox"/></td>
                    <td className="checkbox"><input onChange={this.props.handleFreeMealChange} name={i + "-dinner"} value={element.dinner} type="checkbox"/>        </td>
                    <td className="numeric">{formater.format(element.actualDiems)}</td>
                </tr>)
        } )
        let hideClass = this.props.totalDiem === 0 ? "print-hidden" : "";

        return (
            <div className={hideClass}>
                <h2>Diett innenlands</h2>
                <div className="summary" >
                    <span>Antall dager: {this.props.days} </span>
                    <span>Antall timer: {this.props.hours} </span>
                    <span>Overnatting: {this.props.overNigth}</span>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th className="descr">Beskrivelse </th>
                            <th className="numeric">Sats </th>
                            <th className="checkbox">Dekt frokost </th>
                            <th className="checkbox">Dekt middag </th>
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
                            <td className="numeric">{formater.format(this.props.totalDiem)}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
}

export default Refund;