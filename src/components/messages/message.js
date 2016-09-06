import React, {Component, PropTypes} from 'react';

class Message extends Component {

  formatTime(timestamp) {
    let dt = new Date(timestamp * 1000);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();

    if(hours < 10) {
      hours = '0' + hours;
    }
    if(minutes < 10){
      minutes = '0' + minutes;
    }
    if(seconds < 10){
      seconds = '0' + seconds;
    }
     return hours+":"+minutes+":"+seconds;
  }

  render() {

    const {message} = this.props;
    let formattedTime = this.formatTime(message.timeStamp);

    return(
      <div className="message">
        <strong>{message.user}</strong> {formattedTime} - {message.text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
