import { StageSelectorValue } from "./stageSelectorValue";
import { StageSelectorOption } from "./stageSelectorOption";


export class StageSelector {
    constructor () {
        this.MAX_NUMBER_OF_CAPABLE_SELECT = 6;
        this.option = new StageSelectorOption(this.MAX_NUMBER_OF_CAPABLE_SELECT);
        this.value = new StageSelectorValue(this.MAX_NUMBER_OF_CAPABLE_SELECT);
    }
    
    exchange(boxId, optionId) {
        console.log(this.option);
        this.value.changeValue(boxId, this.option.getAllOption()[optionId]['label']);
        this.option.exchangeBoxSituation(boxId, optionId);
    }

    getValues() {
        return this.value.getAllValue();
    }

    selectableStages() {
        return this.option.selectableStages();
    }

}