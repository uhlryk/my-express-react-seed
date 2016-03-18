import React from 'react';
import RequestAjax from 'react-context-ajax';
import { connect } from 'react-redux';
@connect()
class Request extends React.Component {
  static propsTypes = {
    baseUrl: React.PropTypes.string
  };
  constructor(props) {
    super(props);
    this.requestOptions = {
      baseUrl: props.baseUrl,
      endCallback: (err, req, res, done) => {
        if (err && (err.status === 404 || err.status === 422)) {
          done(err);
        } else if (err && err.status >= 500) {
          this.props.store.dispatch({
            type: SHOW_MODAL,
            title: 'Error',
            body: 'There was server error with processing this request'
          });
        } else if(err) {
          this.props.store.dispatch({
            type: SHOW_MODAL,
            title: 'Error',
            body: 'There was problem with connection to server'
          });
        } else {
          done(null, req, res);
        }
      }
    };
  }

  render() {
    return (
      <RequestAjax {...this.requestOptions}>
        {this.props.children}
      </RequestAjax>
    );
  }

}
export default Request;
