export class WeaponBanpick {
    constructor(
            NUMBER_OF_WEAPON,
            banPickSituation = Array(NUMBER_OF_WEAPON).fill(0)
        ) {
        this.NUMBER_OF_WEAPON = NUMBER_OF_WEAPON;
        this.NOT_SELECTED = 0; // 未選択
        this.ALLY_PICKED = 1; // 自チームpick済み
        this.OPPONENT_PICKED = 2; // 敵チームpick済み
        this.BANNED = 3; // ban済み
        this.banPickSituation = banPickSituation;
    }

    renew() {
        return new WeaponBanpick(this.NUMBER_OF_WEAPON, this.banPickSituation.concat());
    }

    allyPickWeapon(index) {
        this.banPickSituation[index] = this.ALLY_PICKED;
    }

    opponentPickWeapon(index) {
        this.banPickSituation[index] = this.OPPONENT_PICKED;
    }

    myTeamPick(index, weaponInformation) {
        this.allyPickWeapon(index);
        const minorChangeIds = this.getMinorChangeIndexes(index, weaponInformation);
        for (let i = 0; i < minorChangeIds.length; i++) {
            this.banWeapon(minorChangeIds[i]);
        }
    }

    opponentTeamPick(index, weaponInformation) {
        this.opponentPickWeapon(index);
        const minorChangeIds = this.getMinorChangeIndexes(index, weaponInformation);
        for (let i = 0; i < minorChangeIds.length; i++) {
            this.banWeapon(minorChangeIds[i]);
        }
    }

    banWeapon(index) {
        this.banPickSituation[index] = this.BANNED;
    }

    cancelWeapon(index) {
        this.banPickSituation[index] = this.NOT_SELECTED;
    }

    banTargetWeapons(index, weaponInformation) {
        this.banWeapon(index)
        const minorChangeIds = this.getMinorChangeIndexes(index, weaponInformation);
        for (let i = 0; i < minorChangeIds.length; i++) {
            this.banWeapon(minorChangeIds[i]);
        }
    }

    cancelTargetWeapons(index, weaponInformation) {
        this.cancelWeapon(index)
        const minorChangeIds = this.getMinorChangeIndexes(index, weaponInformation);
        for (let i = 0; i < minorChangeIds.length; i++) {
            this.cancelWeapon(minorChangeIds[i]);
        }
    }

    //IdじゃなくてIndexかも・・・？
    getSituation(weaponId) {
        return this.banPickSituation[weaponId];
    }

    getMinorChangeIndexes(index, weaponInformation) {
        const weaponId = weaponInformation.weaponIndexToId(index);
        const minorChangeIds = weaponInformation.getMinorChangeIds(weaponId);
        const minorChangeIndexes = minorChangeIds.map(
            (minorChangeId) => weaponInformation.weaponIdToIndex(minorChangeId)
        )
        return minorChangeIndexes
    }

    // サムネイルにする武器のIDを取得
    // pickされているものを返し, pickされていない場合は無印を返す
    getThumbnailId(weaponFamily, weaponInformation) {
        // console.log("weaponFamily: " + weaponFamily);
        let thumbnail = Math.min(...weaponFamily);
        for (let weaponId of weaponFamily) {
            let weaponIndex = weaponInformation.weaponIdToIndex(weaponId);
            if (this.getSituation(weaponIndex) === this.ALLY_PICKED ||
                this.getSituation(weaponIndex) === this.OPPONENT_PICKED) {
                thumbnail = weaponId;
            }
        }
        return thumbnail;
    }

    isBanned(index) {
        return this.banPickSituation[index] === this.BANNED;
    }

    reset() {
        return new WeaponBanpick(this.NUMBER_OF_WEAPON);
    }

}