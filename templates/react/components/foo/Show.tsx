import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, reset } from '../../actions/{{{lc}}}/show';
import { del } from '../../actions/{{{lc}}}/delete';
import { RootState } from '../../../redux/types';

import { DefaultTable, Message, ButtonLink, Button } from './components.style';

interface Props {
  retrieved: any;
  loading: any;
  error: any;
  eventSource: any;
  retrieve: any;
  reset: any;
  deleteError: any;
  deleteLoading: any;
  deleted: any;
  del: any;
  match: any;
}

class Show extends Component<Props> {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired,
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

    const item = this.props.retrieved;

    return (
      <div>
        <h1>Show {item && item['@id']}</h1>

        {this.props.loading && (
          <Message role="status">
            Loading...
          </Message>
        )}
        {this.props.error && (
          <Message role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.error}
          </Message>
        )}
        {this.props.deleteError && (
          <Message role="alert">
            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
            {this.props.deleteError}
          </Message>
        )}

        {item && (
          <DefaultTable>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="striped">
              {{#each fields}}
              <tr>
                <th scope="row">{{ name }}</th>
                <td>{{#if reference}}{this.renderLinks('{{{reference.name}}}', item['{{{name}}}'])}{{ else}}{item['{{{name}}}']}{{/if}}</td>
              </tr>
              {{/ each}}
            </tbody>
          </DefaultTable>
        )}
        <ButtonLink to="..">
          Back to list
        </ButtonLink>
        {item && (
          <ButtonLink to={`/{{{name}}}/edit/${encodeURIComponent(item['@id'])}`}>
            Edit
          </ButtonLink>
        )}
        <Button onClick={this.del}>
          Delete
        </Button>
      </div>
    );
  }

  renderLinks = (type: any, items: any) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../../${type}/show/${encodeURIComponent(items)}`}>
        {items}
      </Link>
    );
  };
}

const mapStateToProps = (state: RootState) => ({
  retrieved: state.{{{lc}}}Admin.show.retrieved,
  error: state.{{{lc}}}Admin.show.error,
  loading: state.{{{lc}}}Admin.show.loading,
  eventSource: state.{{{lc}}}Admin.show.eventSource,
  deleteError: state.{{{lc}}}Admin.del.error,
  deleteLoading: state.{{{lc}}}Admin.del.loading,
  deleted: state.{{{lc}}}Admin.del.deleted
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retrieve: (id: string) => retrieve(id)(dispatch),
  del: (item: any) => del(item)(dispatch),
  reset: (eventSource: any) => reset(eventSource)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
