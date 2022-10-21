import styled from "styled-components"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";

export default function PaginaLogin() {
    return (
        <ContainerFooter>
            <LinkHabitos>Hábitos</LinkHabitos>
            <div>
                <CircularProgressbar 
                    value={66} 
                    text={'Hoje'} 
                    background={true}
                    backgroundPadding={8}
                    styles={buildStyles({
                        pathColor: `#FFFFFF`,
                            textColor: '#FFFFFF',
                            trailColor: '#52B6FF',
                            backgroundColor: '#52B6FF',
                    })}
                />
            </div>
            <LinkHistorico>Histórico</LinkHistorico>
        </ContainerFooter>
    )
}

const ContainerFooter = styled.div`
    height: 70px;
    background: #FFFFFF;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    & > div{
        position: absolute;
        top: -40px;
        left: calc(50% - 50px);;
        width: 100px;
        height: 100px;
    }
`

const LinkHabitos = styled(Link)`
    margin-left: 35px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    color: #52B6FF;
    text-decoration: none;
`

const LinkHistorico = styled(Link)`
    margin-right: 35px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    color: #52B6FF;
    text-decoration: none;
`