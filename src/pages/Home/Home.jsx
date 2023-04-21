import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Home.scss";
const Home = () => {

    const [err, serErr] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const [data, setData] = useState();
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/todo`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setData(res.data);
            } catch (error) {
                serErr(error);
            }

        };
        fetchData();

    }, [refetch]);


    const handelDelete = async (id) => {
        const a = window.confirm("Are You Sure,Want To Delete Task");
        if (a) {
            try {
                await axios.delete(`${process.env.REACT_APP_URL}/todo/task/${id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setRefetch(!refetch);
            }
            catch (error) {
                serErr(error);
            }
        }
        else {
            return;
        }

    };

    const handelUpdate = async (id) => {
        const newTask = prompt(" Want to Update task ..");
        if (!newTask) {
            return;
        } else {
            try {
                await axios.put(`${process.env.REACT_APP_URL}/todo/task/${id}`, { task: newTask }, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setRefetch(!refetch);
            }
            catch (error) {
                serErr(error);
            }
        }
    };

    const createTask = async (e) => {
        e.preventDefault();
        const newTask = prompt("Create a new task ..");
        if (!newTask) {
            return;
        } else {
            try {
                await axios.post(`${process.env.REACT_APP_URL}/todo`, { task: newTask }, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setRefetch(!refetch);
            }
            catch (error) {
                serErr(error);
            }
        }
    };

    return (
        <>
            <div className='mainContainer'>
                <div className='navbar'>
                    <h2>TO-DO</h2>
                    <h2>{`Welcome ${data?.[0]?.userId.userName}`} </h2>
                    <button onClick={createTask}>Create Task</button>
                </div>
                {err && <span>{err}</span>}

                {data?.length !== 0 ?
                    <div className="taskContainer">

                        {data?.map((value, index) => (

                            <div className='container' key={index}>
                                <h3>Task {index + 1}</h3>
                                <h4>{value.task}</h4>
                                <h4>Created : {value.createdAt.slice(0, 10)}</h4>

                                <div className="btn">
                                    <button className='update' onClick={() => handelUpdate(value._id)}>Update</button>
                                    <button className='delete' onClick={() => handelDelete(value._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    : <h3>NO TASK FOUND PLEASE CREATE ONE</h3>}
            </div>
        </>
    );
};

export default Home;
