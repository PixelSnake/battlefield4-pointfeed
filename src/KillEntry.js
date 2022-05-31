import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function KillEntry({ item }) {
    const [state, setState] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setState(1)
        }, 2000)
    })

    return (
        <div className={classnames("entry anim-in flex row items-center", { "kill-reveal": state === 1 })}>
            { state === 0 && <span>ENEMY KILLED</span> }
            { state === 1 && <span className="noanim">[{item.weapon}]&nbsp;<span className="red">{item.enemy}</span></span> }
            <span className="points">{item.points}</span>
            <div className="arrow"></div>
        </div>
    )
}

export default KillEntry
