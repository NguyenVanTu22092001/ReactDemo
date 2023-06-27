import { Link } from "react-router-dom";
import { useRef, useState} from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
export default function Signup(){
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationsRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationsRef.current.value,
        }
        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
        })
        .catch((err) => {
            const response = err.response;
            if( response.status === 422 && response ){
                setErrors(response.data.errors);
            }
        })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <h1 className="title">Create an account</h1>
            {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>

            }
            <form onSubmit={onSubmit}>
                <input ref={nameRef} type="text" placeholder="Name"></input>
                <input ref={emailRef} type="email" placeholder="Email"></input>
                <input ref={passwordRef} type="password" placeholder="Password"></input>
                <input ref={passwordConfirmationsRef} type="password" placeholder="Confirm Password"></input>
                <button className="btn btn-block">Sign Up</button>
                <p className="message">Already Register? <Link to="/login">Login</Link></p>
            </form>
        </div>
    </div>
      )
}
