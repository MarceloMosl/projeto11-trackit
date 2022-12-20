import styled from "styled-components";
import React, { useContext} from "react";
import { AuthToken } from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Historico() {

    const { token } = useContext(AuthToken);
    const navigate = useNavigate()

    return (
        <Container>
            <Header data-test="header">
                <h1>TrackIt</h1>
                <img onClick={ () => navigate("/")} src={token.image} alt="Neymaru"></img>
            </Header>
            <h1>Historico</h1>
            <div>
            Em breve você poderá ver o histórico dos seus hábitos aqui!
            </div>
            <Footer data-test="menu">
                <p data-test="habit-link" onClick={() => navigate("/habitos")}>Hábitos</p>
                <div data-test="today-link" onClick={() => navigate("/hoje")}><span>Hoje</span></div>
                <p data-test="history-link" onClick={() => navigate("/historico")}>Historico</p>
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
div{
    padding: 10px;
    font-size: 21px;

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
