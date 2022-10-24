import styled from "styled-components"
import { CheckmarkOutline } from 'react-ionicons'
import React from "react";
import { AuthContext } from "../Providers/Auth";
import axios from "axios";

export default function HabitoHoje(props){
    let {user,habitosHoje,setHabitosHoje} = React.useContext(AuthContext);

    return(
        <ContainerHabito>
            <ContainerTexto data-identifier="today-infos">
                <h1>
                    {habitosHoje[props.index].name}
                </h1>
                <p data-identifier="today-infos">
                    Sequência atual: <TextoDiasAtuais cor={habitosHoje[props.index].done}>{habitosHoje[props.index].currentSequence} dias</TextoDiasAtuais> <br></br>
                    Seu recorde: <TextoRecorde
                            cor = {habitosHoje[props.index].done && (habitosHoje[props.index].currentSequence === habitosHoje[props.index].highestSequence)}
                        >{habitosHoje[props.index].highestSequence} dias
                        </TextoRecorde> 
                </p>
                
            </ContainerTexto >
            <Botao data-identifier="done-habit-btn" cor={habitosHoje[props.index].done} onClick={habitosHoje[props.index].done ? undefined : ()=>{handleClick(habitosHoje[props.index],user,props.index,habitosHoje,setHabitosHoje)}}>
                <CheckmarkOutline
                    color='white'
                    height='35px'
                    width='35px'
                />
            </Botao>
        </ContainerHabito>
    )
}

function handleClick(habito,user,index,habitosHoje,setHabitosHoje){
    console.log(habito);
    let promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`,undefined
    ,{
        headers: {
            authorization: `Bearer ${user.token}`
        }
    })

    promise.then(()=>{
        let array = habitosHoje;
        array[index].done = true;
        setHabitosHoje(array);
    })
    promise.catch((error)=>{
        console.log(error.response.data)
    })

}

const ContainerHabito = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white;
    align-items: center;
`

const Botao = styled.button`
    height: 70px;
    width: 70px;
    background: ${props => props.cor ? '#8FC549' : '#EBEBEB'};
    border: ${props => props.cor ? 'none' : '1px solid #E7E7E7'};
    border-radius: 5px;
    margin-right: 15px;
`

const ContainerTexto = styled.div`
    margin-left: 15px;
    h1{
        margin-bottom:10px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;

        color: #666666;
    }
`

const TextoDiasAtuais = styled.span`
    color: ${props => props.cor ? '#8FC549' : '#666666'};
`
const TextoRecorde = styled.span`
    color: ${props => props.cor ? '#8FC549' : '#666666'};
`