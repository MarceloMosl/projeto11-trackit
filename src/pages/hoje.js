import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { AuthToken } from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Hoje() {

    const { token } = useContext(AuthToken);
    const navigate = useNavigate()
    const dia = new Date()
    const weekDays = [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado",
        "Domingo",
    ];
    const [todayHabits, setTodayHabits] = React.useState([])
    const [atualiza, setAtualiza] = React.useState(1)
    const [concludes, setConcludes] = React.useState([])

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", { headers: { "Authorization": `Bearer ${token.token}` } })
        promise.then((res) => {
        const response = res.data
        setTodayHabits(res.data)
        let conclusos = (res.data).filter((habit) => {
            if (habit.done) {
                return true
            }
            return false
        })
        setConcludes(conclusos)
        
        })
        promise.catch((err) => alert(err.response.data))
    }, [atualiza])

    function completarHabito(obj) {
        if(obj.done !== true){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${obj.id}/check`, {}, { headers: { "Authorization": `Bearer ${token.token}` } })
        promise.then((res) => { setAtualiza(atualiza - 1)})
        promise.catch((err) => alert(err.response.data))
    } else {
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${obj.id}/uncheck`, {}, {headers: {"Authorization": `Bearer ${token.token}`}})
        promise.then((res) => {setAtualiza(atualiza - 1)}) 
        promise.catch((err) => alert(err.response.data))
    }
}



    return (
        <Container>
            <Header data-test="header">
                <h1>TrackIt</h1>
                <img onClick={ () => navigate("/")} src={token.image} alt="Neymaru"></img>
            </Header>
            <h1 data-test="today">{weekDays[Number(dia.getDay()) - 1]} , {String(dia.getDate())}/{String(dia.getMonth() + 1)} </h1>
            {concludes.length == 0 ? <p data-test="today-counter">Nenhum Habito concluido ainda</p> : <p data-test="today-counter" >{(concludes.length/ todayHabits.length * 100).toFixed(0)}% dos habitos concluidos</p> }
            <Content>
                {todayHabits.map((value, index) => !value.done ? <div data-test="today-habit-container"><p>
                    {value.name}
                    <br></br>
                    Sequencia Atual: <span data-test="today-habit-check-btn">{value.currentSequence}</span> Dias
                    <br></br>
                    Seu recorde: <span data-test="today-habit-check-btn">{value.highestSequence}</span> dias</p>
                    <Cinza data-test="today-habit-check-btn" onClick={() => completarHabito(value)}><ion-icon name="checkbox"></ion-icon></Cinza>
                </div> : <div data-test="today-habit-container"><p data-test="today-habit-name" >
                    {value.name}
                    <br></br>
                    Sequencia Atual:<span data-test="today-habit-sequence"  style={{color: "green"}}>{String(value.currentSequence)}</span> Dias
                    <br></br>
                    Seu recorde: <span  data-test="today-habit-record" style={{color: "green"}}>{String(value.highestSequence)}</span> dias</p>
                    <Verde data-test="today-habit-check-btn" onClick={() => completarHabito(value)}><ion-icon name="checkbox"></ion-icon></Verde>
                </div>)}
            </Content>


            <Footer data-test="menu">
                <p data-test="habit-link" onClick={() => navigate("/habitos")}>Hábitos</p>
                <div data-test="today-link" onClick={() => navigate("/hoje")}><span>Hoje</span></div>
                <p data-test="history-link">Historico</p>
            </Footer>
        </Container>

    )
}
const Container = styled.div`

background-color: #E5E5E5;
height: 100vh;
font-family: "Lexend Deca";
h1{
    box-sizing: border-box;
    font-size: 23px;
    color: #126BA5;
    padding: 20px;
}
p{
    box-sizing: border-box;
    padding-left: 20px;
}
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #126ba5;
  color: white;
  align-items: center;
  font-size: 39px;
  font-family: "Playball";
  height: 70px;
  img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
  }
  h1{
    color: white;
    font-size: 39px;
  }
`;
const Content = styled.div`
margin-top: 30px;
box-sizing: border-box;
padding: 10px;

div{
    display: flex;
    justify-content: space-between;
    background-color: white;
    box-sizing: border-box;
    padding: 10px;
    margin: auto;
    border-radius: 5px;
    margin-bottom: 15px;
}
ion-icon{
    font-size: 50px;
}
button{
    border: none;
    background-color: white;
}

`
const Footer = styled.div`
position: fixed;
bottom: 0;
background-color: white;

width: 100vw;
height: 70px;
box-sizing: border-box;
padding: 20px;

display: flex;
justify-content: space-between;

p{
    text-decoration: underline;
}
div{
    position: relative;
    background-color: red;
}

span{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #52B6FF;
    position: absolute;
    top: -60px;
    right: -50px;
    height: 91px;
    width: 91px;
    border-radius: 50%;

}
`
const Cinza = styled.button`
color: lightgrey;
`
const Verde = styled.button`
color: green;
`