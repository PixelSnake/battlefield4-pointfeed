import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function KillEntry({ item, disappearTime, onHide }) {
    const [state, setState] = useState(0)
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setState(1)
        }, 800)
        setTimeout(() => {
            setHidden(true)
            setTimeout(() => onHide && onHide(item), 1000)
        }, disappearTime)
    }, [])

    return (
        <div className={classnames("entry anim-in flex row items-center", { "kill-reveal": state === 1, hidden })}>
            { state === 0 && <span>ENEMY KILLED</span> }
            { state === 1 && <span className="noanim">[{item.weapon}]&nbsp;<span className="red player-name">{item.enemy}</span></span> }
            <span className="points">{item.points}</span>
            <div className="arrow"></div>
        </div>
    )
}

export default KillEntry
