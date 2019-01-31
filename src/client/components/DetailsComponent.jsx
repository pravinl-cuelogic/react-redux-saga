import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.scss';

export default class DetailsComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('DetailsComponent props', this.props);
    const {
      details
    } = this.props;
    return (
      <div className="container">
        {details}
      </div>
    );
  }
}

DetailsComponent.propTypes = {
  details: PropTypes.details,
};
