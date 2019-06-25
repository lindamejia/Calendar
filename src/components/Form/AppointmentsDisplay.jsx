import React, { Component } from "react";
import style from "./AppointmentsDisplay.module.css";
import moment from "moment";

class FormDisplay extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.setState(nextProps);
  }

  convertDate = input => {
    return moment(input, "YYYY-MM-DD").format("dddd, MMMM Do YYYY");
  };

  convert = input => {
    return moment(input, "HH:mm:ss").format("h:mm A");
  };

  deleteAppt = index => {
    debugger;
    const appointments = this.props.appointments;
    const newAppointment = appointments.splice(index, 1);
    this.setState({
      appointments: newAppointment
    });
    console.log({ appointments });
  };

  render() {
    const appointments =
      this.props.appointments === undefined ||
      this.props.appointments.length < 1 ? (
        <h5>
          {" "}
          <br />
          You have no appointments scheduled
        </h5>
      ) : (
        this.props.appointments.map((appt, index) => (
          <div key={index}>
            <div>
              <span className={style.title}>Date:</span>{" "}
              <span>{this.convertDate(appt.date)}</span>
              <br />
              <span className={style.title}>Starts:</span>{" "}
              <span>{this.convert(appt.start)}</span>{" "}
              <span className={style.title}>Ends:</span>{" "}
              <span>{this.convert(appt.end)}</span>{" "}
              <button
                type="button"
                className={style.deleteButton}
                onClick={() => this.deleteAppt(index)}
              >
                x
              </button>
              <hr />
            </div>
          </div>
        ))
      );

    return (
      <React.Fragment>
        <h1 className={style.header}>Your Appointments</h1>
        <div>{appointments}</div>
      </React.Fragment>
    );
  }
}

export default FormDisplay;
