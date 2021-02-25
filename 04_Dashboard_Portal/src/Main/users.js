import React, { Component } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
        this.handlechange = this.handlechange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {

        var stateCopy = Object.assign({}, props.users);
        return { users: stateCopy }

    }

    componentDidUpdate(prevState) {
        if (prevState !== this.state) {
            return true;
        }
        return false;
    }

    handlechange(index, e, i) {

        var stateCopy = Object.assign({}, this.state);
        if (i == 2)
            stateCopy.users[index].hospital_access ? stateCopy.users[index].hospital_access = 0 : stateCopy.users[index].hospital_access = 1;
        else if (i == 3)
            stateCopy.users[index].branch_access ? stateCopy.users[index].branch_access = 0 : stateCopy.users[index].branch_access = 1;

        this.setState(stateCopy);

        var checkedUser = Object.assign({}, this.state.users[index]);
        var data = JSON.stringify(checkedUser);

        var config = {
            method: 'post',
            url: process.env.REACT_APP_URL + '/user',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                toast("user access updated successfully");
            })
            .catch(function (error) {
                toast("error in updating user access");
            });
    }


    render() {
        var i = 0;
        return (
            <>
                <ToastContainer />
                {this.props.users.map((user, index) =>
                    <tr key={++i}>
                        <td key={++i}>{user.user_id}</td>

                        <td key={++i}>{user.username}</td>

                        <td key={++i}>
                            <input type='checkbox'
                                checked={user.hospital_access}
                                disabled={user.is_primary_user}
                                onChange={(e) => this.handlechange(index, e, 2)}>
                            </input>
                        </td>

                        <td key={++i}>
                            <input type='checkbox'
                                checked={user.branch_access}
                                disabled={user.is_primary_user}
                                onChange={(e) => this.handlechange(index, e, 3)}>
                            </input>
                        </td>

                    </tr>)
                }

            </>
        )
    }
}
export default Users