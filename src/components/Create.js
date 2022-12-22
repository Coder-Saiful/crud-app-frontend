import React, { useEffect, useState } from 'react';
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../utils/config';

const Create = (props) => {
    const [value, setValue] = useState({
        name: "",
        email: "",
        phone: "",
        sid: ""
    });
    const [error, setError] = useState({});
    const [disable, setDisable] = useState(false);

    const {name, email, phone, sid} = value;

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        const createBtn = document.getElementById('createBtn');
        const loader = document.createElement('i');
        loader.className = "fa fa-spinner fa-spin";
        createBtn.textContent = ' Creating...';
        createBtn.prepend(loader);
        setDisable(true);

        axios.post(`${API}/student`, value)
            .then(response => {
                setValue({
                    ...value,
                    name: "",
                    email: "",
                    phone: "",
                    sid: ""
                });
                createBtn.textContent = 'Create';
                setError({});
                setDisable(false);
                toast.success(response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            })
            .catch(err => {
                setError(err.response.data);
                createBtn.textContent = 'Create';
                setDisable(false);
                toast.error(err.response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            });
    
    }

    return (
        <section className='container-fluid'>
            <ToastContainer />
            <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-10 m-auto">
                    <form className='bg-light' onSubmit={handleSubmit}>
                    <h2 className='text-center title'>Create Student</h2>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" onChange={handleChange} value={name} name='name' className={`form-control ${error.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">
                                {error.name ? error.name : ""}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" onChange={handleChange} value={email} name='email' className={`form-control ${error.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">
                                {error.email ? error.email : ""}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" onChange={handleChange} value={phone} name='phone' className={`form-control ${error.phone ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">
                                {error.phone ? error.phone : ""}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Student ID</label>
                            <input type="text" onChange={handleChange} value={sid} name='sid' className={`form-control ${error.sid ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">
                                {error.sid ? error.sid : ""}
                            </div>
                        </div>
                        <button type="submit" disabled={disable} id='createBtn' className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Create;