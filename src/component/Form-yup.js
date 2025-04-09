import React, { useEffect, useState } from 'react';
import * as yup from 'yup';

function Formyup(props) {
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


  // schema of all fields
  const validationSchema = yup.object({
    id: yup.number().required("enter id as number"),
    name: yup.string("name only latter").required("name is required"),
    email: yup.string().email("enter correct email address").required("email is required"),
    mobile: yup.string()
      .min(10, "Mobile number must be  10 digits")
      .max(10, "Mobile number must be  10 digits"),
    password: yup.string().required("password is required"),
  });


  console.log(errors);

  const handleSubmit = async (event) => {
    event.preventDefault();


    debugger;
    try {
      await validationSchema.validate(store, { abortEarly: false });
      setErrors({});//this used when user enter correct data then all errors removes

      let checkId = dataStore.some((item) => item.id === store.id);
      console.log(checkId);//true
      if (!checkId || edit) {//false
        console.log("edit", edit);
        if (edit) {
          {
            <div className="mb-3">
              <label className="form-label">id</label>
              <input type="number" className="form-control" name='id' onChange={handleInput} value={store?.id} />
              {errors && <div className='error'>{errors.id}</div>}
            </div>;
          }
        }

        if (edit) {
          setDataStore((prestore) => prestore.map((item) => item.id === edit ? { ...item, ...store } : item));

          // update data in localstorage 
          localStorage.setItem("data", JSON.stringify(dataStore.map((item) => item.id === edit ? { ...item, ...store } : item)));


          ShowAlert("success", "your data is updated");
          setEdit(null);
        }
        else {
          setDataStore((prestore) => ([...prestore, store]));
          ShowAlert("success", "your data inserted");

          // store data in localstore 
          localStorage.setItem("data", JSON.stringify([...dataStore, store]));
        }
        setStore({ id: "", name: "", email: "", mobile: "", password: "" });
      }
    }
    catch (error) {
      console.log(error.inner);
      let newError = {};

      // let checkId = dataStore.some((item) => item.id === store.id);
      // console.log("true", checkId);//true
      // if (!checkId) {//false
      //   newError={ id: "enter uni id" };
      // }


      error.inner.map((err) => {
        newError[err.path] = err.message;
      });

      // if(dataStore.id)
      
      setErrors(newError);
      console.log("enter unique id")
    }
    // else {
      
    //   console.log("enter uni id", errors);
    //   setErrors({ id: "enter uni id" });
    //   // console.log(object)
    // }
    // debugger
    
  };

  console.log(store);
  // console.log(dataStore);

  const handleInput = async (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setStore({ ...store, [name]: value });

    try {
      await validationSchema.validate({ ...store, [name]: value }, { abortEarly: false });
      setErrors({});//this used when user enter correct data then all errors removes from errors state
    } catch (error) {
      console.log(error.inner);
      let newError = {};

      error.inner.map((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);

    }

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
    <>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">id</label>
            <input type="number" className="form-control" name='id' onChange={handleInput} value={store?.id} />
            {errors && <div className='error'>{errors.id}</div>}
            {/* {errors.id ? <div className='error'>{errors.id}</div> : <div className='error'>{errors.id}</div>} */}

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
    </>
  );
};
export default Formyup;