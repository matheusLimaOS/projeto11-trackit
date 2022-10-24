import React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"
import {ThreeDots} from "react-loader-spinner"
import { AuthContext } from "../Providers/Auth"
import axios from "axios"

export default function PaginaLogin() {
    const [Button,setButton] = useState('Entrar');
    let {setUser} = React.useContext(AuthContext);
    let navigate = useNavigate();

    return (
        <ContainerPaginaLogin>
            <img src={logo} alt='TrackIt' />
            <Formulario onSubmit={(e)=>{handleSubmit(e,navigate,setButton,setUser)}}>
                <input data-identifier="input-email" type='text' placeholder="email" required disabled={Button === 'Entrar' ? false : true}></input>
                <input data-identifier="input-password" type='password' placeholder="senha" required disabled={Button === 'Entrar' ? false : true}></input>
                <button data-identifier="login-btn" disabled={Button === 'Entrar' ? false : true}>{Button}</button>
                <Link data-identifier="sign-up-action" to={'/cadastro'}>Não tem uma conta? Cadastre-se!</Link>
            </Formulario>
        </ContainerPaginaLogin>
    )
}

function handleSubmit(e,navigate,setButton,setUser){
    e.preventDefault();
    setButton(
        <ThreeDots 
            height="45" 
            width="45" 
            radius="9"
            color="#FFFFFF" 
            ariaLabel="three-dots-loading"
            visible={true}
        />
    )
    
    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login',
    {
        email:e.target[0].value,
        password:e.target[1].value
    });

    promise.then((response)=>{
        setUser({
            name: response.data.name,
            image: response.data.image,
            token: response.data.token
        })
        navigate('/hoje');
    });

    promise.catch((error)=>{
        setButton('Entrar');
        alert(error.response.data.message);
    })

}

const ContainerPaginaLogin = styled.div`
    display:flex;
    background-color: white;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-top:70px;
    img{
        margin-bottom: 35px;
        width: 180px;
        height: 180px;
    }
`

const Formulario = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    button:disabled{
        opacity: 0.7;
    }
    input:disabled{
        background-color: #F2F2F2;
        color: #D4D4D4;
    }
    button{
        height: 45px;
        border: 0;
        background: #52B6FF;
        border-radius: 5px;
        color: white;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-size: 21px;
        font-weight: 400;
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    input{
        padding-left: 10px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        height: 45px;
        border-radius: 5px;
        margin-bottom: 10px;
    }
    input::placeholder{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        color: #DBDBDB;
    }
    a{
        text-align: center;
        color: #52B6FF;
;
    }
`