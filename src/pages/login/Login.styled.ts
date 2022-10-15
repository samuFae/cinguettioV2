import styled from "styled-components"


export const LoginWrapper = styled.form`
    width: 80%;
    margin: 2rem auto;
    padding: 2rem;
    font-size: 25px;

    h2 {
        font-size: 35px
    }

    .login-input {
        font-size: 25px;
        border: 0 none transparent;
        box-shadow: 0px 0px 10px #2b782c;
        background-color: #fffeb0;
        padding: 1rem 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        outline: none;

        @media (max-width: 768px) {
            font-size: 16px;
            padding: 1rem 2rem;
        }
    }

    button { 
        font-size: 25px;
    }

    .login-container {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        margin: 4rem 0 2rem;
        gap: 2rem;
    }
`;

export const LoginButton = styled.button`
    background-color: rgba(38, 255, 41, 0.5);
    box-shadow: 0 0 10px rgb(38, 255, 41);
    border: 0 none transparent;
    padding: 1rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    margin-bottom: 2rem;
    transform: scale(1);
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: rgba(43, 120, 44, 0.8);
        transform: scale(1.2);
    }
`;


export const Error = styled.div`
    color: red;
`;



