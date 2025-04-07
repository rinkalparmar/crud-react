import React from 'react';

function DisplayData(props) {
    return (
        <>
            <div className="container">
                {props.dataStore && (
                    <table className="table table-dark">
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
                            <>
                                {
                                    props.dataStore.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.id}</td>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.mobile}</td>
                                            <td>{data.password}</td>
                                            <td>
                                                <i className="fa-solid fa-trash mx-4" onClick={() => { props.deleteData(data.id); }}></i>
                                                <i className="fa-solid fa-pen" onClick={() => { props.updateData(data.id); }}></i>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </>
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default DisplayData;