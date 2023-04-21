import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginAndRegister.scss";

const Register = () => {

    const [err, setErr] = useState(null);
    const [inputs, setInputs] = useState({
        userName: "",
        password: ""
    });

    const handelInput = (e) => {

        setInputs((previous) => ({
            ...previous, [e.target.name]: e.target.value
        }));

    };

    const navigate = useNavigate();

    const handelRegister = async (e) => {
        e.preventDefault();
        if ((inputs.userName.length === 0) || (inputs.password.length === 0)) return setErr("Please Fill All Field");
        try {
            await axios.post(`${process.env.REACT_APP_URL}/user/register`, inputs);
            navigate("/login");

        } catch (error) {
            setErr(error.response.data);
        }
    };
    return (
        <div className='login'>
            <div className="log-container">
                <form>
                    <h2>Register</h2>
                    <input type="text" placeholder='username' name='userName' onChange={handelInput} required />
                    <input type="password" placeholder='password' name='password' onChange={handelInput} required />
                    <button onClick={handelRegister}>Register</button>
                    {err && <span style={{ color: "#ff0000b5" }}>{err}</span>}
                    <span>Already have an Account Please <Link to="/login"> Login</Link> </span>

                </form>
            </div>
        </div >
    );
};

export default Register;