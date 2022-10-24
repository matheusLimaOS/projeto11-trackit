import React, { useEffect } from "react";
import { AuthContext } from "../Providers/Auth";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from './Footer';
import axios from "axios";
import HabitoHoje from "./HabitoHoje";

export default function Hoje() {
    let {user,habitosHoje,setHabitosHoje,hoje,setHoje} = React.useContext(AuthContext);
    let navigate = useNavigate();
    let dias = ['Domingo','Segunda', 'Terça', 'Quarta','Quinta','Sexta','Sábado'];
    const date = new Date();
    let diaSemana = date.getDay();
    let dia = date.getDate();
    let month = date.getMonth()+1;

    useEffect(()=>{
        let promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",{
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
        promise.then((response)=>{
            let conc = 0;
            let Nconc = 0;
            response.data.forEach(element => {
                if(element.done){
                    conc++;
                }
                else{
                    Nconc++;
                }
            });
            let percentage = ((conc/(Nconc+conc))*100).toFixed(0);
            setHoje({percentage:percentage});
            setHabitosHoje(response.data);
        })
        promise.catch(()=>{
            navigate("/");
        })
        //eslint-disable-next-line
    },[])

    return(
        <>
            <Header/>
            <ContainerPaginaHoje>
                <ContainerTexto data-identifier="today-infos">
                    <h1>{dias[diaSemana]}, {dia}/{month}</h1>
                    {hoje.percentage === 0 ? <PConcluido cor={false}>Nenhum hábito concluído ainda</PConcluido> : <PConcluido cor={true}>{hoje.percentage}% dos hábitos concluídos</PConcluido>}
                </ContainerTexto>
                {
                    habitosHoje.map((habito,index)=>{
                        return <HabitoHoje key={habito.id} index={index}></HabitoHoje>
                    })
                }
            </ContainerPaginaHoje>
            <Footer/>
        </>
    )
}

const PConcluido = styled.p`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${props => props.cor ? '#8FC549' : '#BABABA'};;
`

const ContainerPaginaHoje = styled.div`
    height: calc(100vh - 70px);
    background-color: #F2F2F2;
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

`

const ContainerTexto = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    margin: 20px 0px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }

`