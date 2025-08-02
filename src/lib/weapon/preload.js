export function preloadWeaponImages(weaponInformation) {
    for (let index = 0; index < weaponInformation.getNumberOfWeapon(); index++) {
        let id = weaponInformation.weaponIndexToId(index);
        let img = new Image();
        img.src = "./weapon/images/"+String(id)+".webp";
    }
}