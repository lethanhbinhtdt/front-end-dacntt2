import React from 'react';
import PersonalInfor from './PersonalInfor'

function PersonalPage(props) {
    const { numberNoti, setNumberNotiRealTime, currUserInfo } = props
    return (
        <div>
          <PersonalInfor currUserInfo={currUserInfo} numberNoti={numberNoti}/>
        </div>
    );
}

export default PersonalPage;
