import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';
import App from '../components/App';
import { add, sub, change, getAllUsersAction } from '../actions';
import '../styles/App.scss';

const mapStateToProps = state => ({
  number: state.calc.number,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      add,
      sub,
      change,
      getAllUsersAction,
    },
    dispatch
  );

class MainApp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('props',this.props);
    console.log('states',this.state);
    const {
      add,
      sub,
      getAllUsersAction,
      number
    } = this.props;
    // console.log('number',number);
    const onClickGetUsersBtn = () => {
      console.log('onClickGetUsersBtn')
      getAllUsersAction();
    }
    return (
      <div className="container">
        <App add={add} sub={sub} number={number} />
        <div>
          <Button bsStyle="primary" onClick={() => onClickGetUsersBtn()}>
            Get All Users
          </Button>
        </div>
      </div>
    );
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApp);

export default AppContainer;
