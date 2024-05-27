export class StagePicture {
    /*
    画像のパスを返したい。
    画像のidとパスのオブジェクトが欲しい。
    pickセレクタとbanセレクタを識別したい。
    */
    constructor(numberOfStages) {
        this.numberOfStages = numberOfStages;
        this.pickSelectorIndex = [2, 3];
        this.banSelectorIndex = [0, 1, 4, 5];
    }

    getUsedStageIds(selectBoxSituation) {
        let s = new Set();
        for (let i = 0; i < this.numberOfStages; i++) { s.add(i); }
        for (let i = 0; i < this.banSelectorIndex.length; i++) {
            s.delete(selectBoxSituation[this.banSelectorIndex[i]]);
        }
        console.log(s);
        return Array.from(s);
    }
}