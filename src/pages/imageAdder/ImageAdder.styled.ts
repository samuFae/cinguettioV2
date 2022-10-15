import styled from "styled-components";

const gapValue = "1rem"

export const InputsWrapper = styled.div`
    padding: 2.5rem 0 1rem;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
    align-items: center;
    transition: all 0.6s ease-in-out;
    overflow: hidden;
    max-height: 0;

    &.open {
        max-height: 100px;
    }

    .button-add {
        background-color: rgba(38, 255, 41, 0.5);
        box-shadow: 0 0 10px rgb(38, 255, 41);
        padding: 1rem 2rem;
        width: fit-content;
        border-radius: 40px;
        cursor: pointer;
        transform: scale(1);
        transition: all 0.3s ease-in-out;
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        
        &:hover {
            background-color: rgba(38, 255, 41, 0.8);
            transform: scale(1.2);
        }
    }
`;

export const InputWrapper = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 80%;

    @media screen and (max-width:992px) {
        width: 100%;
    }

    textarea{
        width: 100%!important;
    }
`;

export const AddButton = styled.div`
    background-color: rgba(38, 255, 41, 0.5);
    box-shadow: 0 0 10px rgb(38, 255, 41);
    padding: 1rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    margin: 1rem auto;
    margin-bottom: 0;

    &:hover {
        background-color: rgba(38, 255, 41, 0.8);
        transform: scale(1.2);
    }
`;

export const EmailButton = styled.div`
    background-color: rgba(243, 255, 79, 0.5);
    box-shadow: 0 0 10px rgb(243, 255, 79);
    padding: 1rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    margin: 1rem auto;
    margin-bottom: 0;

    &:hover {
        background-color: rgba(243, 255, 79, 0.8);
        transform: scale(1.2);
    }
`;
