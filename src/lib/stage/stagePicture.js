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
        const usedStageIds = [];
        for (let i = 0; i < this.pickSelectorIndex.length; i++) {
            usedStageIds.push(selectBoxSituation[this.pickSelectorIndex[i]]);
        }
        // 未選択のステージを取り出す
        for (let stageId = 0; stageId < this.numberOfStages; stageId++) {
            if (!selectBoxSituation.includes(stageId)) {
                usedStageIds.push(stageId);
            }
        }
        return usedStageIds;
    }
}