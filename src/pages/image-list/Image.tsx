import React, { useState } from 'react';
import { DeleteButton, DownloadButton, ImageContainer, Mask, ModalContainer } from './ImageList.styled';
import { getDatabase, ref as refDB, set, get, child } from "firebase/database";
import { getStorage, ref, deleteObject } from "firebase/storage";

interface ImageProps {
    data: any;
    userStatus: string;
    index: number;
    db: any;
    dbPath: any;
}

export const Image: React.FC<ImageProps> = ({ data, userStatus, index, db, dbPath }) => {
    const [imageOpen, setImageOpen] = useState<boolean>(false);
    const dbRef = refDB(getDatabase());
    const storage = getStorage();


    const deleteImage = () => {
        get(child(dbRef, dbPath + "/images")).then((snapshot) => {
            if (snapshot.exists()) {
                set(refDB(db, dbPath + "/images"), {
                    ...snapshot.val(),
                    [index]: {}
                }).then(() => {
                    const imageRef = ref(storage, "wolf/" + data.name);
                    deleteObject(imageRef).then(() => {
                        console.log("Eliminato")
                    }).catch((error) => {
                        console.error(error);
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const downloadImage = () => {
        fetch(data.url)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = data.name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => console.error("An error occured while donwloading"));
    }

    function sendMail() {
        //@ts-ignore
        //@ts-ignore
        window.Email.send({
            Host : "smtp.elasticemail.com",
            Username : "samuele.faedo@gmail.com",
            Password : "35BD8BA267E8D608D2FA1E89790DDA2DCFC7",
            To : 'samuele.faedo@gmail.com, samuele.faedo@doing.com',
            From : "lupetti.vimercate@gmail.com",
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(
          (message: any) => alert(message)
        );
    }

    const rotateImage = () => {
        get(child(dbRef, dbPath + "/images")).then((snapshot) => {
            if (snapshot.exists()) {
                set(refDB(db, dbPath + "/images"), {
                    ...snapshot.val(),
                    [index]: {
                        ...snapshot.val()[index],
                        rotate: snapshot.val()[index].rotate ? snapshot.val()[index].rotate + 1 : 1
                    }
                }).then(() => {
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return <>
        {imageOpen && <Mask onClick={() => { setImageOpen(false) }}>
            <ModalContainer>
                <img src={data.url} alt="" style={data.rotate ? {transform: `rotate(${data.rotate * 90}deg)`}: {}}/>
            </ModalContainer>
        </Mask>}
        <ImageContainer>
            <h4>{data.title}</h4>
            <p>{data.description}</p>
            <p>{data.date}</p>
            <div onClick={() => { setImageOpen(true) }} className="image" style={data.rotate ? {transform: `rotate(${data.rotate * 90}deg)`, padding:"50%", background: `url(${data.url}) center center no-repeat`, backgroundSize: "contain"}: {padding:"50%", background: `url(${data.url}) center center no-repeat`,  backgroundSize: "contain"}} >
            </div>
            
            <DownloadButton onClick={downloadImage}>download</DownloadButton>
            {userStatus.indexOf("admin") > -1 && <div style={{display: "flex", flexWrap: "wrap"}}><DeleteButton onClick={deleteImage}>
                Elimina
            </DeleteButton><DownloadButton onClick={rotateImage}>ruota</DownloadButton></div>}
        </ImageContainer>
    </>;
}