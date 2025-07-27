export class WeaponInformation {
    constructor(allWeaponInformation={}) {
        this.allWeaponInformation = allWeaponInformation;
        this.numberOfWeapon = 0;
        this.numberOfWeapon = this.getNumberOfWeapon();
        this.categoryCount = Array(this.getNumberOfCategory()).fill(0);
    }

    async loadWeaponInformation() {
        const response = await fetch("weapon/weaponInformation.json");
        const data = await response.json()
        return await new WeaponInformation(data)
    }

    getNumberOfCategory() {
        return Object.keys(this.allWeaponInformation).length;
    }

    setNumberOfSameCategoryWeapon() {
        let categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            const count = this.allWeaponInformation[categoryKeys[i]]["count"];
            this.categoryCount[i] = count;
        }
    }

    getNumberOfWeapon() {
        let count = 0;
        let categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                count += mains[j]["count"];
            }
        }
        return count;
    }

    weaponIdToIndex(weaponId) {
        let index = 0;
        let categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                let weapons = mains[j]["weapon"];
                for (let k = 0; k < mains[j]["count"]; k++) {
                    if (weaponId === weapons[k]["id"]) {
                        return index;
                    } else {
                        index++;
                    }
                }
            }
        }
        return index;
    }

    weaponIndexToId(index) {
        let count = 0;
        let weaponId;
        let categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                let weapons = mains[j]["weapon"];
                for (let k = 0; k < mains[j]["count"]; k++) {
                    if (count === index) {
                        return weapons[k]["id"];
                    } else {
                        count++;
                    }
                }
            }
        }
        return weaponId;
    }

    getLabelAndValue() {
        let labelAndValue = [];
        let categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                let weapons = mains[j]["weapon"];
                for (let k = 0; k < mains[j]["count"]; k++) {
                    let element = {
                        "label": weapons[k]["name"],
                        "value": weapons[k]["id"]
                    };
                    labelAndValue.push(element);
                }
            }
        }
        return labelAndValue;
    }

    // スプラシューターが与えられた場合、スプラシューターコラボ, スプラシューター煌を返す
    getMinorChangeIds(weaponId) {
        const minorChangeIds = [];
        const categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                let weapons = mains[j]["weapon"];
                for (let k = 0; k < mains[j]["count"]; k++) {
                    if (weapons[k]["id"] !== weaponId) { continue; }
                    for (let l = 0; l < mains[j]["count"]; l++) {
                        if (weaponId !== weapons[l]["id"]) {
                            minorChangeIds.push(weapons[l]["id"])
                        }
                    }
                    break;
                }
            }
        }
        return minorChangeIds;
    }

    // メインウェポンの種類の数を返す
    getNumberOfMainWeapon() {
        let count = 0;
        const categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            count += category["count"];
        }
        return count;
    }

    // 同一メインウェポンを持つ武器の集合をMainFamilyと呼ぶ
    // MainFamilyごとに配列にidを格納し, それを格納する配列を返す
    getMainFamilies() {
        let mainFamilies = [];
        const categoryKeys = Object.keys(this.allWeaponInformation);
        for (let i = 0; i < categoryKeys.length; i++) {
            let category = this.allWeaponInformation[categoryKeys[i]];
            let mains = category["main"];
            for (let j = 0; j < mains.length; j++) {
                let weapons = mains[j]["weapon"];
                let mainFamily = [];
                for (let k = 0; k < mains[j]["count"]; k++) {
                    mainFamily.push(weapons[k]["id"]);
                }
                mainFamilies.push(mainFamily);
            }
        }
        // console.log(mainFamilies);
        return mainFamilies;
    }

    // カテゴリごとのメインウェポンの数を返す
    getMainWeaponPerCategory() {
        let categoryKeys = Object.keys(this.allWeaponInformation);
        let categoryCount = Array(this.getNumberOfCategory()).fill(0);
        for (let i = 0; i < categoryKeys.length; i++) {
            const count = this.allWeaponInformation[categoryKeys[i]]["count"];
            categoryCount[i] = count;
        }
        return categoryCount;
    }

    // categoryIndexとthumbnailIndexからmainFamilyIndexを取得
    // categoryIndex: 0: シューター, 1: ローラー, ...
    // thumbnailIndex: 0: ボールド, 1: わかば, ... 13: ボトル
    // mainFamilyIndex: 0: ボールド, 1: わかば, ... 13: ボトル, 14: カーボンローラー
    getFamilyIndex(categoryIndex, thumbnailIndex) {
        let mainWeaponPerCategory = this.getMainWeaponPerCategory();
        let mainFamilyIndex = 0;
        for (let i = 0; i < categoryIndex; i++) {
            mainFamilyIndex += mainWeaponPerCategory[i];
        }
        mainFamilyIndex += thumbnailIndex;
        return mainFamilyIndex;
    }
}