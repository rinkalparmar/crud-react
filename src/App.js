import { useState } from 'react';
import './App.css';
// import Form from './class-component/Form';
// import Navbar from './class-component/Navbar';
import Form from './component/Form';
import Navbar from './component/Navbar';
import Alert from './component/Alert';

function App() {

  const [alert, setAlert] = useState();

  const ShowAlert = (type, msg) => {
    setAlert({
      type: type,
      msg: msg
    });

    setTimeout(() => {
      setAlert(null)
    },2000);
  };

  return (
    <>
      {/* functional component */}
      <Navbar />
      <Alert alert={alert} />
      <Form ShowAlert={ShowAlert} />

      {/* class component */}
      {/* <Navbar/>
  <Form/> */}
    </>
  );
}

export default App;
