import React, { useEffect, useState } from 'react';
import  axios  from 'axios';
import {NavLink} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { API } from '../utils/config';

const Dashboard = props => {
    const [students, setStudents] = useState([]);
    const [empty, setEmpty] = useState('');
    const [loadErr, setLoadErr] = useState("");
    const [loading, setLoading] = useState(true);

    const changeStatus = (id, e) => {
        const statusBtn = e.target;
        statusBtn.classList.add("statusProcessingShow");
        axios.put(`${API}/student/status/${id}`)
            .then(response => {
                getStudents();
                toast.success(response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            })
            .catch(err => {
                statusBtn.classList.remove("statusProcessingShow");
                toast.error(err.response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            });
    }

    const deleteStudent = (id, e) => {
        if (e.target.className == "fa fa-trash-o") {
            e.target.className = 'fa fa-spinner fa-spin';
        } else if (e.target.className == "btn btn-outline-danger delete") {
            const deleteBtn = e.target;
            deleteBtn.children[0].className = 'fa fa-spinner fa-spin';
        }
    
        axios.delete(`${API}/student/${id}`)
            .then(response => {
                getStudents();
                toast.success(response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            })
            .catch(err => {
                if (e.target.className == "fa fa-spinner fa-spin") {
                    e.target.className = 'fa fa-trash-o';
                } else if (e.target.className == "btn btn-outline-danger delete") {
                    const deleteBtn = e.target;
                    deleteBtn.children[0].className = 'fa fa-trash-o';
                }
                toast.error(err.response.data.message, {
                    theme: "dark",
                    autoClose: 3000,
                    pauseOnHover: false
                });
            });

    }

    const getStudents = () => {
        axios.get(`${API}/student`)
            .then(response => {
                setStudents(response.data);
                setEmpty(response.data.message);
                setLoading(false);
            })
            .catch(err => {
                setLoadErr(err.response.data.message);
                setLoading(false); 
            });
    }
    
    useEffect(() => {
        getStudents();
    }, []);

    return (
        <section className='container mt-4'>
            <ToastContainer />
            <h2 className="text-center mb-4 studentListTitle">Student List</h2>
            <table className="table table-dark table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody className='table-light'>
                   {students.length > 0 && students.map((student, index) => {
                       return (
                        <tr key={student._id}>
                            <td data-label="Serial">{index + 1}</td>
                            <td data-label="Name">{student.name}</td>
                            <td data-label="Email">{student.email}</td>
                            <td data-label="Status">{(student.status === "active" ? <button className='btn btn-outline-danger' onClick={(e) => changeStatus(student._id, e)}>Deactive</button> : <button className='btn btn-outline-warning' onClick={(e) => changeStatus(student._id, e)}>Active</button>)}</td>
                            <td data-label="Action">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <NavLink className="btn btn-outline-success view" to={`/view/${student._id}`}><i className="fa fa-eye" aria-hidden="true"></i></NavLink>
                                    <NavLink className="btn btn-outline-primary edit" to={`/edit/${student._id}`} ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></NavLink>
                                    <button className="btn btn-outline-danger delete" onClick={(e) => deleteStudent(student._id, e)}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                </div>
                            </td>
                        </tr>
                       )
                   })}
                </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                   {loading ? <Loader /> : ""}
                    {empty && (<h4 className='text-dark text-center'>{empty}</h4>)}
                    {loadErr && (<h4 className='text-dark text-center'>{loadErr}</h4>)}
                    {props.location.message && props.location.message()}
                    {props.location.deleteMsg && props.location.deleteMsg()}
                </div>
        </section>
    );
};

export default Dashboard;