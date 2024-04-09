import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { update } from "firebase/database";



const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');

    const [showPass, setShowPass] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        const name = e.target.name.value;
        console.log(email, password, accepted, name);

        //reset error & success
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters')
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('your password should contain at least one uppercase latter');
            return;
        }

        else if(!accepted){
            setRegisterError('Please accept our terms')
            return;
        }


        //create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully');
                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com"
                }) 
                .then(() =>{
                    console.log('profile updated');
                })
                .catch(error => {
                    console.log(error);
                })

                //send email varification
                sendEmailVerification(result.user)
                .then (() =>{
                    alert('Please check your email and varify');
                })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })

    }

    return (
        <div >
            <div className="mx-7 lg:mx-auto lg:w-1/2 mt-10">
                <h2 className="text-2xl">Please Register</h2>
                <form onSubmit={handleRegister} className="mt-5">
                    <input className="mb-4 bg-gray-200 w-full rounded-md p-2" type="text" name="name" placeholder="Your name" id="" required></input>
                    <br></br>
                    <input className="mb-4 bg-gray-200 w-full rounded-md p-2" type="email" name="email" placeholder="Email address" id="" required></input>
                    <br></br>
                    <div className=" relative">
                        <input className=" bg-gray-200 w-full rounded-md p-2" type={showPass ? "text" : "password"} name="password" placeholder="Password" id="" required></input>
                        <span className="absolute top-3 right-2" onClick={() => setShowPass(!showPass)}>
                            {
                                showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br></br>
                    <div className="">

                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our Terms and Conditions</label>
                    </div>
                    <br />
                    <input className="mb-4  bg-pink-400 w-full rounded-md p-2 text-white font-semibold" type="submit" value="Register" id=""></input>

                </form>
                {
                    registerError && <p>{registerError}</p>
                }
                {
                    success && <p>{success}</p>
                }
                <p>Already Have an account? Please <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;