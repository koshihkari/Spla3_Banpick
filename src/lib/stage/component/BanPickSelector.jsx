import Select from "react-select";

// Ban/Pickに応じて色を返すヘルパー関数
const getBanPickColor = (banpick) => {
    if (banpick === "Ban") {
        return "#D07374"; // 赤色
    } else {
        return "#C0FFC7"; // ライトグリーン
    }
};

// スタイルを生成する関数
const createCustomStyles = (banpick) => {
    const themeColor = getBanPickColor(banpick);

    // ★★★ ここからが今回の変更点 ★★★
    // banpick の状態に応じて、メインの文字色とプレースホルダーの色を決定する
    const isPick = banpick !== 'Ban';
    // const textColor = isPick ? 'black' : 'white';
    const placeholderColor = isPick ? 'black' : 'rgba(0, 0, 0, 0.9)';
    const hoverIconColor = isPick ? 'black' : 'rgba(0, 0, 0, 0.9)';
    const textColor = 'black';
    //  const placeholderColor = 'black';
    // const hoverIconColor = 'black';
    // ★★★ ここまでが今回の変更点 ★★★

    return {
        // control のスタイルは変更ありません
        control: (provided) => ({
            ...provided,
            backgroundColor: themeColor,
            border: 'none',
            boxShadow: 'none',
            borderRadius: '6px',
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '2px 12px',
        }),
        
        // placeholder の色を、上で決定した動的な色に変更
        placeholder: (provided) => ({
            ...provided,
            color: placeholderColor,
        }),

        // singleValue (選択後の文字) の色も動的に変更
        singleValue: (provided) => ({
            ...provided,
            color: textColor,
        }),
        
        indicatorSeparator: () => ({
            display: 'none',
        }),

        // dropdownIndicator (▼アイコン) の色も動的に変更
        dropdownIndicator: (provided) => ({
            ...provided,
            color: textColor,
            '&:hover': {
                color: hoverIconColor,
            },
        }),
        
        // option (ドロップダウン内のリスト) のスタイルは変更ありません
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : 'black',
            backgroundColor: state.isSelected
                ? themeColor
                : state.isFocused
                ? '#f0f0f0'
                : 'white',
            ':active': {
                ...provided[':active'],
                backgroundColor: !state.isSelected ? themeColor : undefined,
                color: 'white',
            },
        }),
    };
};

function StageBanPickSelector({boxId, options, value, boxKindText, handleChange, banpick}) {
    const dynamicStyles = createCustomStyles(banpick);
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
                styles={dynamicStyles} // styles prop を追加
            />
        </div>
    )
}

export function StageBanPickSelectors({numberOfBoxes, options, values, handleChange}) {
    const high = (<div style={{color: '#FF4245'}}>高</div>);
    const low  = (<div style={{color: '#99FFA8'}}>低</div>);
    return (
        <div>
            <StageBanPickSelector
                boxId={0}
                options={options}
                value={values[0]}
                boxKindText={<div style={{display: "flex"}}>{high}XPチーム Ban</div>}
                handleChange={handleChange}
                banpick={"Ban"}
            />
            <StageBanPickSelector
                boxId={1}
                options={options}
                value={values[1]}
                boxKindText={<div style={{display: "flex"}}>{low}XPチーム Ban</div>}
                handleChange={handleChange}
                banpick={"Ban"}
            />
            <StageBanPickSelector
                boxId={2}
                options={options}
                value={values[2]}
                boxKindText={<div style={{display: "flex"}}>{low}XPチーム Pick</div>}
                handleChange={handleChange}
                banpick={"Pick"}
            />
            <StageBanPickSelector
                boxId={3}
                options={options}
                value={values[3]}
                boxKindText={<div style={{display: "flex"}}>{high}XPチーム Pick</div>}
                handleChange={handleChange}
                banpick={"Pick"}
            />
            <StageBanPickSelector
                boxId={4}
                options={options}
                value={values[4]}
                boxKindText={<div style={{display: "flex"}}>{high}XPチーム Ban</div>}
                handleChange={handleChange}
                banpick={"Ban"}
            />
            <StageBanPickSelector
                boxId={5}
                options={options}
                value={values[5]}
                boxKindText={<div style={{display: "flex"}}>{low}XPチーム Ban</div>}
                handleChange={handleChange}
                banpick={"Ban"}
            />
        </div>
    )
}