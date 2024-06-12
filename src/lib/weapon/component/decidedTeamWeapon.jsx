// import Select from "react-select";
// import { WeaponInformation } from "../weaponInformation";

// let weaponInformation = new WeaponInformation({});
// weaponInformation = await weaponInformation.loadWeaponInformation();
// weaponInformation.setNumberOfSameCategoryWeapon();

// function WeaponPickPusher({options}) {
//     return (
//         <Select
//             options={options}
//         />
//     )
// }

function PersonWeapon({id}) {
    return (
        // <img src="./weapon/images/noDecideWeapon.png" alt="aaa" />
        <img
            src={"./weapon/images/"+String(id)+".png"}
            alt={String(id)}
            className="team-weapon-icon"
        />
    )
}

export function ShowTeamWeapon({teamWeapon, options}) {
    return (
        <div>
            <PersonWeapon id={teamWeapon.getPersonWeapon(0)}/>
            <PersonWeapon id={teamWeapon.getPersonWeapon(1)}/>
            <PersonWeapon id={teamWeapon.getPersonWeapon(2)}/>
            <PersonWeapon id={teamWeapon.getPersonWeapon(3)}/>
            {/* <WeaponPickPusher options={weaponInformation.getLabelAndValue()}/> */}
            {/* <WeaponPickPusher/> */}
        </div>
    )
}