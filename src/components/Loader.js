import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex">
                <div className="spinner-border" role="status" style={{ marginRight: "10px" }}>
                </div>
               <h3>Loading...</h3> 
        </div>
    );
};

export default Loader;