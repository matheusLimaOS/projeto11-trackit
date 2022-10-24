import Header from "./Header"
import Footer from "./Footer"
import React, { useState } from "react";
import { AuthContext } from "../Providers/Auth";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AddOutline } from "react-ionicons";
import Habito from "./Habito";
import {ThreeDots} from "react-loader-spinner"

export default function Habitos(){
    const [Button,setButton] = useState('Salvar');
    let {user,habitos,setHabitos} = React.useContext(AuthContext);
    let navigate = useNavigate();
    let days = ['D','S','T','Q','Q','S','S'];
    let [add,setAdd] = useState(false);
    let [selecionados,setSelecionados] = useState([]);
    let [input,setInput] = useState('');
    useEffect(()=>{
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",{
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        promise.then((response)=>{
            console.log(response.data)
            setHabitos(response.data)
        })
        promise.catch(()=>{
            navigate("/");
        })
        //eslint-disable-next-line
    },[])

    return(
        <>
            <Header/>
            <ContainerPaginaHabitos>
                <ContainerTexto>
                    <h1>Meus hábitos</h1>
                    <button data-identifier="create-habit-btn" onClick={()=>setAdd(true)}><AddOutline color="white"/></button>
                </ContainerTexto>
                <Formulario onSubmit={(event)=>{handleSubmit(event,selecionados,setSelecionados,setAdd,user,habitos,setHabitos,input,setInput,setButton)}} mostrar={add}>
                    <input disabled={Button === 'Salvar' ? false : true} onChange={(e)=>{setInput(e.target.value)}} value={input} required data-identifier="input-habit-name" type='text' placeholder="nome do hábito"/>
                    <Botoes>
                        {days.map((day,i)=>{
                            return <Botao disabled={Button === 'Salvar' ? false : true} data-identifier="week-day-btn" type="button" onClick={()=>{handleClick(selecionados,setSelecionados,i)}} key={i} cor={selecionados.includes(i)}>{day}</Botao>
                        })}
                    </Botoes>
                    <ContainerBotoes>
                        <BotaoCancelar data-identifier="cancel-habit-create-btn" type="button" onClick={()=>{setAdd(false)}}>
                            Cancelar
                        </BotaoCancelar>
                        <BotaoSalvar data-identifier="save-habit-create-btn" disabled={Button === 'Salvar' ? false : true} type="submit">
                            {Button}
                        </BotaoSalvar>
                    </ContainerBotoes>

                </Formulario>
                {
                    habitos.length===0 ? <p data-identifier="no-habit-message">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p> : 
                    habitos.map((habito,index)=>{
                        return <Habito key={index} habito={habito}/>
                    })
                }
            </ContainerPaginaHabitos>
            <Footer/>
        </>
    )
}

function handleSubmit(e,selecionados,setSelecionados,setAdd,user,habitos,setHabitos,input,setInput,setButton){
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
    let obj = {
        name: input,
        days: selecionados
    }

    let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',obj,{
        headers: {
            authorization: `Bearer ${user.token}`
        }
    })

    promise.then((response)=>{
        let array = [...habitos,response.data];
        setHabitos(array);
        setSelecionados([]);
        setInput('');
        setAdd(false);
        setButton('Salvar');
    })
    promise.catch(()=>{
        setButton('Salvar');
    })
}

function handleClick(selecionados,setSelecionados,i){
    if(selecionados.includes(i)){
        let array = [];
        selecionados.forEach(element => {
            if(element!==i){
                array.push(element);
            }
        });

        setSelecionados(array)
    }
    else{
        let array = [...selecionados,i];
        setSelecionados(array);
    }
}

const ContainerPaginaHabitos = styled.div`
    background-color: #F2F2F2;
    height: calc(100vh - 70px);
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;

        color: #666666;
    }
`
const ContainerTexto = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 20px 0px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

    button{
        color: white;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        width: 40px;
        height: 35px;
    }
`
const Formulario = styled.form`
    display: ${props => props.mostrar ? 'flex' : 'none'};
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    button:disabled{
        opacity: 0.7;
    }
    input:disabled{
        background-color: #F2F2F2;
        color: #D4D4D4;
    }
    > input{
        padding-left: 15px;
        margin: 20px 15px 5px 15px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder{
            font-family: 'Lexend Deca';
            font-style: normal;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #DBDBDB;
        }
    }
`
const Botao = styled.button`
    width: 30px;
    height: 30px;
    color: ${props => props.cor ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.cor ? '#CFCFCF' : '#FFFFFF'};
    border: ${props => props.cor ? '1px solid #CFCFCF' : '1px solid #D5D5D5'};
    border-radius: 5px;
    margin-right: 5px;
`
const Botoes = styled.div`
    margin-left: 15px;
    margin-bottom: 15px;
`
const BotaoCancelar = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    color: #52B6FF;
    border: none;
    background-color: inherit;
`
const BotaoSalvar = styled.button`
    display:flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    color: #FFFFFF;
    background: #52B6FF;
    border-radius: 4.63636px;
    width: 90px;
    height: 35px;
    margin-left: 25px;
    margin-right: 15px;
    border: none;
`
const ContainerBotoes = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 15px;
`