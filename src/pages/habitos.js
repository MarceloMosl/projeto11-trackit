import neymar from "./../assets/neymar.jpg"
import styled from "styled-components"
import React, {useContext} from "react"
import { AuthToken } from "../context/Context"



export default function Habits () {
    const [state, setState] = React.useState(false)
    const days =  ["Segunda", "Terça", "Quarta", "Quita", "Sexta", "Sabado", "Domingo"]
    const [selecionados, setSelecionados] = React.useState([])

    const { token } = useContext(AuthToken)

    return (
    <>
        <Header>
            <h1>TrackIt</h1>
            <img src={neymar} alt="Neymaru"></img>
        </Header>

        <Add>
            <h1>Meus hábitos</h1>
            <button onClick={() => state == true ? setState(false) : setState(true)}> + </button>
        </Add>
        <Habito visible={state}>
                <input type="text" placeholder="nome do habito" required/>
            <div>
                {days.map((a,b) => selecionados.includes(a) ? <Butao select={"true"} type="button">{a[0]}</Butao> : <Butao select={"false"} onClick={() => setSelecionados([...selecionados, a])} type="button">{a[0]}</Butao>  )}
            </div>
            <section>
                <Cancelar type="reset" onClick={ () => setSelecionados([])}>Cancelar</Cancelar>
                <Enviar type="submit">Enviar</Enviar>
            </section>

        </Habito>

        <Content>
            <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </p>
        </Content>
    
        <footer></footer>
    </>
    
    )
}

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
background-color: #126BA5;
color: white;
align-items: center;
font-size: 39px;
font-family: "Playball";
height: 70px;
img{
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
}
`
const Add = styled.div`
font-family: "Lexend Deca";
font-size: 23px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 30px;
color:#126BA5;
button{
    background-color: #52B6FF;
    border: none;
    color: white;
    width: 40px;
    height: 35px;
    border-radius: 5px;
}
`
const Content = styled.div`
font-family: "Lexend Deca";
font-size: 18px;
color: #666666;
padding: 20px;
`
const Habito = styled.form`
display: ${(props) => (props.visible ? "flex" : "none")};
flex-direction: column;
padding: 20px;
margin: auto;
color: #D4D4D4;
input{
    height: 45px;
    border: none;
    border: 1px solid #D4D4D4;
}
div{
    display: flex;
    margin: auto;
    margin-top: 15px;
    gap: 20px;
}
section{
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button{
        width: 84px;
        height: 50px;
    }
}
`
const Cancelar = styled.button`
color: #52B6FF;
background-color: white;
border: none;

`
const Enviar = styled.button`
color: white;
background-color: #52B6FF;
border: none;
border-radius: 5px;

`
const Butao = styled.button`  
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        color: #D4D4D4;
        background-color: ${(props) => (props.select ===  "true" ? "grey" : "white")};
        border: none;
        border: 1px solid #D4D4D4;
        width: 25px;
        height: 30px;
        margin-bottom: 20px;



`