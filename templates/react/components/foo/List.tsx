import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/{{{lc}}}/list';
import { RootState } from '../../../redux/types';
import { Dispatch } from 'redux';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
  retrieved: any;
  loading: any;
  error: any;
  eventSource: any;
  deletedItem: any;
  list: any;
  reset: any;
  match: any;
}
interface State {
  sortOrder: string[];
  sortOrinetation: {[key: string]: boolean};
}

class List extends Component<Props, State> {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };
  constructor(props: Props) {
    super(props);
    this.state = { sortOrder: [], sortOrinetation: {} };
  }

  sort = (A: any, B: any) => {
    for (let index = 0; index < this.state.sortOrder.length; index++) {
      const name = this.state.sortOrder[index];

      if (A[name] > B[name] || A[name] < B[name]) {
        if (A[name] > B[name]) {
          return this.state.sortOrinetation[name] ? 1 : -1;
        }
        if (A[name] < B[name]) {
          return this.state.sortOrinetation[name] ? -1 : 1;
        }
      }
    }
    return 0;
  };

  toggleOrdering = (name: string) => {
    const newOrdering = !this.state.sortOrinetation[name];
    this.setState(state => ({
      sortOrder: [name, ...state.sortOrder.filter(x => x !== name)],
      sortOrinetation: { ...state.sortOrinetation, [name]: newOrdering },
    }));
  };

  sortList = (list: any[]) => {
    list.sort(this.sort);
    return list;
  };

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
          decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
    return (
      <div>
        <h1>{{{title}}} List</h1>

        {this.props.loading && (
          <div className="alert alert-info">Loading...</div>
        )}
        {this.props.deletedItem && (
          <div className="alert alert-success">
            {this.props.deletedItem['@id']} deleted.
          </div>
        )}
        {this.props.error && (
          <div className="alert alert-danger">{this.props.error}</div>
        )}

        <p>
          <Link to="create" className="btn btn-primary">
            Create
          </Link>
        </p>

        <table className="table table-responsive table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
{{#each fields}}
              <th>{{name}}{' '}
                <span
                    onClick={() => {
                      this.toggleOrdering('{{name}}');
                    }}
                  >
                    {this.state.sortOrinetation['{{name}}'] ? 'UP' : 'DOWN'}
                  </span>
                </th>
{{/each}}
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody>
            {this.props.retrieved &&
              this.sortList(this.props.retrieved['hydra:member']).map(item => (
                <tr key={item['@id']}>
                  <th scope="row">
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      {item['@id']}
                    </Link>
                  </th>
{{#each fields}}
                  <td>{{#if reference}}{this.renderLinks('{{{reference.name}}}', item['{{{name}}}'])}{{else}}{item['{{{name}}}']}{{/if}}</td>
{{/each}}
                  <td>
                    <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-search" aria-hidden="true" />
                      <span className="sr-only">Show</span>
                    </Link>
                  </td>
                  <td>
                    <Link to={`edit/${encodeURIComponent(item['@id'])}`}>
                      <span className="fa fa-pencil" aria-hidden="true" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {this.pagination()}
      </div>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <nav aria-label="Page navigation">
        <Link
          to="."
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
    );
  }

  renderLinks = (type: any, items: any[]) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}

const mapStateToProps = (state: RootState) => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
  } = state.{{{lc}}}.list;

  const { deleted } = state.{{{lc}}}.del;
  return { retrieved, loading, error, eventSource, deletedItem: deleted };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  list: (page: any) => list(page)(dispatch),
  reset: (eventSource: any) => reset(eventSource)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
