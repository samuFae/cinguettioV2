import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../App";
import React, { useState } from "react";
import { getDatabase, ref as refDB, set, get, child } from "firebase/database";
import { AddButton, EmailButton, InputsWrapper, InputWrapper } from "./ImageAdder.styled";

interface ImageAdderProps {
  dbPath: string
  db: any
}

const initialInputsState = {
  file: "",
  date: "",
  description: "",
  title: ""
}

export const ImageAdder: React.FC<ImageAdderProps> = ({ dbPath, db }) => {
  const [open, setOpen] = useState<any>(false);
  const [inputs, setInputs] = useState<any>(initialInputsState);
    const [percent, setPercent] = useState<number>(0);
  const [message, setMessage] = useState<string>("")
  const dbRef = refDB(getDatabase());

  function handleUpload() {
    if (!inputs.file || !inputs.title || !inputs.date || !inputs.description) {
      setMessage("Compila tutti i dati prima di inviare");
    } else {
      setMessage("Caricamento....");
      const storageRef = ref(storage, `/wolf/${inputs.file.name}`);
      get(child(dbRef, dbPath + "/images")).then((snapshot) => {
        let currentImages: string[] = [];
        if (snapshot.exists()) {
          currentImages = snapshot.val();
        } else {
          console.log("No data available");
        }
        if (currentImages.some((image: any) => image.name == inputs.file.name)) {
          setMessage("Il file è già presente, cambia il nome del file se è diverso")
        } else {
          const uploadTask = uploadBytesResumable(storageRef, inputs.file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              // update progress
              setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // download url
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                set(refDB(db, dbPath + "/images"), {
                  ...currentImages,
                  [currentImages.length]: {
                    name: inputs.file.name,
                    url: url,
                    date: inputs.date,
                    description: inputs.description,
                    title: inputs.title
                  }
                }).then(() => {
                  setInputs(initialInputsState);
                  setMessage("upload success!");
                }).catch((error) => {
                  console.error(error);
                });
              }).catch((error) => {
                console.error(error);
              });;
            }
          );
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  const sendEmails = () => {
    // eslint-disable-next-line no-restricted-globals
    let sure = confirm("Sei sicuro di voler mandare una mail a tutti? Ne abbiamo solo un centinaio al giorno")
    if(sure) {
      get(child(dbRef, dbPath + "/newsletter")).then((snapshot) => {
        let newsletterUsers: string[] = [];
        if (snapshot.exists()) {
          newsletterUsers = snapshot.val();
          //@ts-ignore
          window.Email.send({
            Host: "smtp.elasticemail.com",
            Username: "samuele.faedo@gmail.com",
            Password: "35BD8BA267E8D608D2FA1E89790DDA2DCFC7",
            To: newsletterUsers.join(),
            From: "lupetti.vimercate@gmail.com",
            Subject: "VDB NEWS! Nuova fotografia caricata!",
            Body: "Abbiamo appena caricato nuove fotografie! vai su https://cinguettio-di-chil-v2.web.app/ per vedere le novità!"
          }).then(
            (message: any) => alert(message)
          );
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  function handleChange(event: any) {
    if (event.target.name != "file") {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.files[0] });
    }
  }
  return <InputsWrapper className={open ? "" : "open"} style={open ? { maxHeight: "600px" } : {}}>
    {open ? <>
      <InputWrapper>
        <label htmlFor="file">File:</label>
        <div style={{textAlign: "left", display: "flex", flexWrap: "wrap", gap: "0.5rem"}}>
          <input type="file" name="file" id="file" accept="image/*" onChange={handleChange} />
        <span style={{whiteSpace: "nowrap"}}>% di caricamento {percent}%</span>
        </div>
        
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="date">Data:</label>
        <input type="date" name="date" id="date" onChange={handleChange} value={inputs.date} />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="title">Titolo:</label>
        <input type="text" name="title" id="title" onChange={handleChange} value={inputs.title} />
      </InputWrapper>
      <InputWrapper>
        <label htmlFor="description">Descrizione:</label>
        <textarea name="description" id="description" onChange={handleChange} value={inputs.description}></textarea>
      </InputWrapper>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <AddButton onClick={handleUpload}>Carica una nuova immagine</AddButton>
        <EmailButton onClick={sendEmails}>Manda email a tutti i sottoscritti</EmailButton>
      </div>
      {message.length > 0 && <p className="success">
        {message}
      </p>}</>
      : <div className="button-add" onClick={() => { setOpen(true) }}>
        Apri le opzioni admin
      </div>
    }</InputsWrapper>
}