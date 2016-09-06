import React,{Component} from 'react';
import MessageList from './messages/MessageList';
import MessageForm from './messages/messageForm';
import UserList from './users/UserList';
import UserForm from './users/UserForm';
import IO from 'socket.io-client';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'disconnected',
      messages: [{
        timeStamp: Date.now(),
        text: "Welcome to ChatApp"
      }],
      users: [],
      user: ''
    };

    this.emit= this.emit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentWillMount() {
    this.socket = IO('http://localhost:3000');
    this.socket.on('connect', this.connect.bind(this));
    this.socket.on('messageAdded', this.onMessageAdded.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
    this.socket.on('userJoined', this.onUserJoined.bind(this));
  }

  onUserJoined(users) {
    this.setState({users: users});
  }

  onMessageAdded(message) {
    this.setState({messages: this.state.messages.concat(message)});
  }

  connect() {
    this.setState({status: 'connected'});
    console.log("Connected: " + this.socket.id); //eslint-disable no-console
  }

  disconnect(users) {
    this.setState({users: users});
    this.setState({status: 'disconnected'});
  }

  emit(eventName, payload){
    this.socket.emit(eventName, payload);
  }

  setUser(user){
    this.setState({user: user});
  }

  render() {
    if(this.state.user == '') {
      return (
        <UserForm emit={this.emit} setUser={this.setUser} />
      );
    } else {

      return (
        <div className="row">
          <div className="col-md-4">
            <UserList {...this.state}/>
          </div>
          <div className="col-md-8">
            <MessageList {...this.state}/>
            <MessageForm {...this.state} emit={this.emit}/>
          </div>
        </div>
      );
    }
  }

}
