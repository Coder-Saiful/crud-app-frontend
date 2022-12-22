import React, { useEffect, useState } from 'react';
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { API } from '../utils/config';

const Edit = (props) => {
    const [value, setValue] = useState({
        name: "",
        email: "",
        phone: "",
        sid: ""
    });
    const [disable, setDisable] = useState(false);
    const [loadErr, setLoadErr] = useState("");
    const [loading, setLoading] = useState(true);

    const {name, email, phone, sid} = value;

    const getStudent = () => {
        const id = props.match.params.id;
        const updateForm = document.querySelector('.updateForm');
        updateForm.style.display = "none";
        axios.get(`${API}/student/${id}`)
            .then(response => {
                setValue(response.data);
                setLoading(false);
                updateForm.style.display = "block";
            })
            .catch(err => {
                setLoadErr(err.response.data.message);
                setLoading(false);
                updateForm.style.display = "none";
            });
    }
    useEffect(() => {
        getStudent();
    }, []);

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const updateUser = e => {
        e.preventDefault();
        const id = props.match.params.id;
        const createBtn = document.getElementById('createBtn');
        const loader = document.createElement('i');
        loader.className = "fa fa-spinner fa-spin";
        createBtn.textContent = ' Processing...';
        createBtn.prepend(loader);
        setDisable(true);

        axios.put(`${API}/student/${id}`, value)
            .then(response => {
                createBtn.textContent = 'Save';
                setDisable(false);
                toast.success(response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            })
            .catch(err => {
                createBtn.textContent = 'Save';
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
            <div className='d-flex justify-content-center' style={{ marginTop: "100px" }}>
                {loading ? <Loader /> : ""}
                {loadErr && (<h4 className='text-dark text-center'>{loadErr}</h4>)}
                {console.log(loadErr)}
            </div>
            <div className="row updateForm">
                <div className="col-lg-6 col-md-8 col-sm-10 m-auto">
                    <form className='bg-light' onSubmit={updateUser} style={{ marginTop: "0" }}>
                    <h2 className='text-center title'>Update Student</h2>
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" onChange={handleChange} value={name} name='name' className={`form-control`} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="text" onChange={handleChange} value={email} name='email' className={`form-control`} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone:</label>
                            <input type="text" onChange={handleChange} value={phone} name='phone' className={`form-control`} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Student ID:</label>
                            <input type="text" onChange={handleChange} value={sid} name='sid' className={`form-control`} />
                        </div>
                        <button type="submit" disabled={disable} id='createBtn' className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Edit;