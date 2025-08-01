import { StageArea } from "./lib/stage/component/stageBanPick.jsx";
import { WeaponArea } from "./lib/weapon/component/weaponArea.jsx";


export default function App() {
    return (
        <div className="main-container">
            <h2>Tool for BanPick'25</h2>
            <StageArea />
            <WeaponArea />
        </div>
    );   
}