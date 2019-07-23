import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/{{{lc}}}/update';
import { del } from '../../actions/{{{lc}}}/delete';
import { RootState } from '../../../redux/types';

import { Message, ButtonLink, Button } from './components.style';

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
          <Message role="status">
            {this.props.created['@id']} created.
          </Message>
        )}
        {this.props.updated && (
          <Message role="status">
            {this.props.updated['@id']} updated.
          </Message>
        )}
        {(this.props.retrieveLoading ||
          this.props.updateLoading ||
          this.props.deleteLoading) && (
            <Message role="status">
              Loading...
          </Message>
          )}
        {this.props.retrieveError && (
          <Message role="alert">
            <span aria-hidden="true" />{' '}
            {this.props.retrieveError}
          </Message>
        )}
        {this.props.updateError && (
          <Message role="alert">
            <span aria-hidden="true" />{' '}
            {this.props.updateError}
          </Message>
        )}
        {this.props.deleteError && (
          <Message role="alert">
            <span aria-hidden="true" />{' '}
            {this.props.deleteError}
          </Message>
        )}

        {item && (
          <Form
            onSubmit={(values: any) => this.props.update(item, values)}
            initialValues={item}
          />
        )}
        <ButtonLink to="..">
          Back to list
        </ButtonLink>
        <Button onClick={this.del}>
          Delete
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
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
