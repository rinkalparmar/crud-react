import React from 'react';

function Alert(props) {
    return (
        <>
         { props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}>
                <strong>{props.alert.msg}</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </>
    );
}

export default Alert;