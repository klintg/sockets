import React, { Component, PropTypes } from 'react';

class UserList extends Component {
  render() {
    return (
      <div>
        <h3> Users ({this.props.users.length})</h3>
        <ul className="list-group">
          {
            this.props.users.map((user, i) => {
              return (<li className="list-group-item" user={user} key={i}>
                {user.name}
              </li>);
            })
          }
        </ul>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserList;