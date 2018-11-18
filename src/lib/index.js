import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class BottomScrollListener extends Component {
  constructor(props) {
    super(props);

    if (props.debounce) {
      this.handleOnScroll = debounce(this.handleOnScroll.bind(this), props.debounce, { trailing: true });
    } else {
      this.handleOnScroll = this.handleOnScroll.bind(this);
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll);
  }

  handleOnScroll() {
    const scrollNode = document.scrollingElement || document.documentElement;

    if (scrollNode.scrollHeight - this.props.offset <= scrollNode.scrollTop + window.innerHeight) {
      this.props.onBottom();
    }
  }

  render() {
    return !this.props.children ? null : <div>{this.props.children}</div>;
  }
}

BottomScrollListener.defaultProps = {
  debounce: 200,
  offset: 0,
  children: null,
};

BottomScrollListener.propTypes = {
  onBottom: PropTypes.func.isRequired,
  debounce: PropTypes.number,
  offset: PropTypes.number,
  children: PropTypes.element,
};

export default BottomScrollListener;
