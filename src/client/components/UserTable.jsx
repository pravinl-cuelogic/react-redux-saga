import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

import '../styles/App.scss';
import { Button, FormControl, Table } from 'react-bootstrap';
export default class UserTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('UserTable props', this.props);
    const {
      users,
    } = this.props;
    const tableHeaders = users.length > 0 ? _.keys(users[0]) : []
    console.log('UserTable keys', _.keys(users[0]));
    const renderTableHeader = () => {
      const headerDiv = [];
      _.forEach(tableHeaders, (header, index) => {
        headerDiv.push(
          <th key={index}>{header}</th>
        )
      });
      return headerDiv;
    }
    const renderTableData = () => {
      const tableDataDiv = [];
      _.forEach(users, (user, index) => {
        const name = user.name;
        const loc = user.location
        tableDataDiv.push(
          <tr key={index + 104354340}>
            <td>{user.gender}</td>
            <td>{name.title +'. '+ name.first +' '+ name.last}</td>
            <td>{loc.street +', '+ loc.city +', '+ loc.state +', '+ loc.postcode}</td>
            <td>{user.email}</td>
            <td>{user.login.username}</td>
            <td>{user.dob.date}</td>
            <td>{user.registered.date}</td>
            <td>{user.phone}</td>
            <td>{user.cell}</td>
            <td>{user.id.value}</td>
            <td>Not available</td>
            <td>{user.nat}</td>
          </tr>
        );
      });
      return tableDataDiv;
    }
    
    return (
      <div className="container">
        <Table striped bordered hover>
          <thead>
          <tr>
            {renderTableHeader()}
          </tr>
          </thead>
          <tbody>
            {renderTableData()}
          </tbody>
        </Table>
      </div>
    );
  }
}

UserTable.propTypes = {
  // number: PropTypes.number,
};
