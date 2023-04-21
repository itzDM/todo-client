import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Task.scss";
const TaskList = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const [data, setData] = useState();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.REACT_APP_URL}/todo/task/${id}`, {
                    headers: {
                        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                });
                setData(res.data);
            };
            fetchData();
        }
        catch (error) {

        }
    }, []);
    console.log(data);
    return (
        <>
            <div className='mainContainer'>
                <h2>{data?.[0]?.userId.userName}</h2>
                {data?.length !== 0 ?
                    <div className="taskContainer">
                        {data?.map((value, index) => (
                            <div className='container' key={index}>
                                <h3>Task {index + 1}</h3>
                                <h4>{value.task}</h4>
                                <h4>Created : {value.createdAt.slice(0, 10)}</h4>
                            </div>
                        ))}
                    </div>
                    : <h2>No Task Found</h2>}
            </div>

        </>
    );
};

export default TaskList;