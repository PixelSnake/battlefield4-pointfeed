export const EventType = {
    Kill: 'KILL',
    Generic: 'GENERIC'
}

export class PointEvent {
    constructor(message, points) {
        this.type = EventType.Generic
        this.message = message
        this.points = points
    }
}

export class KillEvent extends PointEvent {
    constructor( weapon, enemy) {
        super(null, 100)

        this.type = EventType.Kill
        this.weapon = weapon
        this.enemy = enemy
    }
}
