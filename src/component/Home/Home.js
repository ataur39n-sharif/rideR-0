import React from 'react';
import './Home.css'

import data from '../FakeData/Fakedata.json'
import HomeDetails from './HomeDetails';

const Home = () => {
   
    return (
        <div className="App container mt-5">
            <h1 className='mb-5'>Choose which transport you need </h1>
            {/* <Link to='/search'>search page</Link> */}
            <div className='row'>
                {
                    data.map(perdata => <HomeDetails data={perdata} key={Math.random()}></HomeDetails>)
                }
            </div>
        </div>
    );
};

export default Home;