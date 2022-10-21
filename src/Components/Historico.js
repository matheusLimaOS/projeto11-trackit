import styled from "styled-components";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Historico() {
    return (
        <>
            <Header/>
            <ContainerHistorico>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </ContainerHistorico>
            <Footer/>
        </>

    )
}

const ContainerHistorico = styled.div`
    height: calc(100vh - 70px);
    background-color: #E5E5E5;
    h1{
        padding-top: 25px;
        padding-bottom: 20px;
        padding-left: 15px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
    }
    p{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        padding-left: 15px;
        color: #666666;
    }
`