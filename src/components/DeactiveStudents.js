import React, { useEffect, useState } from 'react';
import  axios  from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { API } from '../utils/config';

const DeactiveStudents = (props) => {
    const [students, setStudents] = useState([]);
    const [loadErr, setLoadErr] = useState("");
    const [loading, setLoading] = useState(true);

    const getStudents = () => {
        const status = props.location.pathname.substring(1);
        axios.get(`${API}/student/sort/${status}`)
            .then(response => {
                setStudents(response.data);
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
            <h2 className="text-center mb-4 studentListTitle">Deactive Students</h2>
            <table className="table table-dark table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Unique ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody className='table-light'>
                {students && students.map((student, index) => {
                    return (
                        <tr key={student._id}>
                            <td data-label="Unique ID">{student._id}</td>
                            <td data-label="Name">{student.name}</td>
                            <td data-label="Email">{student.email}</td>
                        </tr> 
                    )
                })}
                </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    {loading ? <Loader /> : ""}
                    {loadErr && (<h4 className='text-dark text-center'>{loadErr}</h4>)}
                </div>
        </section>
    );
};

export default DeactiveStudents;