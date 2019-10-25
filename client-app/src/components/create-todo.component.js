import React, { Component } from 'react';
import axios from 'axios';


export default class CreateTodo extends Component {

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
            error:{
                full_name:'',
                contact:'',
                gender:''
            }
        }
        
    }
    onChangeFullName(e) {
        if(!e.target.value.match(/^[a-zA-Z]+$/)){
            this.setState({
                full_name: e.target.value,
                error:{
                    full_name:'please add only alpha batic value',
                    contact:'',
                    gender:''
                }
            })
            
        }else{
            this.setState({
                full_name: e.target.value,
                error:{
                    full_name:"",
                    contact:this.state.error.contact,
                    gender:this.state.error.gender
                }
            });
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeContactNumber(e) {
        if(!Number(e.target.value)){
            this.setState({
                contact_number: e.target.value,
                error:{
                    full_name:this.state.error.full_name,
                    contact:'valid number enter',
                    gender:this.state.error.gender
                }
               
            });
        }else if(e.target.value.length > 10){
            this.setState({
                contact_number: e.target.value,
                error:{
                    full_name:this.state.error.full_name,
                    contact:'only 10 digit valid',
                    gender:this.state.error.gender
                }
            });
        }else{
            this.setState({
                contact_number: e.target.value,
                error:{
                    full_name:this.state.error.full_name,
                    contact:"",
                    gender:this.state.error.gender
                }
            });
        }
        
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
       if(this.state.error.full_name === '' && this.state.error.contact === '' && this.state.error.gender === '')
       {const newUser = {
            full_name: this.state.full_name,
            email: this.state.email,
            contact_number: this.state.contact_number,
            gender: this.state.gender,
        };

        axios.post("http://localhost:4000/add", newUser)
            .then(res => {console.log(res.data);});
        
        this.setState({
            full_name: '',
            email: '',
            contact_number: '',
            gender: '',
        })
         this.props.history.push('/');}
    }

    render() {
        return (
            
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Full Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.full_name}
                                onChange={this.onChangeFullName}
                                />
                                 <span>
                                    {this.state.error.full_name}
                                </span>
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
                                <span>
                                    {this.state.error.contact}
                                </span>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Male"
                                    checked={this.state.gender==='Male'} 
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
                                    checked={this.state.gender==='Female'} 
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
                                    checked={this.state.gender==='Other'} 
                                    onChange={this.onChangeGender}
                                    />
                            <label className="form-check-label">Other</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}