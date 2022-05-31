import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

function KillEntry({ item, disappearTime, onHide }) {
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHidden(true)
            setTimeout(() => onHide && onHide(item), 1000)
        }, disappearTime)
    }, [])

    return (
        <div key={item.key} className={classnames("entry anim-in flex row items-center small", { hidden })}>
            <span className="">{item.message}</span>
            <span className="points">{item.points}</span>
            <div className="arrow"></div>
        </div>
    )
}

export default KillEntry
