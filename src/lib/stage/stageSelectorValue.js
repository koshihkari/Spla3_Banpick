export class StageSelectorValue {
    constructor(selectorCount) {
        this.stageSelectorValues = Array(selectorCount).fill(null);
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