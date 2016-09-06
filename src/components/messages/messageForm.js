import React, { Component, PropTypes } from 'react';

class MessageForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit= this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.emit('messageAdded', {
      timeStamp: Date.now(),
      text: this.refs.text.value.trim(),
      user: this.props.user.name
    });

    this.refs.text.value = '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="form-control" ref="text" placeholder="Enter text ..." />
        </form>
      </div>
    );
  }
}

MessageForm.propTypes = {
  emit: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
};

export default MessageForm;
