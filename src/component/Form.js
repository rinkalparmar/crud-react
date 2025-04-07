import React, { useEffect, useState } from 'react';
// import DisplayData from './DisplayData';

function Form(props) {
  const { ShowAlert } = props;


  // store a single data record
  const [store, setStore] = useState({ id: "", name: "", email: "", mobile: "", password: "" });

  // store a multiple data in array
  const [dataStore, setDataStore] = useState([]);

  const [edit, setEdit] = useState(null);

  const [errors, setErrors] = useState({});



  //  get data from localstoreage
  useEffect(() => {
    const isData = JSON.parse(localStorage.getItem("data"));
    if (isData) {
      setDataStore(isData);
    }
  }, []);




  // Validation
  const idFormate = (id) => {
    return /^[0-9]+$/.test(id);
  };

  const nameFomate = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const emailFormate = (email) => {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email);
  };
  const mobileFormate = (mobile) => {
    return /^\d{10}$/.test(mobile);
  };
  const passwordFormate = (password) => {
    return /^[a-zA-Z0-9]+$/.test(password);
  };


  const validateForm = (data) => {
    let newError = {};//store the errors here

    if (dataStore.some((item) => item.id === data.id)) {
      newError.id = "enter unique id";
    }

    if (!data.id || !idFormate(data.id)) {
      newError.id = "enter id as number";
    }

    if (!data.name || !nameFomate(data.name)) {
      newError.name = "enter name as latter";
    }

    if (!data.email || !emailFormate(data.email)) {
      newError.email = "enter correct email address";
    }

    if (!data.mobile || !mobileFormate(data.mobile)) {
      newError.mobile = "enter only 10 digit number";
    }

    if (!data.password || !passwordFormate(data.password)) {
      newError.password = "enter password as latter or number";
    }

    setErrors(newError);

    return !Object.keys(newError).length;//if eany error then give false value otherwirse true
  };

  // console.log(errors);

  const handleSubmit = (event) => {
    event.preventDefault();


    let isValid = validateForm(store);
    console.log('isValid???', isValid);
    if (isValid) {
      console.log("no errors");
    }
    else {
      console.log("your enter data is not correct");
      // this run if error then can not inser,update data
      return;
    }


    if (errors) {
      if (edit) {
        setDataStore((prestore) => prestore.map((item) => item.id === edit ? { ...item, ...store } : item));

        // update data in localstorage 
        localStorage.setItem("data", JSON.stringify(dataStore.map((item) => item.id === edit ? { ...item, ...store } : item)));


        ShowAlert("success", "your data is updated");
        setEdit(null);
      }
      else {
        // debugger;

        setDataStore((prestore) => ([...prestore, store]));
        ShowAlert("success", "your data inserted");

        // store data in localstore 
        localStorage.setItem("data", JSON.stringify([...dataStore, store]));

      }
      setStore({ id: "", name: "", email: "", mobile: "", password: "" });
    }
    else {
      ShowAlert("danger", "enter correct data");

    }
  };
  // console.log(store);
  // console.log(dataStore);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setStore({ ...store, [name]: value });
    validateForm({ ...store, [name]: value });
  };

  const deleteData = (id) => {
    console.log(id);
    const deleteid = dataStore.filter((item) => { return item.id !== id; });
    setDataStore(deleteid);
    ShowAlert("danger", "your data was deleted");
    // console.log(deleteid)
    localStorage.setItem("data", JSON.stringify(deleteid)); //this is delete id from the localstorage

  };

  const updateData = (id) => {
    console.log(id);
    const updateid = dataStore.find((item) => { return item.id === id; });
    // console.log("same",updateid)
    setStore(updateid);//add exits data in input box
    setEdit(id);//this id go in edit not updateid
  };



  return (
    <>q
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">id</label>
            <input type="number" className="form-control" name='id' onChange={handleInput} value={store?.id} />
            {errors && <div className='error'>{errors.id}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">name</label>
            <input type="text" className="form-control" name='name' onChange={handleInput} value={store?.name} />
            {errors && <div className='error'>{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">email</label>
            <input type="email" className="form-control" name='email' onChange={handleInput} value={store?.email} />
            {errors && <div className='error'>{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">mobile</label>
            <input type="number" className="form-control" name='mobile' onChange={handleInput} value={store?.mobile} />
            {errors && <div className='error'>{errors.mobile}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name='password' onChange={handleInput} value={store?.password} />
            {errors && <div className='error'>{errors.password}</div>}
          </div>
          {/* <button type="submit" className="btn btn-primary">Submit</button> */}
          <button type="submit" className="btn btn-primary">{edit ? "Update" : "Submit"}</button>
        </form>
      </div>



      <div className="container">
        {
          dataStore && (
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
                    dataStore?.map((data, index) => (
                      <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.mobile}</td>
                        <td>{data.password}</td>
                        <td>
                          <i className="fa-solid fa-trash mx-4" onClick={() => { deleteData(data.id); }}></i>
                          <i className="fa-solid fa-pen" onClick={() => { updateData(data.id); }}></i>
                        </td>
                      </tr>
                    ))
                  }
                </>
              </tbody>
            </table>
          )}
      </div >

      {/* <DisplayData dataStore={dataStore} deleteData={deleteData} updateData={updateData} /> */}
    </>
  );
};

// <tr>
// <td>{store.id}</td>
// <td>{store.name}</td>
// <td>{store.email}</td>
// <td>{store.mobile}</td>
// <td>{store.password}</td>
// </tr>

export default Form;