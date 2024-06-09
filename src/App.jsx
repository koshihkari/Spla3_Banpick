import { StageArea } from "./lib/stage/component/stageBanPick.jsx";
import { WeaponArea } from "./lib/weapon/component/weaponArea.jsx";


export default function App() {
    return (
        <>
            <h2>Tool for BanPick'24</h2>
            <StageArea />
            <WeaponArea />
        </>
    );   
}