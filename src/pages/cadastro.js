import testando from "./../assets/t.jpg"
import loadingImg from "./../assets/loading.png"
import styled from "styled-components"
import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
export default function Cadastro () {
    const [email, setEmail] =  React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] =  React.useState("")
    const [image, setImage] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function cadastrar (a) {
        setLoading(true)
        a.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {email, name,image,password})
        promise.then((res) => {
            console.log(res)
            setLoading(false)

        })
        promise.catch((err) => {
            alert(err.response.data.message)
            setLoading(false)
        })

    }


    return (

        <SingUP>
        <img src={testando} alt="TackIt"></img>
        
        <form onSubmit={(a) => cadastrar(a)}>
                <input disabled={loading} onChange={ (a) => setEmail(a.target.value) } required type="email" placeholder="email"></input>
                <input disabled={loading} onChange={ (a) => setPassword(a.target.value) } required type="password" placeholder="senha"></input>
                <input disabled={loading} onChange={ (a) => setName(a.target.value) } required type="text" placeholder="nome"></input>
                <input disabled={loading} onChange={ (a) => setImage(a.target.value) } required type="text" placeholder="foto"></input>
                {loading ? <button disabled={true}><img src={loadingImg}></img></button> : <button type="submit" >Entrar</button>}
                <Link to="/">Ja tem uma conta? Faça login!</Link>
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
            align-items: center;
            img{
                width: 50px;
            }
        }
        a{
            text-align: center;
            margin-top: 50px;
            text-decoration: underline;
            color: #52B6FF;
        }
    }

`