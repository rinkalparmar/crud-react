import React, { Component } from 'react';

export class Form extends Component {
    // initialize the object
    constructor(props) {
        super(props);
        this.state = {
            // store multiple data
            users: [],
            id: "",
            name: "",
            email: "",
            mobile: "",
            password: "",
            isEdit: false,
            isEditUser: null
        };
    }


    handleInput = (event) => {
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });

    };

    // add user 
    addUser = () => {
        // const id=this.state.id  || or
        const { id, name, email, mobile, password, users, isEdit, isEditUser } = this.state;
        if (isEdit) {
            const updatedUser = users.map((data) => data.id === isEditUser ? { id, name, email, mobile, password } : data);
            this.setState({
                users: updatedUser,
                id: "",
                name: "",
                email: "",
                mobile: "",
                password: "",
                isEdit: false,
                isEditUser: null
            });

        }
        else {
            this.setState({
                users: [...users, { id: id, name: name, email: email, mobile: mobile, password: password }],
                id: "",
                name: "",
                email: "",
                mobile: "",
                password: ""
            });
        }
        // console.log(users)
    };

    // display data
    displayData = () => {
        const { users } = this.state;
        return <table className="table table-dark">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((data, index) => (
                    <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.mobile}</td>
                        <td>{data.password}</td>
                        <td>
                            <button className='btn btn-danger' onClick={() => this.deleteUser(data.id)}>Delete</button>
                        </td>
                        <td>
                            <button className='btn btn-success' onClick={() => this.updateUser(data.id)}>Update</button>
                        </td>

                    </tr>
                )
                )}
            </tbody>
        </table>;
    };

    deleteUser = (id) => {
        const { users } = this.state;
        console.log(id);
        const deleteid = users.filter((item) => { return item.id !== id; });
        // console.log(deleteid);
        this.setState({ users: deleteid });

    };

    updateUser = (id) => {
        console.log(id);
        const { users } = this.state;
        const updateid = users.find((item) => { return item.id === id; });
        console.log(updateid);
        if (updateid) {
            // add data in input boxes
            this.setState({
                id: updateid.id,
                name: updateid.name,
                email: updateid.email,
                mobile: updateid.mobile,
                password: updateid.password,
                isEdit: true,
                isEditUser: updateid.id,
            });
        }
    };


    render() {
        return (
            <>
                <div className="container my-4">
                    <form>
                        <div className="mb-3">
                            <label htmlFor='id' className="form-label">id</label>
                            <input type="number" className="form-control" name='id' id="id" onChange={this.handleInput} value={this.state.id} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='name' className="form-label">name</label>
                            <input type="text" className="form-control" name='name' id="name" onChange={this.handleInput} value={this.state.name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='email' className="form-label">email</label>
                            <input type="email" className="form-control" name='email' id="email" onChange={this.handleInput} value={this.state.email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='mobile' className="form-label">mobile</label>
                            <input type="number" className="form-control" name='mobile' id="mobile" onChange={this.handleInput} value={this.state.mobile} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor='Password' className="form-label">Password</label>
                            <input type="password" className="form-control" name='password' id="password" onChange={this.handleInput} value={this.state.password} />
                        </div>
                        {/* <button type="button" className="btn btn-primary" onClick={this.addUser}>Submit</button> */}
                        <button type="button" className="btn btn-primary" onClick={this.addUser}> {this.state.isEdit ? "Update" : "Submit"}</button>


                    </form>
                </div>
                <div className="container">
                    <h2>records</h2>
                    {this.displayData()}
                </div>
            </>
        );
    }
}

export default Form;