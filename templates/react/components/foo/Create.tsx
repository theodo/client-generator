import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/{{{lc}}}/create';
import { Dispatch } from 'redux';
import { RootState } from '../../../redux/types';

import { Message, ButtonLink } from './components.style';

interface Props {
  error:any;
  loading:any;
  created:any;
  create:any;
  reset:any;
  item: any;
}

class Create extends Component<Props> {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    created: PropTypes.object,
    create: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    if (this.props.created)
      return (
        <Redirect
          to={`edit/${encodeURIComponent(this.props.created['@id'])}`}
        />
      );

    return (
      <div>
        <h1>New {{{title}}}</h1>

        {this.props.loading && (
          <Message role="status">
            Loading...
          </Message>
        )}
        {this.props.error && (
          <Message role="alert">
            <span aria-hidden="true" />
            {this.props.error}
          </Message>
        )}

        <Form onSubmit={this.props.create} initialValues={this.props.item} />
        <ButtonLink to=".">
          Back to list
        </ButtonLink>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { created, error, loading } = state.{{{lc}}}.create;
  return { created, error, loading };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  create: (values: any) => create(values)(dispatch),
  reset: () => reset()(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
