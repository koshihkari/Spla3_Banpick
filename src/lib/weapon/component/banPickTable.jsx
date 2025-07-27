import { WeaponBanpick } from "../weaponBanPick";


function WeaponImage({index, banpickDisplay, ontTableElementClick, id}) {
    return (
        <div className="weaponTableElement"
            onClick={() => {
            ontTableElementClick(index)
        }}>
            {banpickDisplay}
            <img
                src={"./weapon/images/"+String(id)+".png"}
                className="weapon-icon"
                alt={index}
            />
        </div>
    )
}

function BanPickTable({ontTableElementClick, weaponBanPick, weaponInformation}) {
    const banpickDisplays = [
        (<div></div>),
        (<div className="own-pick-display">○</div>),
        (<div className="opponent-pick-display">○</div>),
        (<div className="ban-display">x</div>)
    ]

    const ImageTable = [];

    for (let i = 0; i < weaponInformation.getNumberOfWeapon(); i++) {
        ImageTable.push(
            <WeaponImage
                key={i} index={i}
                id={weaponInformation.weaponIndexToId(i)}
                banpickDisplay={banpickDisplays[weaponBanPick.getSituation(i)]}
                ontTableElementClick={ontTableElementClick}
            />
        );
    }
    
    return (
        <div className="weapon-table">
            {ImageTable}
        </div>
    )
}

function BanPickSelectButton({onSwitchButtonClick, currentBanpickSwitch}) {
    const weaponBanPick = new WeaponBanpick();
    const banpickSwitches = [
            (<div
                title="自チームpick"
                className="ally-pick-switch-button"
                onClick={() => {onSwitchButtonClick(weaponBanPick.ALLY_PICKED)}}
            >○</div>),
            (<div
                title="敵チームpick"
                className="opponent-pick-switch-button"
                onClick={() => {onSwitchButtonClick(weaponBanPick.OPPONENT_PICKED)}}
            >○</div>),
            (<div
                title="ban"
                className="ban-switch-button"
                onClick={() => {onSwitchButtonClick(weaponBanPick.BANNED)}}
            >X</div>),
            (<div
                title="選択キャンセル"
                className="cancel-switch-button"
                onClick={() => {onSwitchButtonClick(weaponBanPick.NOT_SELECTED)}}
            >-</div>)
    ];
    for (let i = 0; i < 4; i++) {
        if (i === (4+currentBanpickSwitch-1)%4) {
            banpickSwitches[i] = (<div className="selected-switch">{banpickSwitches[i]}</div>)
            continue;
        }
        banpickSwitches[i] = (<div className="not-selected-switch">{banpickSwitches[i]}</div>)
    }
    banpickSwitches[(4+currentBanpickSwitch-1)%4] = (
        <div className="selected-switch">{banpickSwitches[(4+currentBanpickSwitch-1)%4]}</div>
    )

    return (
        <div className="banpick-switch">
            {banpickSwitches[0]}
            {banpickSwitches[1]}
            {banpickSwitches[2]}
            {banpickSwitches[3]}
        </div>
    );
}

function WeaponAreaButton({onSwitchButtonClick, currentBanpickSwitch, onClickResetButton}) {
    return (
        <div className="weapon-button-area">
            <div className="banpick-select-button">
                <BanPickSelectButton
                    onSwitchButtonClick={onSwitchButtonClick}
                    currentBanpickSwitch={currentBanpickSwitch}
                />
            </div>
            <button 
                className="weapon-reset-button"
                onClick={onClickResetButton}
            >
            リセット
            </button>
        </div>
    )
}

function WeaponThumbnail({index, banpickDisplay, onThumbnailClick, id, mainFamilyIndex}) {
    return (
        <div className="weaponTableElement"
            onClick={() => {
            onThumbnailClick(index, mainFamilyIndex)
        }}>
            {banpickDisplay}
            <img
                src={"./weapon/images/"+String(id)+".png"}
                className="weapon-icon"
                alt={index}
            />
        </div>
    )
}

function MainWeaponSheet({ontTableElementClick, weaponBanPick, weaponInformation, mainFamilyIds}) {
    const Images = [];
    const banpickDisplays = [
        (<div></div>),
        (<div className="own-pick-display">○</div>),
        (<div className="opponent-pick-display">○</div>),
        (<div className="ban-display">x</div>)
    ]

    for (let mainFamilyId of mainFamilyIds) {
        let weaponIndex = weaponInformation.weaponIdToIndex(mainFamilyId);
        Images.push(
            <WeaponImage
                key={weaponIndex} index={weaponIndex}
                id={mainFamilyId}
                banpickDisplay={banpickDisplays[weaponBanPick.getSituation(weaponIndex)]}
                ontTableElementClick={ontTableElementClick}
            />
        );
    }

    return (
        <div className="main-weapon-sheet">
            {Images}
        </div>
    )
}

function BanPickTable2({ontTableElementClick, weaponBanPick, weaponInformation}) {
    const mainFamilies = weaponInformation.getMainFamilies();
    console.log(weaponInformation);
    console.log(mainFamilies);
    const ImageTable = [];
    for (let mainFamilyIndex = 0; mainFamilyIndex < weaponInformation.getNumberOfMainWeapon(); mainFamilyIndex++) {
        ImageTable.push(
            <MainWeaponSheet
                key={mainFamilyIndex}
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
                mainFamilyIds={mainFamilies[mainFamilyIndex]}
            />
        )
    }
    
    return (
        <div className="weapon-table">
            {ImageTable}
        </div>
    )
}

// サムネイルテーブルのテスト
function BanPickTable3({ontTableElementClick, onThumbnailClick, weaponBanPick, weaponInformation, mainWeaponSheetDisplay}) {
    const mainFamilies = weaponInformation.getMainFamilies();
    const AllThumbnailTable = [];
    const mainWeaponPerCategory = weaponInformation.getMainWeaponPerCategory();
    // console.log("categoryCount: " + categoryCount);
    // カテゴリの先頭を指す
    let cursor = 0;
    for (let categoryIndex = 0; categoryIndex < mainWeaponPerCategory.length; categoryIndex++) {
        let categoryCount = mainWeaponPerCategory[categoryIndex];
        let category = mainFamilies.slice(cursor, cursor + categoryCount);
        AllThumbnailTable.push(
            <CategoryTable
                key={cursor}
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
                category={category}
                categoryIndex={categoryIndex}
                onThumbnailClick={onThumbnailClick}
                mainWeaponSheetDisplay={mainWeaponSheetDisplay}
            />
        );
        cursor += categoryCount;
    }
    return (
        <div className="weapon-table">
            {AllThumbnailTable}
        </div>
    )
}

function ThumbnailGroup({
    weaponThumbnail, ontTableElementClick, weaponBanPick, weaponInformation, mainFamilyIndex, mainWeaponSheetDisplay, mainFamilyIds
}) {
    return (
        <div className="thumbnail-group">
            {weaponThumbnail}

            {mainWeaponSheetDisplay === mainFamilyIndex ? (
                <MainWeaponSheet
                    ontTableElementClick={ontTableElementClick}
                    weaponBanPick={weaponBanPick}
                    weaponInformation={weaponInformation}
                    mainFamilyIds={mainFamilyIds}
                />
            ) : null}
        </div>
    )
}

function CategoryTable({ontTableElementClick, onThumbnailClick, weaponBanPick, weaponInformation, category, categoryIndex, mainWeaponSheetDisplay}) {
    // categoriesは[[スシ, スシコラ, スシ煌], ..., [ボトル, ボトフォ]]のような感じ
    const Groups = [];
    const banpickDisplays = [
        (<div></div>),
        (<div className="own-pick-display">○</div>),
        (<div className="opponent-pick-display">○</div>),
        (<div className="ban-display">x</div>)
    ]
    for (let thumbnailIndex = 0; thumbnailIndex < category.length; thumbnailIndex++) {
        let mainFamily = category[thumbnailIndex];
        let thumbnail = weaponBanPick.getThumbnailId(mainFamily, weaponInformation);
        let thumbnailWeaponIndex = weaponInformation.weaponIdToIndex(thumbnail);
        let mainFamilyIndex = weaponInformation.getFamilyIndex(categoryIndex, thumbnailIndex);
        console.log("thumbnail: " + thumbnail);
        let weaponThumbnail = (
            <WeaponThumbnail
                key={thumbnail} index={thumbnailWeaponIndex}
                id={thumbnail}
                banpickDisplay={banpickDisplays[weaponBanPick.getSituation(thumbnailWeaponIndex)]}
                onThumbnailClick={onThumbnailClick}
                // ここ
                mainFamilyIndex={mainFamilyIndex}
            />);
        Groups.push(
            <ThumbnailGroup
                key={thumbnailWeaponIndex}
                weaponThumbnail={weaponThumbnail}
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
                mainFamilyIds={category[thumbnailIndex]}
                // ここ
                mainFamilyIndex={mainFamilyIndex}
                mainWeaponSheetDisplay={mainWeaponSheetDisplay}
            />
        );
    }
    return (
        <div className="category-table">
            {Groups}
        </div>
    )
}

export function WeaponBanPickArea({
    ontTableElementClick, onSwitchButtonClick, weaponBanPick,
    weaponInformation, currentBanpickSwitch, onClickResetButton,
    onThumbnailClick, mainWeaponSheetDisplay
}) {
    return (
        <>
            <WeaponAreaButton
                onSwitchButtonClick={onSwitchButtonClick}
                currentBanpickSwitch={currentBanpickSwitch}
                onClickResetButton={onClickResetButton}
            />
            {/* <BanPickTable
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
            /> */}
            <BanPickTable3
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
                onThumbnailClick={onThumbnailClick}
                mainWeaponSheetDisplay={mainWeaponSheetDisplay}
            />
        </>
    )
}