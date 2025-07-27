import { ShowTeamWeapon } from "./decidedTeamWeapon"
import { WeaponBanPickArea } from "./banPickTable"
import { useState } from "react"
import { WeaponBanpick } from "../weaponBanPick";
import { WeaponInformation } from "../weaponInformation";
import { TeamWeapon } from "../TeamWeapon";

const _initialWeaponInformation = new WeaponInformation();
const weaponInformation = await _initialWeaponInformation.loadWeaponInformation();

export function WeaponArea() {

    const [weaponBanpick, setWeaponBanpick] = useState(new WeaponBanpick(weaponInformation.getNumberOfWeapon()));
    const [ownTeamWeaon, setOwnTeamWeapon] = useState(new TeamWeapon());
    const [opponentTeamWeaon, setOpponentTeamWeapon] = useState(new TeamWeapon());
    const [currentBanpickSwitch, setCurrentBanpickSwitch] = useState(weaponBanpick.ALLY_PICKED);
    // -1は非表示, 表示する武器のインデックスを与える (ボールド: 0, わかば: 1, ...)
    const [mainWeaponSheetDisplay, setMainWeaponSheetDisplay] = useState(-1);


    function selectCancel(index) {
        const weaponId = weaponInformation.weaponIndexToId(index);
        weaponBanpick.cancelTargetWeapons(index, weaponInformation);
        ownTeamWeaon.cancelWeapon(weaponId, weaponInformation);
        opponentTeamWeaon.cancelWeapon(weaponId, weaponInformation);
    }

    const onAllyPick = (index) => {
        const weaponId = weaponInformation.weaponIndexToId(index);
        // すでに選択済みならキャンセル
        if (ownTeamWeaon.isTeamInclude(weaponId)) {
            selectCancel(index);
            setWeaponBanpick(weaponBanpick.renew());
            setOpponentTeamWeapon(opponentTeamWeaon);
            return;
        }
        if (ownTeamWeaon.canAddTeam(weaponId)) {
            selectCancel(index);
            ownTeamWeaon.addWeapon(weaponId);
            weaponBanpick.myTeamPick(index, weaponInformation);
            setWeaponBanpick(weaponBanpick.renew());
            setOwnTeamWeapon(ownTeamWeaon);
        }
    }

    const onOpponentPick = (index) => {
        const weaponId = weaponInformation.weaponIndexToId(index);
        // すでに選択済みならキャンセル
        if (opponentTeamWeaon.isTeamInclude(weaponId)) {
            selectCancel(index);
            setWeaponBanpick(weaponBanpick.renew());
            setOpponentTeamWeapon(opponentTeamWeaon);
            return;
        }
        if (opponentTeamWeaon.canAddTeam(weaponId)) {
            selectCancel(index);
            opponentTeamWeaon.decideWeapon(weaponId);
            weaponBanpick.opponentTeamPick(index, weaponInformation);
            setWeaponBanpick(weaponBanpick.renew());
            setOpponentTeamWeapon(opponentTeamWeaon);
        }
    }

    const onBan = (index) => {
        // すでにban済みならbanをキャンセル
        if (weaponBanpick.isBanned(index)) {
            selectCancel(index);
            setWeaponBanpick(weaponBanpick.renew())
            return;
        }
        selectCancel(index);
        weaponBanpick.banTargetWeapons(index, weaponInformation);
        setWeaponBanpick(weaponBanpick.renew())
    }

    const onCancel = (index) => {
        selectCancel(index);
        setWeaponBanpick(weaponBanpick.renew());
        setOwnTeamWeapon(ownTeamWeaon);
        setOpponentTeamWeapon(opponentTeamWeaon);
    }

    const banpickSwitchHandles = {};
    banpickSwitchHandles[weaponBanpick.NOT_SELECTED] = onCancel;
    banpickSwitchHandles[weaponBanpick.ALLY_PICKED] = onAllyPick;
    banpickSwitchHandles[weaponBanpick.OPPONENT_PICKED] = onOpponentPick;
    banpickSwitchHandles[weaponBanpick.BANNED] = onBan;


    const onTableElementClick = (index) => {
        banpickSwitchHandles[currentBanpickSwitch](index);
    }

    const onSwitchButtonClick = (newSwitch) => {
        setCurrentBanpickSwitch(newSwitch);
    }

    const onClickResetButton = () => {
        setWeaponBanpick(weaponBanpick.reset());
        setOwnTeamWeapon(new TeamWeapon());
        setOpponentTeamWeapon(new TeamWeapon());
    }

    const onThumbnailClick = (index, weaponFamilyIndex) => {
        // キャンセル, banの操作ではシートを表示せず普通に操作
        if (currentBanpickSwitch === weaponBanpick.NOT_SELECTED || currentBanpickSwitch === weaponBanpick.BANNED) {
            banpickSwitchHandles[currentBanpickSwitch](index);
            return;
        }
        // ピック時はシートの表示を行う
        setMainWeaponSheetDisplay(weaponFamilyIndex);
    }

    return (
        <div className="weapon-area">
            <div className="team-weapon-area">
                    <div className="team-weapon-title">
                        <div className="title-ally-switch">⚫︎</div>
                    </div>
                    <div className="team-weapon-title">自チーム武器pick状況</div>
                <ShowTeamWeapon teamWeapon={ownTeamWeaon}/>
            </div>
            <div className="team-weapon-area">
                    <div className="team-weapon-title">
                        <div className="title-opponent-switch">⚫︎</div>
                    </div>
                    <div className="team-weapon-title">敵チーム武器pick状況</div>
                <ShowTeamWeapon teamWeapon={opponentTeamWeaon}/>
            </div>
            <WeaponBanPickArea
                weaponBanPick={weaponBanpick}
                ontTableElementClick={onTableElementClick}
                currentBanpickSwitch={currentBanpickSwitch}
                onSwitchButtonClick={onSwitchButtonClick}
                weaponInformation={weaponInformation}
                onClickResetButton={onClickResetButton}
                onThumbnailClick={onThumbnailClick}
                mainWeaponSheetDisplay={mainWeaponSheetDisplay}
            />
        </div>
    )
}