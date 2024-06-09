// import { useState } from "react";
// import { WeaponInformation } from "../weaponInformation";
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

    console.log(weaponBanPick.banPickSituation);

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
            >x</div>),
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

export function WeaponBanPickArea({ontTableElementClick, onSwitchButtonClick, weaponBanPick, weaponInformation, currentBanpickSwitch}) {
    return (
        <>
            <BanPickTable
                ontTableElementClick={ontTableElementClick}
                weaponBanPick={weaponBanPick}
                weaponInformation={weaponInformation}
            />
            <BanPickSelectButton
                onSwitchButtonClick={onSwitchButtonClick}
                currentBanpickSwitch={currentBanpickSwitch}
            />
        </>
    )
}