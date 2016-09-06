import React, { Component, PropTypes } from 'react';
import Message from './message';

class MessageList extends Component {
  render() {
    return (
      <div className="well">
        <h3>Messages</h3>
        {
          this.props.messages.map((message, i) => {
            return <Message message={message} key={i} />
          })
        }
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};
export default MessageList;
