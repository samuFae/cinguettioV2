import styled from "styled-components";

const gapValue = "1rem"

export const ImageListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 2rem;
    justify-content: flex-start;
    gap: ${gapValue};
`;

export const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 calc(33.3% - ${gapValue} + (${gapValue}/3));
    border: 1px solid rgba(43, 120, 44, 0.5);
    padding: 1rem;

    .image {
        width: 100%;
        cursor: pointer;
        margin: 1rem 0 2rem;
    }

    h4 {
        font-size: 25px;
        margin: 0.5rem;
    }

    p{
        font-size: 15px;
        margin: 0.5rem;
    }

    @media screen and (max-width: 992px) {
        flex: 0 0 100%;
    }
`;

export const Mask = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 1rem;
    display: flex;
    background-color: rgba(0,0,0,0.3);
    cursor: pointer;
    z-index: 1000;
`

export const ModalContainer = styled.div`
    width: 80%;
    height: auto;
    margin: auto;
    max-height: calc(100vh);

    img {
        max-width: 100%;
        max-height: 100vh;
    }

    @media screen and (max-width: 992px) {
        width: 100%;
    }
`

export const DeleteButton = styled.div`
    background-color: #ff4f4f;
    box-shadow: 0 0 10px #ff4f4f;
    padding: 0.5rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    margin: 1rem auto;

    &:hover {
        transform: scale(1.2);
    }
`

export const DownloadButton = styled.div`
    background-color: rgba(38, 255, 41, 0.5);
    box-shadow: 0 0 10px rgb(38, 255, 41);
    padding: 0.5rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
    margin: 1rem auto;
    margin-top: auto;

    &:hover {
        background-color: rgba(38, 255, 41, 0.8);
        transform: scale(1.2);
    }
`;

export const NewsletterWrapper = styled.div`
    display: flex;
    gap: 3rem;
    justify-content: center;
    gap: 2rem;
    margin: 1rem 1rem 2rem;
    align-items: center;
    flex-wrap: wrap;


    .newsletter-input {
        font-size: 18px;
        border: 0 none transparent;
        box-shadow: 0px 0px 10px #2b782c;
        background-color: #fffeb0;
        border-radius: 10px;
        outline: none;
        padding: 0.5rem;
        width: 100%;
        max-width: 400px;

        @media (max-width: 768px) {
            font-size: 16px;
            padding: 1rem 2rem;
        }
}
`;

export const NewsletterButton = styled.div`
    background-color: rgba(38, 255, 41, 0.5);
    box-shadow: 0 0 10px rgb(38, 255, 41);
    padding: 0.5rem 2rem;
    width: fit-content;
    border-radius: 40px;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: rgba(38, 255, 41, 0.8);
        transform: scale(1.05);
    }
`;