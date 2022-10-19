import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"

export default function PaginaLogin() {
    return (
        <ContainerPaginaLogin>
            <img src={logo} alt='TrackIt' />
            <Formulario>
                <input type='text' placeholder="email"></input>
                <input type='password' placeholder="senha"></input>
                <input type='text' placeholder="nome"></input>
                <input type='text' placeholder="foto"></input>
                <button>Cadastrar</button>
                <Link to={'/'}>Já tem uma conta? Faça login!</Link>
            </Formulario>
        </ContainerPaginaLogin>
    )
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