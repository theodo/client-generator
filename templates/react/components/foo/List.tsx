import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/{{{lc}}}/list';
import { RootState } from '../../../redux/types';
import { Dispatch } from 'redux';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import { DefaultTable, Message, ButtonLink } from './components.style';

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
          <Message>Loading...</Message>
        )}
        {this.props.deletedItem && (
          <Message>
            {this.props.deletedItem['@id']} deleted.
          </Message>
        )}
        {this.props.error && (
          <Message>
            {this.props.error}
          </Message>
        )}

        <p>
          <ButtonLink to="create">
            Create
          </ButtonLink>
        </p>

        <DefaultTable>
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
                    {this.state.sortOrinetation['{{name}}'] ? <ArrowDownward/> : <ArrowUpward/>}
                  </span>
                </th>
{{/each}}
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody className="striped">
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
                    <ButtonLink to={`show/${encodeURIComponent(item['@id'])}`}>
                      <span>Show</span>
                    </ButtonLink>
                  </td>
                  <td>
                    <ButtonLink to={`edit/${encodeURIComponent(item['@id'])}`}>
                      <span>Edit</span>
                    </ButtonLink>
                  </td>
                </tr>
              ))}
          </tbody>
        </DefaultTable>

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
        <ButtonLink
          to="."
          disabled={!previous}          
        >
          <span aria-hidden="true">&lArr;</span> First
        </ButtonLink>
        <ButtonLink
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          disabled={!previous}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </ButtonLink>
        <ButtonLink
          to={next ? encodeURIComponent(next) : '#'}
          disabled={!next}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </ButtonLink>
        <ButtonLink
          to={last ? encodeURIComponent(last) : '#'}
          disabled={!next}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </ButtonLink>
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
      <ButtonLink to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</ButtonLink>
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
