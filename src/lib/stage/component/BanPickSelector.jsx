import Select from "react-select";

function StageBanPickSelector({boxId, options, value, boxKindText, handleChange}) {
    return (
        <div className="stage-selector">
            <p>{boxKindText}</p>
            <Select
                className="stage-selector-box"
                value={value}
                options={options}
                onChange={
                    (selectedOption) => {handleChange(boxId, selectedOption)}
                }
                placeholder="ステージを選択"
            />
        </div>
    )
}

export function StageBanPickSelectors({numberOfBoxes, options, values, handleChange}) {
    return (
        <div>
            <StageBanPickSelector
                boxId={0}
                options={options}
                value={values[0]}
                boxKindText={"Banステージ1"}
                handleChange={handleChange}
            />
            <StageBanPickSelector
                boxId={1}
                options={options}
                value={values[1]}
                boxKindText={"Banステージ2"}
                handleChange={handleChange}
            />
            <StageBanPickSelector
                boxId={2}
                options={options}
                value={values[2]}
                boxKindText={"Pickステージ1"}
                handleChange={handleChange}
            />
            <StageBanPickSelector
                boxId={3}
                options={options}
                value={values[3]}
                boxKindText={"Pickステージ2"}
                handleChange={handleChange}
            />
            <StageBanPickSelector
                boxId={4}
                options={options}
                value={values[4]}
                boxKindText={"Banステージ3"}
                handleChange={handleChange}
            />
            <StageBanPickSelector
                boxId={5}
                options={options}
                value={values[5]}
                boxKindText={"Banステージ4"}
                handleChange={handleChange}
            />
        </div>
    )
}