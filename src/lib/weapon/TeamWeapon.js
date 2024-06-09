export class TeamWeapon {
    constructor() {
        this.TEAM_SIZE = 4;
        this.NO_DECIDE_WEAPON = -1;
        // チームメンバーの武器を保持 
        // idで保持
        this.squad = Array(this.TEAM_SIZE).fill(this.NO_DECIDE_WEAPON);
        this.tail = 0;
    }

    decideWeapon(weapon) {
        this.squad[this.tail] = weapon;
        this.alignLeft()
    }

    renewSquad(newSquad) {
        this.squad = newSquad.concat()
    }

    alignLeft() {
        let index = 0;
        const newSquad = Array(this.TEAM_SIZE).fill(this.NO_DECIDE_WEAPON);
        for (let i = 0; i < this.TEAM_SIZE; i++) {
            if (this.squad[i] !== this.NO_DECIDE_WEAPON) {
                newSquad[index] = this.getPersonWeapon(i);
                index++;
            }
        }
        this.tail = index;
        this.squad = newSquad.concat();
    }

    cancelFromIndex(index) {
        this.squad[index] = this.NO_DECIDE_WEAPON;
        this.alignLeft();
    }

    cancelWeapon(weapon, weaponInformation) {
        const minorChangeIds = weaponInformation.getMinorChangeIds(weapon);
        minorChangeIds.push(weapon);
        for (let i = 0; i < minorChangeIds.length; i++) {
            if (!this.squad.includes(minorChangeIds[i])) { continue; }
            this.squad[this.squad.indexOf(minorChangeIds[i])] = this.NO_DECIDE_WEAPON;
            this.alignLeft();
            break;
        }
    }

    getPersonWeapon(index) {
        return this.squad[index];
    }

    isNotDecide(weapon) {
        return weapon === this.NO_DECIDE_WEAPON;
    }

    canAddTeam(weapon) {
        return this.tail < this.TEAM_SIZE && !this.squad.includes(weapon);
    }

    addWeapon(weapon) {
        if (this.canAddTeam()) {
            this.decideWeapon(weapon)
        }
    }

    resetTeamWeapon() {
        return new TeamWeapon();
    }
}