import React, { Component } from "react";

export default class SearchAppointments extends Component {
  render() {
    const {
      orderBy,
      orderDir,
      handleSearchFilter,
      handleSortOrder
    } = this.props;

    function activeSortClass(sortType) {
      let classes = "sort-by dropdown-item";

      if (orderBy === sortType) {
        classes = classes + " active";
      }

      if (orderDir === sortType) {
        classes = classes + " active";
      }

      return classes;
    }

    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={e => handleSearchFilter(e.target.value)}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button
                  className={activeSortClass("petName")}
                  href="#"
                  onClick={e => handleSortOrder("petName", orderDir)}
                >
                  Pet Name
                </button>
                <button
                  className={activeSortClass("aptDate")}
                  href="#"
                  onClick={e => handleSortOrder("aptDate", orderDir)}
                >
                  Date
                </button>
                <button
                  className={activeSortClass("ownerName")}
                  href="#"
                  onClick={e => handleSortOrder("ownerName", orderDir)}
                >
                  Owner
                </button>
                <div role="separator" className="dropdown-divider" />
                <button
                  className={activeSortClass("asc")}
                  href="#"
                  onClick={e => handleSortOrder("asc")}
                  onClick={e => handleSortOrder(orderBy, "asc")}
                >
                  Asc
                </button>
                <button
                  className={activeSortClass("desc")}
                  href="#"
                  onClick={e => handleSortOrder(orderBy, "desc")}
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
