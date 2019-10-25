import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Todo extends Component {
    constructor(props){
        super(props);
        this.deleteList = this.deleteList.bind(this);
    }
    deleteList(){
        console.log('csdcds'+this.props.user._id);
        axios.get('http://localhost:4000/delete/'+this.props.user._id)
            .then(response => {
                console.log('deleted');
                window.location.reload();
            })
            .catch(function (error){
                console.log(error);
            })
    }
    render() {
      return (
        <tr>
        <td>{this.props.user.full_name}</td>
        <td>{this.props.user.email}</td>
        <td>{this.props.user.contact_number}</td>
        <td>{this.props.user.gender}</td>
        <td>
            <Link to={"/edit/"+this.props.user._id}>Edit</Link>
            <button onClick={this.deleteList} className="btn"><span className="badge badge-primary">
                Delete
            </span>
            </button>
        </td>
       
           
        

    </tr>
      );
    }
  }

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

     componentDidMount() {
         axios.get('http://localhost:4000')
         .then(response => {
            console.log('didmount',response)
                this.setState({ users: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    } 

    todoList() {   
        return this.state.users.map(function(currentUser, i){
            return <Todo user={currentUser} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>User List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}