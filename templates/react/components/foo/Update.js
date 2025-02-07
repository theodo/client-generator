import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/{{{lc}}}/update';
import { del } from '../../actions/{{{lc}}}/delete';
import 'bootstrap/dist/css/bootstrap.css';

class Update extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    retrieveLoading: PropTypes.bool.isRequired,
    retrieveError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

    return (
      <div>
        <h1>Edit {item && item['@id']}</h1>

        {this.props.created && (
          <div className="alert alert-success" role="status">
            {this.props.created['@id']} created.
          </div>
        )}
        {this.props.updated && (
          <div className="alert alert-success" role="status">
            {this.props.updated['@id']} updated.
          </div>
        )}
        {(this.props.retrieveLoading ||
          this.props.updateLoading ||
          this.props.deleteLoading) && (
          <div className="alert alert-info" role="status">
            Loading...
          </div>
        )}
        {this.props.retrieveError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.retrieveError}
          </div>
        )}
        {this.props.updateError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.updateError}
          </div>
        )}
        {this.props.deleteError && (
          <div className="alert alert-danger" role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </div>
        )}

        {item && (
          <Form
            onSubmit={values => this.props.update(item, values)}
            initialValues={item}
          />
        )}
        <Link to=".." className="btn btn-primary">
          Back to list
        </Link>
        <button onClick={this.del} className="btn btn-danger">
          Delete
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  retrieved: state.{{{lc}}}Admin.update.retrieved,
  retrieveError: state.{{{lc}}}Admin.update.retrieveError,
  retrieveLoading: state.{{{lc}}}Admin.update.retrieveLoading,
  updateError: state.{{{lc}}}Admin.update.updateError,
  updateLoading: state.{{{lc}}}Admin.update.updateLoading,
  deleteError: state.{{{lc}}}Admin.del.error,
  deleteLoading: state.{{{lc}}}Admin.del.loading,
  eventSource: state.{{{lc}}}Admin.update.eventSource,
  created: state.{{{lc}}}Admin.create.created,
  deleted: state.{{{lc}}}Admin.del.deleted,
  updated: state.{{{lc}}}Admin.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => retrieve(id)(dispatch),
  update: (item, values) => update(item, values)(dispatch),
  del: item => del(item)(dispatch),
  reset: eventSource => reset(eventSource)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
