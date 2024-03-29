import React, { Component } from "react";
import "react-dates/initialize";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import {
  Form,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback
} from "reactstrap";
import style from "./RequestForm.module.css";
import AppointmentsDisplay from "./AppointmentsDisplay";

class RequestForm extends Component {
  state = {
    date: moment(),
    dateDisplay: moment().format("YYYY-MM-DD"),
    start: "",
    end: "",
    appointmentsArray: [],
    tryAgain: false,
    endValid: "",
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const startDate = new Date(this.state.dateDisplay + "T" + this.state.start);
    const endDate = new Date(this.state.dateDisplay + "T" + this.state.end);

    const appointment = {
      date: this.state.dateDisplay,
      start: startDate,
      end: endDate
    };

    if (this.state.end > this.state.start) {
      if (this.checkArray(appointment)) {
        let joined = this.state.appointmentsArray.concat([appointment]);

        let sorted = joined.sort((a, b) =>
          a.start > b.start ? 1 : b.start > a.start ? -1 : 0
        );

        this.setState({
          appointmentsArray: sorted,
          date: moment(),
          dateDisplay: moment().format("YYYY-MM-DD"),
          start: "",
          end: "",
          endValid: "",
          tryAgain: false
        });
      } else {
        this.setState({ modal: true });
      }
    } else {
      this.setState({ endValid: "has-danger" });
    }
  };

  checkArray = newAppt => {
    let appointmentsArray = this.state.appointmentsArray;

    //case 0: if empty array
    if (appointmentsArray.length === 0) {
      return true;
    }

    // case 1: check if newAppt is before appointmentsArray[0]
    if (newAppt.end <= appointmentsArray[0].start) {
      return true;
    }

    // case 3: check if newAppt is after appointmentArray[-1]
    if (newAppt.start >= appointmentsArray[appointmentsArray.length - 1].end) {
      return true;
    }

    // case 2: check if newAppt can fit in between two existing
    // appointments in appointmentsArray

    for (let i = 0; i < appointmentsArray.length - 1; i++) {
      if (
        appointmentsArray[i].end <= newAppt.start &&
        appointmentsArray[i + 1].start >= newAppt.end
      ) {
        return true;
      }
    }

    // if none of the above are true
    return false;
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <Form onSubmit={this.onSubmit}>
              <div className={style.calendar}>
                <DayPickerSingleDateController
                  date={this.state.date}
                  onDateChange={date => {
                    this.setState({
                      date,
                      dateDisplay: date.format("YYYY-MM-DD")
                    });
                  }}
                  focused={this.state.focused}
                  onFocusChange={({ focused }) => {
                    this.setState({ focused });
                  }}
                  isOutsideRange={day => moment().diff(day, "days") > 0}
                />
              </div>

              <br />
              <div className="row justify-content-md-center">
                <div className="col-5">
                  <Label>Start Time:</Label>
                  <br />
                  <Input
                    type="time"
                    name="start"
                    value={this.state.start}
                    className={style.input}
                    onChange={this.onChange}
                  />
                </div>

                <div className="col-5">
                  <Label>End Time: </Label> <br />
                  <Input
                    type="time"
                    name="end"
                    min={this.state.start}
                    value={this.state.end}
                    className={style.input}
                    onChange={this.onChange}
                    invalid={this.state.endValid === "has-danger"}
                  />
                  <FormFeedback invalid>
                    There is an error in your end time.
                  </FormFeedback>
                </div>
              </div>
              <br />
              <div className="row justify-content-md-center">
                <div className="col-4">
                  <Button
                    color="info"
                    size="md"
                    onClick={this.onSubmit}
                    disabled={!this.state.end}
                    block
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>

            <br />
            {this.state.modal ? (
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {" "}
                  Please enter a different time.{" "}
                </ModalHeader>
                <ModalBody>You have overlapping appointments.</ModalBody>
                <ModalFooter>
                  <Button color="info" onClick={this.toggle}>
                    Okay
                  </Button>
                </ModalFooter>
              </Modal>
            ) : (
              <span />
            )}
          </div>
          <div className="col-md-5 offset-1">
            <AppointmentsDisplay appointments={this.state.appointmentsArray} />
          </div>
        </div>
      </div>
    );
  }
}

export default RequestForm;
