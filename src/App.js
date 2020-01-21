import React, { Component } from "react";
import "./css/App.css";
import AddAppointments from "./components/AddAppointments";
import SearchAppointments from "./components/SearchAppointments";
import ListAppointments from "./components/ListAppointments";

class App extends Component {
  state = {
    myAppointments: [],
    formDisplay: false,
    orderBy: "petName",
    orderDir: "asc",
    queryText: "",
    lastIndex: 0
  };

  //On Component Mount
  componentDidMount() {
    //Fetch Appointments Data JSON
    fetch("./data.json")
      .then(response => response.json())
      .then(result => {
        //Create a new array of objects and modify them as needed
        const apts = result.map(item => {
          //Add a new key value to the the object for an id
          item.aptId = this.state.lastIndex;

          item.likeRed = true;

          //Update the lastIndex state
          this.setState({ lastIndex: this.state.lastIndex + 1 });

          return item;
        });

        //Update teh appointments state
        this.setState({
          myAppointments: apts
        });
      });
  }

  handleDeleteApmt = delAppId => {
    const clone = this.state.myAppointments.slice(0);

    const newList = clone.filter(x => {
      return x.aptId !== delAppId;
    });

    this.setState({
      myAppointments: newList
    });
  };

  handletoggleAdd = () => {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  };

  handleAddNewApmt = addNewItem => {
    const clone = this.state.myAppointments.slice(0);

    addNewItem.aptId = this.state.lastIndex;

    //clone.push(addNewItem)
    clone.unshift(addNewItem);

    this.setState({
      myAppointments: clone,
      formDisplay: false,
      lastIndex: this.state.lastIndex + 1
    });
  };

  handleSortOrder = (sortyBy, sortDir) => {
    this.setState({
      orderBy: sortyBy,
      orderDir: sortDir
    });
  };

  handleSearchFilter = searchVal => {
    this.setState({
      queryText: searchVal
    });
  };

  handleUpdateInfo = (name, value, id) => {
    const clone = this.state.myAppointments.slice(0);

    clone.find(function(x) {
      return x.aptId == id;
    })[name] = value;

    this.setState({
      myAppointments: clone
    });
  };

  render() {
    let filteredApts = this.state.myAppointments;

    let order;
    if (this.state.orderDir === "asc") {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      //search in petName, ownerName & appNotes
      .filter(eachItem => {
        return (
          eachItem["petName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["ownerName"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem["aptNotes"]
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  handletoggleAdd={this.handletoggleAdd}
                  handleAddNewApmt={this.handleAddNewApmt}
                />

                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  handleSortOrder={this.handleSortOrder}
                  handleSearchFilter={this.handleSearchFilter}
                />

                <ListAppointments
                  myAppointments={filteredApts}
                  handleDeleteApmt={this.handleDeleteApmt}
                  handleUpdateInfo={this.handleUpdateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
