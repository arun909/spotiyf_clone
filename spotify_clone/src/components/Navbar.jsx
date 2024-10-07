import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import {CgProfile} from "react-icons/cg";
import { useStateProvider } from '../utils/StateProvider';
export default function Navbar() {
  const [{userinfo}] = useStateProvider();
  return 
    <container>
         <div className="Search__bar">
          <FaSearch />
            <input type="text" placeholder='Artists, Songs, or podcasts'/>
          </div>
          <div className="avatar">
            <a href='#'>
              <CgProfile/>
              <span>{userinfo?.name}</span>
            </a>
          </div>
    </container>
}


const container = styled.div`
  height: 100%;
`;