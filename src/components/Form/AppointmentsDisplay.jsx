import React, { Component } from 'react';
import style from './AppointmentsDisplay.module.css'

class FormDisplay extends Component {

componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        this.setState(nextProps);
    }

    render() {


        const appointments = this.props.appointments === undefined ||
            this.props.appointments.length < 1 ? (
            <h5>
                {" "}
                <br />
                You have no appointments scheduled
            </h5>
            ) : this.props.appointments.map((data, index)=>(
                
                <div key={index}>
                    <p className={style.title}>Starts:</p> <p>{data.start.toString()}</p>
                    <p className={style.title}>Ends:</p> <p>{data.end.toString()}</p> 
                    <hr/>
                </div>
            ))
        

        return (
       
            <React.Fragment>
                <h1 className={style.header}>Your Appointments</h1>
                <div>
                    {appointments}
                </div>
            </React.Fragment>
        )
    }
}

export default FormDisplay;
