import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import Loader from './Loader';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../utils/config';

const Details = props => {
    const [student,setStudent] = useState({});
    const [loadErr, setLoadErr] = useState("");
    const [loading, setLoading] = useState(true);

    const getStudent = () => {
        const id = props.match.params.id;
        const studentInfo = document.querySelector('.studentInfo');
        studentInfo.style.display = "none";
        axios.get(`${API}/student/${id}`)
            .then(response => {
                setStudent(response.data);
                setLoading(false);
                studentInfo.style.display = "block";
            })
            .catch(err => {
                setLoadErr(err.response.data.message);
                setLoading(false);
                studentInfo.style.display = "none";
            });
    }
    
    useEffect(() => {
        getStudent();
    }, []);

    const deleteStudent = id => {
        axios.delete(`${API}/student/${id}`)
            .then(response => {
                props.history.push({
                    pathname: '/',
                    deleteMsg: function() {
                        toast.success(response.data.message, {
                            theme: "dark",
                            autoClose: 3000,
                            pauseOnHover: false
                        });
                    }
                });  
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            });

    }

    const toggleDotMenu = () => {
        const editBtnGroup = document.querySelector('.editBtnGroup');
        editBtnGroup.classList.toggle('active');
    }

    return (
        <section className='py-5'>
            <div className="container" style={{ marginTop: "50px" }}>
                <div className='d-flex justify-content-center'>
                    {loading ? <Loader /> : ""}
                    {loadErr && (<h4 className='text-dark text-center'>{loadErr}</h4>)}
                </div>
                {student && (<div className="row studentInfo">
                    <div className="col-lg-8 bg-light ms-auto me-auto py-4 details position-relative">
                        <h2 className='text-center mb-3'>Welcome {student.name}</h2>
                        <div className='three-dot-menu' onClick={toggleDotMenu}>
                            <button className='dot-item'></button>
                            <button className='dot-item'></button>
                            <button className='dot-item'></button>
                            <div className="editBtnGroup">
                                <NavLink className="text-primary edit" to={`/edit/${student._id}`} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink>
                                <button className="text-danger delete" onClick={() => deleteStudent(student._id)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <hr className='mb-4' />
                        <div className="row">
                            <div className="col-md-6">
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Name:</span> {student.name}</p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Email:</span> {student.email}</p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Unique ID:</span></p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}>{student._id}</p>
                            </div>
                            <div className="col-md-6">
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Phone:</span> {student.phone}</p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Student ID:</span> {student.sid}</p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}><span style={{ fontWeight: "bold" }}>Create At:</span></p>
                                <p style={{ fontSize: "20px", textAlight: "center" }}>{dateFormat(student.createdAt, "dd-mm-yyyy, h:MM TT")}</p>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </section>
    );
};

export default Details;