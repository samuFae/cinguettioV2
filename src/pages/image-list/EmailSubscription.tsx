import React, {useState} from 'react';
import { NewsletterButton, NewsletterWrapper } from './ImageList.styled';
import { getDatabase, ref as refDB, set, get, child } from "firebase/database";

interface EmailSubscriptionProps {
    dbPath: string;
    db: any;
}

export const EmailSubscription: React.FC<EmailSubscriptionProps> = ({db, dbPath }) => {
    const [newsletterValue, setNewsletterValue] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const dbRef = refDB(getDatabase());
    
    const addToNL = () => {
        if(newsletterValue.length > 0){
            get(child(dbRef, dbPath + "/newsletter")).then((snapshot) => {
                let newsletterUsers: string[] = [];
                if (snapshot.exists()) {
                  newsletterUsers = snapshot.val();
                  if(newsletterUsers.some((user) => user == newsletterValue)) {
                    setMessage("Email già iscritta alla newsletter!");
                  } else {
                    set(refDB(db, dbPath + "/newsletter"), {
                        ...newsletterUsers,
                        [newsletterUsers.length]: newsletterValue
                      }).then(() => {
                        setMessage("Email Aggiunta!")
                      }).catch((error) => {
                        console.error(error);
                      });
                  }
                } else {
                    set(refDB(db, dbPath + "/newsletter"), {
                        0: newsletterValue
                      }).then(() => {
                        setMessage("Email Aggiunta!")
                      }).catch((error) => {
                        console.error(error);
                      }); 
                }
            })
        } else {
            setMessage("Inserire una mail valida!")
        }
        
    }

    return <><div style={{margin: "3rem 1rem 0"}}>
    Fate attenzione che nei miei test le mail sono sempre arrivate nella casella spam visto che sto usando un servizio gratuito, se confermi una volta l'affidabilità della mail poi dovrebbe metterle nella casella corretta.
</div><NewsletterWrapper>
        <input type="text" name="newsletter" id="newsletter" className="newsletter-input" placeholder="Email..." onChange={(e) => {setNewsletterValue(e.target.value)}} value={newsletterValue} />
        <NewsletterButton onClick={addToNL}>
            Iscriviti alla newsletter per sapere quando caricheremo nuove fotografie!
        </NewsletterButton>
    </NewsletterWrapper>
    
        {message.length > 0 &&<div style={{margin: "1rem 1rem 0"}}>
            {message}
        </div>}</>;
}