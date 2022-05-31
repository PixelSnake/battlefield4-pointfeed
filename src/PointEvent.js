export const EventType = {
    Kill: 'KILL',
    KillAssist: 'ASSIST',
    Generic: 'GENERIC',
}

export class PointEvent {
    constructor(message, points) {
        this.type = EventType.Generic
        this.message = message
        this.points = points
    }
}

export class KillEvent extends PointEvent {
    constructor(weapon, enemy) {
        super(null, 100)

        this.type = EventType.Kill
        this.weapon = weapon
        this.enemy = enemy
    }
}

export class KillAssistEvent extends PointEvent {
    constructor(damage) {
        super(damage <= 75 ? "Kill Assist" : "Assist counts as kill", damage)
        this.type = EventType.KillAssist
    }
}

// https://www.ign.com/wikis/battlefield-4/Score_Bonuses
export const GenericEvents = {
    // Basic Bonuses
    HeadshotBonus: new PointEvent("Headshot Bonus", 25),
    SaviorBonus: new PointEvent("Savior Bonus", 25),
    AvengerBonus: new PointEvent("Avenger Bonus", 25),
    ComebackBonus: new PointEvent("Comeback Bonus", 50),
    Multikill: new PointEvent("Multi Kill", 30),
    KillStreakStopped: new PointEvent("Kill Streak Stopped", 50),
    Payback: new PointEvent("Payback", 50),
    DogtagPayback: new PointEvent("Dogtag Payback", 100),
    SquadWipe: new PointEvent("Squad Wiped", 50),
    Healing: new PointEvent("Healing", 10),
    SuppressionAssist: new PointEvent("Suppression Assist", 10),
    SpotBonus: new PointEvent("Spot Bonus", 25),

    // Squad Bonuses (incomplete)
    SquadOrderBonus: new PointEvent("Squad Order Bonus", 50),
    SquadSpawnOnYou: new PointEvent("Squad Spawn on you", 25),
    LastManSpawn: new PointEvent("Last man spawn", 50),
}
