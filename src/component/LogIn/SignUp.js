import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { userContext } from '../../App';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}


const SignUp = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    const [user, setUser] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    })

    const [showResult, setResult] = useState()

    const [showMessage , setMessage] = useState()

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handelChange = (e) => {
        console.log(e.target.name, e.target.value);

        const newUser = { ...user }
        newUser[e.target.name] = e.target.value;
        setUser(newUser)


        // const userName = name =>{
        //     const user = firebase.auth().currentUser;

        //     user.updateProfile({
        //         displayName: name ,
        //     })
        //     .then(result =>{
        //         console.log('successfully update name' ,result)
        //     })
        //     .catch(error =>{
        //         console.log(error.message)
        //     })
        // }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
    
        if (user.password1.length > 6) {
            if (user.password1 === user.password2) {
                setResult('Account successfully created . Now click LogIn button for log in')
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password1)
                    .then(results => {
                        console.log(results.user.displayName)
                        userName(user.name)
                        const { displayName, email} = results.user;
                        const newUser ={
                            name: displayName,
                            email: email,
                        }
                        setUser(newUser)
                        setLoggedInUser(newUser)
                    })
                    .catch(err => {
                        setMessage(err.message);
                    })
            }
            else {
                setResult('Password not matched')
            }
        }
        else{
            setResult('Password must be at least 6 characters')
        }

        const userName = name =>{
            console.log(name)
            const user = firebase.auth().currentUser;
            console.log(user)
    
            user.updateProfile({
                displayName: name ,
            })
            .then(result =>{
                console.log('successfully update name' ,result)
            })
            .catch(error =>{
                setMessage(error.message)
            })
        }
    }

    const handelGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(results => {
                console.log(results)

                const { displayName, email } = results.user;

                const newUser = {
                    name: displayName,
                    email: email,
                }
                setUser(newUser);
                setLoggedInUser(newUser)
            })
            .catch(err => {
                setMessage(err.message)
            })
    }

    const handelFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
            .then(results => {
                console.log(results)
                const { displayName, email } = results.user;

                const newUser = {
                    name: displayName,
                    email: email,
                }
                setUser(newUser);
                setLoggedInUser(newUser)
            })
            .catch(err => {
                setMessage(err.message)
            })
    }
    return (
        <div className="App d-flex justify-content-center">
            <div>
                <h1 className="mb-5">SignUp  page </h1>
                <div>
                    <form className="">
                        <input className='form-control m-2' type="text" placeholder="Enter your Name" onBlur={handelChange} name="name" />
                        <input className='form-control m-2' type="text" placeholder="Enter your email address" onBlur={handelChange} name="email" />
                        <input className='form-control m-2' type="password" placeholder="Enter your password" onBlur={handelChange} name='password1' />
                        <input className='form-control m-2' type="password" placeholder="Confirm your password" onBlur={handelChange} name='password2' />
                        {
                            <p>{showResult}</p>
                        }
                        {
                            <p>{showMessage}</p>
                        }
                        <button onClick={handelSubmit} className='btn btn-dark'> Submit</button>
                        {/* <input  className='btn btn-dark' type="submit" value="Submit" /> */}
                    </form>
                    <h4>Already have a account? <Link to="/logIn">Log in</Link></h4>
                </div>
                <div>
                    ------------------or-------------------
                    <br />
                    sign in with
                    <br />
                    <button onClick={handelGoogleSignIn} className="btn btn-dark m-2">
                        <FontAwesomeIcon icon={faGoogle} />
                    </button>
                    <button onClick={handelFbSignIn} className="btn btn-dark m-2">
                        <FontAwesomeIcon icon={faFacebook} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;