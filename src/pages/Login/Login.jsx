
import { useContext, useState } from "react";
import "../LoginAndRegister.scss";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const [err, setErr] = useState(null);

    const [inputs, setInputs] = useState({
        userName: "",
        password: ""
    });


    const navigate = useNavigate();

    const handelInput = (e) => {
        setInputs((previous) => ({
            ...previous, [e.target.name]: e.target.value
        }));
    };

    const { login } = useContext(AuthContext);
    const handelLogin = async (e) => {
        e.preventDefault();
        if ((inputs.userName.length === 0) || (inputs.password.length === 0)) return setErr("Please Fill All Field");
        try {
            const data = await login(inputs);
            if (data.isAdmin === true) {
                navigate("/admin");
            }
            else {
                navigate("/");
            }
        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div className='login'>
            <div className="log-container">
                <form>
                    <h2>Login</h2>
                    <input type="text" placeholder='username' name='userName' onChange={handelInput} required />
                    <input type="password" placeholder='password' name='password' onChange={handelInput} required />
                    <button onClick={handelLogin}>Login</button>
                    {err && <span style={{ color: "#ff0000b5" }}>{err}</span>}
                    <span style={{ fontSize: "13px" }}> &#9432; If no error show After Login Click, Please Retry </span>
                    <span>Do't have an Account <Link to="/register">Create One.</Link></span>

                </form>
            </div>
        </div >
    );
};

export default Login;