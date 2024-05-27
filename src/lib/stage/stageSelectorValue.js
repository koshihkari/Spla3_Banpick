export class StageSelectorValue {
    constructor(selectorCount) {
        this.stageSelectorValues = Array(selectorCount).fill(null);
        // stageSelectorValues -> {"value": int, "label": str} []
        // console.log("constructed!");
    }

    changeValue(index, newValue) {
        this.stageSelectorValues[index] = newValue;
    }

    getValue(index) {
        return this.stageSelectorValues[index];
    }

    getAllValue() {
        return this.stageSelectorValues;
    }

    resetStageSelectorValue() {
        return new StageSelectorValue(this.stageSelectorValues.length);
    }
}