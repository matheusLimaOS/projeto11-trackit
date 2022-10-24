import { TrashOutline } from "react-ionicons";
import React from "react";
import { AuthContext } from "../Providers/Auth";
import axios from "axios";
import styled from "styled-components";

export default function Habito(props) {
    let { habitos, setHabitos, user } = React.useContext(AuthContext);
    let days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    return (
        <ContainerHabito>
            <button data-identifier="delete-habit-btn" onClick={() => { handleClick(props.habito.id, user, habitos, setHabitos) }}>
                <TrashOutline />
            </button>
            <h1 data-identifier="habit-name">{props.habito.name}</h1>

            <Botoes>
                {days.map((day, i) => {
                    return <Botao key={i} cor={props.habito.days.includes(i)}>{day}</Botao>
                })}
            </Botoes>
        </ContainerHabito>
    );
}

function handleClick(id, user,habitos,setHabitos) {
    let certeza = window.confirm("Tem certeza que deseja excluir?");
    if (certeza) {
        let promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
            {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }
        )

        promise.then(() => {
            let array = [];
            habitos.forEach(element => {
                if(element.id !== id){
                    array.push(element);
                }
            });

            setHabitos(array);
        })
        promise.catch(() => {
            alert('Erro')
        })
    }


}

const ContainerHabito = styled.div`
    background: #FFFFFF;
    border-radius: 5px;
    width: 100%;
    position: relative;
    margin-bottom: 20px;
    > button{
        position: absolute;
        top: 10px;
        right: 20px;
        background-color: #FFFFFF;
        border: none;
        width: 15px;
        height: 15px;
    }

    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        /* identical to box height */


        color: #666666;
        margin-left: 15px;
        margin-top: 15px;
        margin-bottom: 10px;
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
