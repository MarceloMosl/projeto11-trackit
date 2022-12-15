import testando from "./../assets/t.jpg"
import styled from "styled-components"
export default function Login () {

    return (
        <SingUP>
            <img src={testando} alt="TackIt"></img>
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

`