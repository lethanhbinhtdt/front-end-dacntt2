
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faBirthdayCake, faEnvelope, faTransgender, faUser } from '@fortawesome/fontawesome-free-solid';

import Friend from "./Friend";
function Infor() {
    return (

        <div className='container'>
            <div className='row'>



                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-4 md-4  d-flex align-items-center">
                            <h4>THÔNG TIN CÁ NHÂN</h4>
                        </div>
                        <div className="col-6 md-6  d-flex align-items-center">
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><FontAwesomeIcon icon={faUser} /> Nguyển Xuân Thịnh</li>
                                    <li className="list-group-item"><FontAwesomeIcon icon={faTransgender} /> Nam</li>
                                    <li className="list-group-item"><FontAwesomeIcon icon={faPhone} /> 0339471446</li>
                                    <li className="list-group-item"><FontAwesomeIcon icon={faBirthdayCake} /> 07/05/2000</li>
                                    <li className="list-group-item"><FontAwesomeIcon icon={faEnvelope} /> 51800123@gmail.com</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            

            {/* phần bạn bè  */}
            <div className='row'>
                    <Friend/>
            </div>
   

        </div>
    
    );
}

export default Infor;