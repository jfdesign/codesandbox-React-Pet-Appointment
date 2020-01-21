import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";

export default class AddAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: "",
      ownerName: "",
      aptDate: "",
      aptTime: "",
      aptNotes: ""
    };
  }

  inputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitAdd(e) {
    e.preventDefault();

    let addItem = {
      petName: this.state.petName,
      ownerName: this.state.ownerName,
      aptDate: this.state.aptDate + " " + this.state.aptTime,
      aptNotes: this.state.aptNotes
    };

    this.props.handleAddNewApmt(addItem);

    this.setState({
      petName: "",
      ownerName: "",
      aptDate: "",
      aptTime: "",
      aptNotes: ""
    });
  }

  render() {
    const { formDisplay, handletoggleAdd } = this.props;

    function toggleAddAppointment() {
      let initClass = "card textcenter mt-3";

      if (formDisplay) {
        return initClass;
      } else {
        return initClass + " add-appointment";
      }
    }

    return (
      <div className={toggleAddAppointment()}>
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={() => handletoggleAdd("item.aptId")}
        >
          <FaPlus />
          Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.submitAdd.bind(this)}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly
              >
                Pet Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  placeholder="Pet's Name"
                  value={this.state.petName}
                  onChange={this.inputChange.bind(this)}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  placeholder="Owner's Name"
                  value={this.state.ownerName}
                  onChange={this.inputChange.bind(this)}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value={this.state.aptDate}
                  onChange={this.inputChange.bind(this)}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={this.state.aptTime}
                  onChange={this.inputChange.bind(this)}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  value={this.state.aptNotes}
                  onChange={this.inputChange.bind(this)}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
