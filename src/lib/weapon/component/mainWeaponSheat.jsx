import { WeaponImage } from './banPickTable';

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
                banpickDisplay={banpickDisplays[weaponBanPick.getSituation(i)]}
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

// sheetのテスト
function BanPickTable2({ontTableElementClick, weaponBanPick, weaponInformation}) {
    const mainFamilies = weaponInformation.getMainFamilies();
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
function BanPickTable3({ontTableElementClick, weaponBanPick, weaponInformation}) {
    const mainFamilies = weaponInformation.getMainFamilies();
    const AllThumbnailTable = [];
    const categoryCount = weaponInformation.getMainWeaponPerCategory();
    console.log("categoryCount: " + categoryCount);
    // カテゴリの先頭を指す
    let cursor = 0;
    for (let categoryIndex of categoryCount) {
        let category = mainFamilies.slice(cursor, cursor + categoryIndex);
        AllThumbnailTable.push(
            <CategoryTable
                key={cursor}
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
                category={category}
            />
        );
        cursor += categoryIndex;
    }
}

function CategoryTable({ontTableElementClick, weaponBanPick, weaponInformation, category}) {
    // categoriesは[[スシ, スシコラ, スシ煌], ..., [ボトル, ボトフォ]]のような感じ
    const Images = [];
    for (let mainFamily of category) {
        let thumbnail = weaponBanPick.getThumbnailId(mainFamily);
        let thumbnailWeaponIndex = weaponInformation.weaponIdToIndex(thumbnail);
        Images.push(
            <WeaponImage
                key={thumbnailWeaponIndex} index={thumbnailWeaponIndex}
                id={thumbnail}
                banpickDisplay={banpickDisplays[weaponBanPick.getSituation(thumbnailWeaponIndex)]}
                ontTableElementClick={ontTableElementClick}
            />
        )
    }
}