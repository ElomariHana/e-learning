import React from 'react';

import { MdSecurity } from "react-icons/md";
import { IoMdCloudOutline } from "react-icons/io";
import { FaNetworkWired } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import './company-section.css'

const Company = () => (
  <div className="elearning__brand section__padding">
    <div>
    <IoMdCloudOutline style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/>Cloud Computing 
    </div>
    <div>
    <MdSecurity style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Security
    </div>
    <div>
    <MdSecurity style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Security
    </div>
    <div>
    <FaNetworkWired style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Network
    </div>
    <div>
    <MdLockOutline style={{ color: '#fff', fontSize: '30px', marginRight: '5px' }}/> Cybersec
    </div>
  </div>
);

export default Company;
