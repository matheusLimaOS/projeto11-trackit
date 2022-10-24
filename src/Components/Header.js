import React from "react";
import styled from "styled-components"
import logo from "../assets/Logo2.png"
import { AuthContext } from "../Providers/Auth";

export default function Header() {
    let {user} = React.useContext(AuthContext);
    return (
        <ContainerHeader>
            <img src={logo} alt='trackIt'/>
            <ImgUser data-identifier="avatar" src={user.image} alt='Usuario'/>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    background: #126BA5;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
`

const ImgUser = styled.img`
    border-radius: 98.5px;
    width: 51px;
    height: 51px;
`