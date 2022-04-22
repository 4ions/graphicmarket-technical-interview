//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { API } from "../../config";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SubMenu,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList } from "react-icons/fa";
import {GiTShirt, GiThreeFriends} from "react-icons/gi"
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import "./header.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Header = () => {
  


    const [menuCollapse, setMenuCollapse] = useState(true)

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const token = cookies.get('accesstoken');
  async function logout(){
    const options = {
      method: 'POST',
      url: API + "/api/auth/v01/register/logout",
      headers: { "Content-Type": "application/json", "accesstoken": token }
  }
  try {
    const res = await axios.request(options)
    cookies.remove('accesstoken');

  } catch (error) {
    console.log(error);
  }
  }
  return (
    <>
        <div id="header" >
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              <p>{menuCollapse ? "GM" : "Graphic Market"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              
              <SubMenu icon={<GiThreeFriends/>} title={menuCollapse ? "E" : "Equipos"}>
                <MenuItem >Nuevo equipo <Link to='/create/equipo'/></MenuItem>
                <MenuItem>Ver todos <Link to="/equipos"/></MenuItem>
              </SubMenu>
              <SubMenu icon={<GiTShirt/>} title={menuCollapse ? "J" : "Jugadores"}>
                <MenuItem>Nuevo Jugador <Link to='/create/jugador' /></MenuItem>
                <MenuItem>Ver todos <Link to="/jugadores" /></MenuItem>
              </SubMenu>
            </Menu>
            
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={logout}>Cerrar sesion <Link to='/'/></MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;