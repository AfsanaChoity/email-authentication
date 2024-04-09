import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef(null);


  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);
     //reset error & success
     setRegisterError('');
     setSuccess('');

    //add validation
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        console.log(res.user);
        if(res.user.emailVerified){
          setSuccess('User login successfully');
        }
        else{
          alert("Please varify first");
        }
        
      })
      .catch(error => {
        console.error(error);
        setRegisterError(error.message);
      })
  }

  const handleForgetPassword = () =>{
    const email = emailRef.current.value;
    if(!email){
      console.log("Please provide an email");
      return;
    }
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      console.log("Please write a valid email");
      return;
    }

    //send validation email
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      alert("please check your email");
    })
    .catch(error =>{
      console.log(error);
    })

  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" ref={emailRef} name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          {
            registerError && <p>{registerError}</p>
          }
          {
            success && <p>{success}</p>
          }
          <p>New to this website? Please <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;