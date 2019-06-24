import React, { Component } from 'react';
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import {Alert, Form, Label, Input, Button } from 'reactstrap';
import style from './RequestForm.module.css';
import AppointmentsDisplay from './AppointmentsDisplay';

class RequestForm extends Component {

    state={

        date: moment(),
        dateDisplay: moment().format("YYYY-MM-DD"),
        start:"",
        end:"",
        // appointment:{},
        appointmentsArray:[],
        tryAgain: false,
        endValid:null,
        
    }

    onSubmit= (e)=>{
        e.preventDefault();


        const startDate= new Date(this.state.dateDisplay + "T" + this.state.start) 
        const endDate= new Date(this.state.dateDisplay + "T" + this.state.end)

        const appointment={
            date: this.state.dateDisplay,
            start: startDate,
            end: endDate,
        };

        if (this.state.end >this.state.start) {
            if (this.checkArray(appointment)){
                let joined = this.state.appointmentsArray.concat([appointment])
               
                let sorted= joined.sort((a,b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0)); 
    
                this.setState({ 
                    appointmentsArray: sorted,
                    date: moment(),
                    dateDisplay: moment().format("YYYY-MM-DD"),
                    start:"",
                    end:"",
                    endValid:false,
                    tryAgain: false
                })
            } else{
               this.setState({tryAgain:true})
            }
          } 
          else {
            this.setState({endValid:true})
          }

    }


    checkArray = (newAppt) => {
        let appointmentsArray= this.state.appointmentsArray
        
        //case 0: if empty array
        if (appointmentsArray.length===0){
            return true;
        }

        // case 1: check if newAppt is before appointmentsArray[0]
        if (newAppt.end<=appointmentsArray[0].start){
            return true;
        }

        // case 3: check if newAppt is after appointmentArray[-1]
        if (newAppt.start>=appointmentsArray[appointmentsArray.length-1].end){
            return true;
        }

        // case 2: check if newAppt can fit in between two existing 
        // appointments in appointmentsArray

        for (let i =0; i<appointmentsArray.length-1; i++){
            if (appointmentsArray[i].end < newAppt.start &&
                appointmentsArray[i+1].start > newAppt.end){
                    return true;
                }
               
        }

        // if none of the above are true
        return false;
    }

    onChange =(e) =>{
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value});
     };


    render() {
        return (
            <div className= "container">
                <div class="row">
                <div className= "col-md-6 ">
               <Form onSubmit={this.onSubmit}>
               {/* <form> */}
                <Label> Date: </Label>
                {/* <input value={this.state.dateDisplay} /> */}
                <Input value={this.state.dateDisplay} className={style.input}/>
                <br/>
                <div className={style.calendar}>
                <DayPickerSingleDateController
                //    id="date_input"
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={(date) => { this.setState({ date, dateDisplay: date.format("YYYY-MM-DD") }); }}
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => { this.setState({ focused }); }}
                isOutsideRange={day => moment().diff(day, "days") > 0}
                />
                </div>
                
                <br/>
                    <Label>
                     Start Time:</Label><br/>
                     <Input type="time" name="start" value={this.state.start} className={style.input}  onChange= {this.onChange} />
               
                
                <br/>
                    
                    <Label>
                     End Time: </Label>  <br/>
                     <Input type="time" name="end" min={this.state.start} value={this.state.end} className={style.input}  onChange={this.onChange}/>

                      {this.state.endValid?<Alert color="danger">
                       There is an error in your end time.
                       </Alert> :
                       <span/> }
                     <br/>
                  
                        {/* <button type="default" onClick={this.onSubmit}>Submit </button> */}
                        <Button color="info" size="lg" onClick={this.onSubmit} disabled={!this.state.end} block>Submit</Button>
                </Form>

                    <br/>
                {this.state.tryAgain?
                <Alert color="info">
                Please enter a different time. You have overlapping appointments.
              </Alert>: <span/>}

            </div>
            <div className= "col-md-5 offset-1">
              <AppointmentsDisplay  appointments={this.state.appointmentsArray}/>
              </div>
              </div>
           </div>
        )
    }
}



export default RequestForm;
