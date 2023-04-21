import { useEffect, useState } from "react";
import "./Admin.scss";
import axios from "axios";
import { Link } from "react-router-dom";
const Admin = () => {
    const [data, setData] = useState();
    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await axios.get(`${process.env.REACT_APP_URL}/user`, {
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
    return (
        <div className="mainContainer">
            <h2>Admin Panel</h2>
            <div className="userInfoContainer">
                {data?.map((value, i) => (
                    <div className="userInfo" key={i}>
                        <h3>{value.userName}</h3>
                        <p>{`Admin : ${value.isAdmin}`}</p>
                        <p>{`Created : ${value.createdAt.slice(0, 10)}`}</p>

                        <button><Link to={`/admin/${value._id}`}>View</Link></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;