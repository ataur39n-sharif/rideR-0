import React, { useContext, useState } from 'react';
import SearchNext from './SearchNext';

import { useParams } from 'react-router';
import { userContext } from '../../App';

const Search = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    const { vehicle }  = useParams()
    console.log(vehicle);
    const [state, setState] = useState({
        from: '',
        to: '',
    })

    const handelChange = (e) => {
        console.log(e.target.name, e.target.value);
        const newState = { ...state }
        newState[e.target.name] = e.target.value
        setState(newState)
    }

    const handelSubmit = (e) => {
        // const value = document.getElementById('transport').value
        console.log(state)
        const vehicleState = { ...state }
        vehicleState.vehicle = vehicle || ''
        vehicleState.showResult = true
        setState(vehicleState)
        // setLoggedInUser(vehicleState)
    }
    console.log(state);

    return (
        <div className="App mt-5 ml-3">
            <div className=' row '>
                <div className='col-md-4 '>
                    <div>
                        <label htmlFor="">From</label>
                        <input onBlur={handelChange} type="text" className="form-control m-3" placeholder=" Kishoreganj" name="from" />
                        <label htmlFor=""> To</label>
                        <input onBlur={handelChange} type="text" className="form-control m-3" placeholder=" Dhaka" name="to" />
                        <br />
                        <label htmlFor="">Before checking cost you must have to select a vehicle from homepage </label>
                        <button onClick={handelSubmit} className="btn btn-dark m-2">Search</button>
                    </div>
                    <div>
                        {
                            <SearchNext state={state}></SearchNext>
                        }
                    </div>
                </div>
                <div style={{width:'700px', height: "600px" }} className='col-md-6 '>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3642.1110983344006!2d90.40268608527617!3d24.0975882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3756918773180af5%3A0x530a9427210ef003!2sKishoreganj!3m2!1d24.4331227!2d90.7865655!4m5!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!3m2!1d23.810332!2d90.4125181!5e0!3m2!1sen!2sbd!4v1616191073488!5m2!1sen!2sbd" width="700" height="500" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Search;