
import styled from "styled-components";
import React, { useContext, useEffect } from "react";
import { AuthToken } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Habits() {
    const [state, setState] = React.useState(false);
    const [name, setName] = React.useState("")
    const weekDays = [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sabado",
        "Domingo",
    ];
    const [selecionados, setSelecionados] = React.useState([]);
    const [days, setDays] = React.useState([]);
    const [habitos, setHabitos] = React.useState([])
    const [atualiza, setAtualiza] = React.useState(1)
    const { token } = useContext(AuthToken);
    const navigate = useNavigate()

    useEffect(() => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: { "Authorization": `Bearer ${token.token}` } })
        promise.then((res) => {
            setHabitos(res.data)
        })
        promise.catch((err) => alert(err.response.data))
    }, [atualiza])


    function enviarHabito(a) {
        a.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { name, days }, { headers: { "Authorization": `Bearer ${token.token}` } })
        promise.then((res) => {
            setAtualiza(atualiza - 1)
            setDays([])
            setName("")
        })
        promise.catch((err) => alert(err.response.data))
    }
    function removeHabit(habit) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, { headers: { "Authorization": `Bearer ${token.token}` } })
        promise.catch((err) => alert(err))
        promise.then((res) => setAtualiza(atualiza - 1))
    }

    return (
        <Container>
            <Header>
                <h1>TrackIt</h1>
                <img onClick={ () => navigate("/")} src={token.image} alt="Neymaru"></img>
            </Header>

            <Add>
                <h1>Meus hábitos</h1>
                <button
                    onClick={() => (state == true ? setState(false) : setState(true))}
                >+
                </button>
            </Add>
            <Habito onSubmit={(a) => enviarHabito(a)} visible={state}>
                <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="nome do habito" required />
                <div>
                    {weekDays.map((a, b) =>
                        selecionados.includes(a) ? (
                            <Butao select={"true"} type="button" disabled={true}>
                                {a[0]}
                            </Butao>
                        ) : (
                            <Butao
                                select={"false"}
                                onClick={() => {
                                    setSelecionados([...selecionados, a])
                                    setDays([...days, b + 1])
                                }}
                                type="button"
                            >
                                {a[0]}
                            </Butao>
                        )
                    )}
                </div>
                <section>
                    <Cancelar type="button" onClick={() => {
                        setSelecionados([])
                        setDays([])
                        setState(false)
                    }}>
                        Cancelar
                    </Cancelar>
                    <Enviar type="submit" onClick={() => {
                        setSelecionados([])
                        setState(false)
                    }}>Enviar</Enviar>
                </section>
            </Habito>

            <Content>
                {habitos.length == 0
                    ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    : habitos.map((a) => <Item>
                        <h1>{a.name}</h1>
                        <p>Dias {a.days.map((value) => " - " + weekDays[Number(value) - 1] + " ")}</p>
                        <ion-icon onClick={() => removeHabit(a)} name="trash-outline"></ion-icon>
                    </Item>)}
            </Content>

            <Footer>

                <p onClick={() => navigate("/habitos")}>Hábitos</p>
                <div onClick={() => navigate("/hoje")}><span>Hoje</span></div>
                <p onClick={() => navigate("/historico")}>Historico</p>


            </Footer>
        </Container>
    );
}
const Container = styled.div`
background-color: #E5E5E5;
height: 100vh;
font-family: "Lexend Deca";
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
`;
const Add = styled.div`
  font-family: "Lexend Deca";
  font-size: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  color: #126ba5;
  button {
    background-color: #52b6ff;
    border: none;
    color: white;
    width: 40px;
    height: 35px;
    border-radius: 5px;
  }
`;
const Content = styled.div`
  
  font-size: 18px;
  color: #666666;
  padding: 20px;
`;
const Habito = styled.form`
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: white;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  width: 360px;
  border-radius: 5px;
  margin: auto;
  color: #d4d4d4;
  input {
    height: 45px;
    border: none;
    border: 1px solid #d4d4d4;
  }
  div {
    display: flex;
    margin: auto;
    margin-top: 15px;
    gap: 20px;
  }
  section {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    button {
      width: 84px;
      height: 50px;
    }
  }
`;
const Cancelar = styled.button`
  color: #52b6ff;
  background-color: white;
  border: none;
`;
const Enviar = styled.button`
  color: white;
  background-color: #52b6ff;
  border: none;
  border-radius: 5px;
`;
const Butao = styled.button`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #d4d4d4;
  background-color: ${(props) => (props.select === "true" ? "grey" : "white")};
  border: none;
  border: 1px solid #d4d4d4;
  width: 25px;
  height: 30px;
  margin-bottom: 20px;
`;
const Item = styled.div`
background-color: white;
padding: 20px;
display: flex;
flex-direction: column;
margin-bottom: 20px;
position: relative;
border-radius: 5px;
ion-icon{
    position: absolute;
    top: 15px;
    right: 5px;
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