import React from 'react';
import PersonalInfor from './PersonalInfor'

function PersonalPage(props) {
    const { numberNoti, setNumberNotiRealTime } = props
    return (
        <div>
          <PersonalInfor numberNoti={numberNoti}/>
        </div>
    );
}

export default PersonalPage;
