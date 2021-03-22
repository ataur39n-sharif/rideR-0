import React, { useContext, useState } from 'react';
import vehicleData from '../FakeData/Fakedata.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faDollarSign } from '@fortawesome/free-solid-svg-icons'
// import SearchNext from './SearchNext';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Search = () => {

    const { vehicle } = useParams()
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
    const [showResult, setResult] = useState(true)
    const handelSubmit = (e) => {
        if (state.from === '' && state.to === '') {
            alert('Please fill all fields')
        }
        else {
            let result = !showResult
            setResult(result)
            console.log(showResult)
        }

    }
    console.log(state);

    const result = vehicleData.find(({ vehicleType }) => vehicleType === vehicle);

    return (
        <div className="App mt-5 ml-3">
            <div className=' row  d-flex justify-content-center w-100'>
                <div className='col-md-4'>
                    {
                        showResult &&
                        <div>
                            <label htmlFor="">From</label>
                            <input onBlur={handelChange} type="text" className="form-control m-3 custom-required" placeholder=" Kishoreganj" name="from" />
                            <label htmlFor=""> To</label>
                            <input onBlur={handelChange} type="text" className="form-control m-3 custom-required" placeholder=" Dhaka" name="to" />
                            <label htmlFor=""> Select date</label>
                            <input type="date" className="form-control m-3 custom-required" />
                            <br />
                            <button onClick={handelSubmit} className="btn btn-dark m-2">Search</button>
                        </div>
                    }
                    {

                        showResult === false &&
                        <div className="bg-light p-3">
                            <Link to="/home"> <button className="btn btn-dark">back to home</button></Link>
                            <div className="bg-dark text-light rounded m-3 p-2">
                                <h3>From : {state.from}</h3>
                                <h3>To : {state.to}</h3>
                            </div>
                            <div className="d-flex justify-content-between bg-dark p-4 rounded text-light">
                                <img style={{ height: "50px" }} src={result.imgUrl} alt="" />
                                <p>{result.vehicleType}</p>
                                <p><FontAwesomeIcon icon={faUsers} /> {result.userLimit}</p>
                                <p><FontAwesomeIcon icon={faDollarSign} /> {result.cost}</p>
                            </div>
                        </div>
                    }
                </div>
                <div style={{ width: '700px', height: "600px" }} className='col-md-6 m-3 p-2'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3642.1110983344006!2d90.40268608527617!3d24.0975882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x3756918773180af5%3A0x530a9427210ef003!2sKishoreganj!3m2!1d24.4331227!2d90.7865655!4m5!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!3m2!1d23.810332!2d90.4125181!5e0!3m2!1sen!2sbd!4v1616191073488!5m2!1sen!2sbd" width="700" height="500" style={{ border: '0' }} allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Search;