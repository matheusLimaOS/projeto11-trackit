import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"
import {ThreeDots} from "react-loader-spinner"

export default function PaginaLogin() {
    const [Button,setButton] = useState('Cadastrar');
    return (
        <ContainerPaginaLogin>
            <img src={logo} alt='TrackIt' />
            <Formulario onSubmit={(e)=>{handleSubmit(e,setButton)}}>
                <input type='text' placeholder="email" required disabled={Button === 'Cadastrar' ? false : true}></input>
                <input type='password' placeholder="senha" required disabled={Button === 'Cadastrar' ? false : true}></input>
                <input type='text' placeholder="nome" required disabled={Button === 'Cadastrar' ? false : true}></input>
                <input type='text' placeholder="foto" required disabled={Button === 'Cadastrar' ? false : true}></input>
                <button disabled={Button === 'Cadastrar' ? false : true}>{Button}</button>
                <Link to={'/'}>Já tem uma conta? Faça login!</Link>
            </Formulario>
        </ContainerPaginaLogin>
    )
}

function handleSubmit(e,setButton){
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

    // let usuario = {
    //     email: e.target[0].value,
    //     name: e.target[2].value,
    //     Image: e.target[3].value,
    //     password: e.target[1].value
    // }


    //let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',usuario)
}

const ContainerPaginaLogin = styled.div`
    display:flex;
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
    button:disabled{
        opacity: 0.7;
    }
    input:disabled{
        background-color: #F2F2F2;
        color: #D4D4D4;
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