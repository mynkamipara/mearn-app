import React, { Component } from 'react';
import axios from 'axios';


export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            full_name: '',
            email: '',
            contact_number: '',
            gender: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                  full_name: response.data.full_name,
                  email: response.data.email,
                  contact_number: response.data.contact_number,
                  gender: response.data.gender
                });   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeFullName(e) {
        this.setState({
            full_name: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contact_number: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const updateUser = {
            full_name: this.state.full_name,
            email: this.state.email,
            contact_number: this.state.contact_number,
            gender: this.state.gender,
        };
        console.log(updateUser);
        axios.post('http://localhost:4000/update/'+this.props.match.params.id, updateUser)
            .then(res => {
                    console.log(res.data);
                    this.props.history.push("/");  
            });
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                   
                    <div className="form-group"> 
                        <label>Full Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.full_name}
                                onChange={this.onChangeFullName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact no: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.contact_number}
                                onChange={this.onChangeContactNumber}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Male"
                                    checked={this.state.gender.toLowerCase()==='male'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Female" 
                                    checked={this.state.gender.toLowerCase()==='female'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="Other" 
                                    checked={this.state.gender.toLowerCase()==='other'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Other</label>
                        </div>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}