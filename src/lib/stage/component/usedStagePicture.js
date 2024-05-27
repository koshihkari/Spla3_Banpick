export function UsedStagePictures({usedStagePictureIds, stageNames}) {
    return (
        <>
            <div className="used-stage-title">使用するステージ</div>
            <UsedStagePicture
                src={"./images/stage"+usedStagePictureIds[0]+".jpg"}
                stageName={stageNames[usedStagePictureIds[0]]}
            />
            <UsedStagePicture
                src={"./images/stage"+usedStagePictureIds[1]+".jpg"}
                stageName={stageNames[usedStagePictureIds[1]]}
            />
            <UsedStagePicture
                src={"./images/stage"+usedStagePictureIds[2]+".jpg"}
                stageName={stageNames[usedStagePictureIds[2]]}
            />
        </>
    )
}

function UsedStagePicture({src, stageName}) {
    return (
        <div className="used-stage-picture">
            <img src={src} alt={stageName} className="stageImage" />
            <div className="stageName">{stageName}</div>
        </div>
    )
}