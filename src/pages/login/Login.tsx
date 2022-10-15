import React, { useState } from 'react';
import { LoginButton, LoginWrapper, Error } from './Login.styled';

interface LoginProps {
    setLoggedIn: any
    setUserStatus: any
}

export const Login: React.FC<LoginProps> = ({ setLoggedIn, setUserStatus }) => {

    const [loginValue, setLoginValue] = useState("");
    const [error, setError] = useState(false);

    const handleOnChange = (event: any) => {
        setLoginValue(event.target.value);
    }

    const logIn = (e:any) => {
        e.preventDefault();
        if (loginValue.replace(" ", "").toLowerCase() === "tanefredde") {
            setLoggedIn(true);
            setUserStatus("wolf-user");
        } else
        if (loginValue.replace(" ", "").toLowerCase() === "akelaboss") {
            setLoggedIn(true);
            setUserStatus("wolf-admin");
        } else {
            setError(true);
        }
    }

    return <LoginWrapper onSubmit={(e)=>{logIn(e)}}>
        <h2>Buona Caccia!</h2>
        <p>
            Per evitare che chiunque possa accedere e vedere le foto dei lupetti ho messo questa sorta di login indovinello, i lupetti dovrebbero sapere la risposta:
            <br/><br/>
            <strong>Dove vive il bandar log?</strong>
        </p>
        <div className={"login-container"}>
            <input className={"login-input"} type="text" onChange={handleOnChange} value={loginValue} style={error ?{boxShadow: "0px 0px 10px red"} : {}}/>
            <LoginButton type="submit">Fammi entrare!</LoginButton>
        </div>
        {error && <Error>
            Risposta errata, prova a chiedere a un lupetto...
        </Error>}
    </LoginWrapper>
}