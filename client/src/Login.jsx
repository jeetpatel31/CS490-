import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', { email, password })
        .then(response => {
            console.log(response.data); // Log the data part to see the actual server response
            if (response.data.success) {
                const username = encodeURIComponent(response.data.name);
                window.location.href = `http://127.0.0.1:5500/client/src/index.html?username=${username}`;
            } else {
                // Handle failed login (incorrect password, email not registered, etc.)
                console.log(response.data.message);
            }
        })
        .catch(error => {
            console.log(error);
            // Handle network or server errors
        });










        // axios.post('http://localhost:3001/login', {email, password})
        // .then(result => 
        //     {console.log(result)
        //     if(result.data === "Success"){
        //         window.location.href = 'http://127.0.0.1:5500/client/src/index.html';
        //     }
        
        // })
        // .catch(err=> console.log(err))

    }

    return (
        <div className="background-image d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        id="email"
                        name="email"
                        className="form-control ronded-0"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        id="password"
                        name="password"
                        className="form-control ronded-0"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                  </button>
                  </form>  
                  <p>Already Have an Account</p>
                  <Link to="/Register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Signup
                  </Link>
                
            </div>
        </div>
    );
}

export default Login;