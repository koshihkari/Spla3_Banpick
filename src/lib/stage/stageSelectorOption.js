export class StageSelectorOption {
    constructor(MAX_NUMBER_OF_CAPABLE_SELECT) {
        this.allOptions =[
            { value: 0, label: "ゴンズイ地区"},
            { value: 1, label: "マテガイ放水路"},
            { value: 2, label: "コンブトラック"},
            { value: 3, label: "バイガイ亭"},
            { value: 4, label: "ユノハナ大渓谷"},
            { value: 5, label: "ナメロウ金属"},
            { value: 6, label: "ザトウマーケット"}
        ];
        // セレクトボックスに選択されているoptionのvalueを保存
        this.selectBoxSituation = Array(MAX_NUMBER_OF_CAPABLE_SELECT).fill(-1);
        // 各optionごとのbanpick状況を保存
        this.selectSituation = Array(this.allOptions.length).fill(0);
    }

    setSelectSituation(id, banPickSituation) {
        this.selectSituation[id] = banPickSituation;
    }

    emptySelectBox(boxId) {
        return this.selectBoxSituation[boxId] === -1;
    }

    getOptionIdInSelectBox(boxId) {
        return this.selectBoxSituation[boxId];
    }

    setSelectBoxSituation(boxId, optionId) {
        this.selectBoxSituation[boxId] = optionId;
    }

    pickStage(id) {
        this.setSelectSituation(id, 2);
        // this.exchangeBoxSituation()
    }

    banStage(id) {
        this.setSelectSituation(id, 1);
        // this.exchangeBoxSituation();
    }

    cancelSelectStage(id) {
        this.setSelectSituation(id, 0);
    }

    specificStages(situation) {
        let specificOptions = Array(0);
        for (let i = 0; i < this.allOptions.length; i++) {
            if (this.selectSituation[i] === situation) { specificOptions.push(this.allOptions[i]); }
        }
        return specificOptions;
    }

    findBoxFilledSpecificOption(optionId) {
        for (let i = 0; i < this.allOptions.length; i++) {
            if (this.selectSituation[i] === optionId) { return i; }
        }
    }

    selectableStages() {
        return this.specificStages(0);
    }

    bannedStages() {
        return this.specificStages(1);
    }

    pickedStages() {
        return this.specificStages(2);
    }

    selectCompleted() {
        for (let i = 0; i < this.allOptions.length; i++) {
            if (this.emptySelectBox(i)) { console.log(i);return false; }
        }
        console.log(this.selectBoxSituation);
        return true;
    }

    exchangeBoxSituation(boxId, optionId) {
        if (!this.emptySelectBox(boxId)) {
            this.cancelSelectStage(this.selectBoxSituation[boxId]);
        }
        this.setSelectBoxSituation(boxId, optionId);
        this.pickStage(optionId);
    }

    resetStageSelectorOption() {
        return new StageSelectorOption();
    }

    getAllOption() {
        return this.allOptions;
    }

    // これは構造上よくない、要改善
    getStageName() {
        let l = Array(0);
        for (let i = 0; i < this.allOptions.length; i++) {
            l.push(this.allOptions[i].label);
        }
        return l;
    }

    getSelectorBoxSituation() {
        return this.selectBoxSituation.concat();
    }
}