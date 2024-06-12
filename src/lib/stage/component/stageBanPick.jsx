import { useState } from "react";
import { StageSelectorValue } from "../stageSelectorValue";
import { StageSelectorOption } from "../stageSelectorOption";
import { StageBanPickSelectors } from "./BanPickSelector";
import { UsedStagePictures } from "./usedStagePicture";
import { StagePicture } from "../stagePicture";

export function StageArea() {
    const NUMBER_OF_SELECTORS = 6;
    const [stageSelectorValue, setStageSelectorValue] = useState(new StageSelectorValue(NUMBER_OF_SELECTORS));
    const [stageSelectorOption, setStageSelectorOption] = useState(new StageSelectorOption(NUMBER_OF_SELECTORS));

    const handleResetClick = (resetedStageSelectorValue, resetedStageSelectorOption) => {
        setStageSelectorValue(new StageSelectorValue(NUMBER_OF_SELECTORS));
        setStageSelectorOption(new StageSelectorOption(NUMBER_OF_SELECTORS));
    }

    return (
        <>
            <StageBanPick
                stageSelectorValue={stageSelectorValue}
                stageSelectorOption={stageSelectorOption}
                handleResetClick={handleResetClick}
                numberOfBoxes={NUMBER_OF_SELECTORS}
            />
        </>
    )
}

export function StageBanPick({stageSelectorValue, stageSelectorOption, handleResetClick, numberOfBoxes}) {
    const [eachSelectorValue,  setEachSelectorValue]  = useState(stageSelectorValue.getAllValue());
    const [eachSelectorOption, setEachSelectorOption] = useState(stageSelectorOption.selectableStages());
    const [selectCompleted, setSelectCompleted] = useState(false);

    const stagePicture = new StagePicture(stageSelectorOption.getAllOption().length);

    const handleResetClickInitialize = () => {
        stageSelectorOption = stageSelectorOption.resetStageSelectorOption();
        stageSelectorValue  = stageSelectorValue.resetStageSelectorValue();
        setEachSelectorValue(stageSelectorValue.getAllValue());
        setEachSelectorOption(stageSelectorOption.selectableStages());
        handleResetClick(stageSelectorOption, stageSelectorValue);
        setSelectCompleted(false);
    }

    const handleSelect = (boxId, selectedOptions) => {
        stageSelectorValue.changeValue(boxId, selectedOptions);
        stageSelectorOption.exchangeBoxSituation(boxId, selectedOptions.value);
        setEachSelectorValue(stageSelectorValue.getAllValue());
        setEachSelectorOption(stageSelectorOption.selectableStages());
        setSelectCompleted(stageSelectorOption.selectCompleted());
    };

    return (
        <div>
            <StageBanPickSelectors
                handleChange={handleSelect}
                numberOfBoxes={numberOfBoxes}
                options={eachSelectorOption}
                values={eachSelectorValue}
            />
            <button 
                className="stage-reset-button"
                onClick={() => {handleResetClick(); handleResetClickInitialize() }}
            >
            リセット
            </button>
            {selectCompleted && <UsedStagePictures 
                usedStagePictureIds={stagePicture.getUsedStageIds(stageSelectorOption.getSelectorBoxSituation())}
                stageNames={stageSelectorOption.getStageName()}
            />}
        </div>
    )
}
