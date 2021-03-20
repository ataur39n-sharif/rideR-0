import React, { useContext, useState } from 'react';
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle , faFacebook} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { userContext } from '../../App';



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


const LogIn = () => {

const [loggedInUser, setLoggedInUser] = useContext(userContext)

    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handelChange = (e) => {
        const newUser = {...user} 
        newUser[e.target.name] = e.target.value;
        setUser(newUser)
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log('clicked')
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(result =>{

            const { displayName , email } = result.user
            const newUser ={
                name: displayName,
                email: email,
            }
            setUser(newUser)
            setLoggedInUser(newUser)
            console.log(result);
        })
        .catch(err =>{
            console.log(err.message)
        })

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
                console.log(err.message)
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
                console.log(err.message)
            })
    }
 
    return (
        <div className="App d-flex justify-content-center">
            <div>
                <h1>Log in page </h1>
                <div>
                    <form className="">
                        <input className='form-control m-2' type="text" placeholder="Enter your email address"  onBlur={handelChange} name='email'/>
                        <input className='form-control m-2' type="password" placeholder="Enter your password" onBlur={handelChange} name='password' />
                        <button onClick={handelSubmit} className='btn btn-dark'> Submit</button>
                    </form>
                    <h4>New User ? <Link to="/signUp">SignUp</Link></h4>
                </div>
                <div>
                    ------------------or------------------- 
                    <br/>
                    sign in with 
                    <br/>
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

export default LogIn;