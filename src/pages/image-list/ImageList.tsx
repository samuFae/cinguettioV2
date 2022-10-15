import { ImageAdder, Image } from '@pages';
import React, { useState, useEffect } from 'react';
import { ref as refDB, onValue } from "firebase/database";
import { DownloadButton, ImageListWrapper } from './ImageList.styled';
import { EmailSubscription } from './EmailSubscription';

interface ImageListProps {
    userStatus: string;
    dbPath: string;
    db: any;
}

export const ImageList: React.FC<ImageListProps> = ({ userStatus, dbPath, db }) => {
    const [imageList, setImageList] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [showShowMore, setShowShowMore] = useState<boolean>(true);

    useEffect(() => {
        const dbRef = refDB(db, dbPath);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.images) {
                setImageList(data.images);
            } else {
                setImageList([]);
            }
        });
    }, [])

    useEffect(() => {
        if(imageList.length > 0 && page * 6 >= imageList.length) {
            setShowShowMore(false);
        }
    }, [page]);

    return <>
        {userStatus.indexOf("admin") > 0 ? <ImageAdder dbPath={dbPath} db={db}></ImageAdder> : <EmailSubscription dbPath={dbPath} db={db} />}
        <ImageListWrapper>
            {imageList ? Object.keys(imageList).reverse().map((key: any, index: number) => {
                if(index < page * 6) {
                    return <Image data={imageList[key]} key={index} userStatus={userStatus} index={key} db={db} dbPath={dbPath} />;
                }
            }) : <></>}
            {showShowMore && <DownloadButton style={{margin: "2rem auto 4rem"}} onClick={() => {setPage(page +1)}}>Carica altre immagini</DownloadButton>}
        </ImageListWrapper>

    </>;
}