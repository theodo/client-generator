import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/{{{lc}}}/update';
import { del } from '../../actions/{{{lc}}}/delete';
import { RootState } from '../../../redux/types';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
  retrieved: any;
  retrieveLoading: any;
  retrieveError: any;
  updateLoading: any;
  updateError: any;
  deleteLoading: any;
  deleteError: any;
  updated: any;
  deleted: any;
  eventSource: any;
  retrieve: any;
  update: any;
  del: any;
  reset: any;
  created: any;
  match: any;
}

class Update extends Component<Props> {
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
            onSubmit={(values: any) => this.props.update(item, values)}
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

const mapStateToProps = (state: RootState) => ({
  retrieved: state.{{{lc}}}.update.retrieved,
  retrieveError: state.{{{lc}}}.update.retrieveError,
  retrieveLoading: state.{{{lc}}}.update.retrieveLoading,
  updateError: state.{{{lc}}}.update.updateError,
  updateLoading: state.{{{lc}}}.update.updateLoading,
  deleteError: state.{{{lc}}}.del.error,
  deleteLoading: state.{{{lc}}}.del.loading,
  eventSource: state.{{{lc}}}.update.eventSource,
  created: state.{{{lc}}}.create.created,
  deleted: state.{{{lc}}}.del.deleted,
  updated: state.{{{lc}}}.update.updated
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieve: (id: string) => retrieve(id)(dispatch),
  update: (item: any, values: any) => update(item, values)(dispatch),
  del: (item: any) => del(item)(dispatch),
  reset: (eventSource: any) => reset(eventSource)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
