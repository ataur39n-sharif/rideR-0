import React from 'react';
import { Link } from 'react-router-dom';
import data from '../FakeData/Fakedata.json'

const HomeDetails = (props) => {
    const { imgUrl, vehicleType } = props.data;
    const handelClick = () => {
        console.log("clicked")
    }
    return (
        <div className='col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-3 custom-hover  '>
            <div className="card" onClick={handelClick} style={{ width: '18rem' }}>
                <div className='transport-img m-3'>
                    <img src={imgUrl} alt="bike" />
                </div>
                <div className="card-body">
                    <Link to={'/vehicleType/' + vehicleType} className="card-text"><strong>{vehicleType}</strong></Link>
                </div>
            </div>
        </div>
    );
};

export default HomeDetails;