import React, { useState } from 'react';
import vehicleData from '../FakeData/Fakedata.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers , faDollarSign } from '@fortawesome/free-solid-svg-icons'

const SearchNext = (props) => {
console.log(props.state);
    const {vehicle , showResult} = props.state

    const [details , setDetails] = useState({
        vehicleType : '',
        userLimit: '',
        cost: '',
    })
    
if(showResult === true) {
    const result = vehicleData.find(({ vehicleType }) => vehicleType === vehicle);
const { vehicleType , userLimit , cost , imgUrl} = result
const newData = {
    // vehicleType : vehicleType || '',
    userLimit : userLimit || '',
    cost : cost || '',
    imgUrl : imgUrl || '',
}

    setDetails(newData)
console.log(result)
}

    
    
    return (
        <div >
            
                <div className="d-flex justify-content-center bg-dark text-light rounded w-100">
                <div className="w-50">
                    <div className="d-flex justify-content-between">
                        <div style={{width:'50px' , height:'50px'}}>
                        <img style={{width:'100%' , height:'100%'}} src={details.imgUrl} alt="" />
                        </div>
                        <div className='m-2'>
                        <FontAwesomeIcon icon={faUsers} />   {details.userLimit}
                        </div>
                        <div className='m-2'>
                        <FontAwesomeIcon icon={faDollarSign} />  {details.cost}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchNext;