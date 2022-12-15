import testando from "./../assets/t.jpg"
import styled from "styled-components"
import React from "react"
import axios from "axios"

export default function Cadastro () {
    const [email, setEmail] =  React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] =  React.useState("")
    const [image, setImage] = React.useState("")

    function cadastrar (a) {
        a.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {email, name,image,password})
        promise.then((res) => console.log(res))
        promise.catch((err) => alert(err.response.data.message))

    }


    return (

        <SingUP>
        <img src={testando} alt="TackIt"></img>
        
        <form onSubmit={(a) => cadastrar(a)}>
                <input onChange={ (a) => setEmail(a.target.value) } required type="email" placeholder="email"></input>
                <input onChange={ (a) => setPassword(a.target.value) } required type="password" placeholder="senha"></input>
                <input onChange={ (a) => setName(a.target.value) } required type="text" placeholder="nome"></input>
                <input onChange={ (a) => setImage(a.target.value) } required type="text" placeholder="foto"></input>
                <button type="submit" >Entrar</button>
                
            </form>
        </SingUP>

    )


}
const SingUP = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    img{
        width: 200px;
        margin: auto;
        margin-top: 5%;
    }
    form{
        width: 300px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 5px;
        input{
            height: 45px;
        }
        button{
            height: 45px;
            background-color: #52B6FF;
            color: white;
            border: none;
        }
        a{
            text-align: center;
            margin-top: 50px;
            text-decoration: underline;
            color: #52B6FF;
        }
    }

`