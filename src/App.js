import './App.css';
import React, { useState, useEffect } from 'react'
import KillEntry from './KillEntry'

const TYPES = {
  KILL: 'KILL',
  GENERIC: 'GENERIC'
}

const pool = [
  {
    type: TYPES.KILL,
    enemy: 'n00bslayer3000',
    points: 100,
    weapon: 'BLOCK II'
  },
  [
    {
      type: TYPES.GENERIC,
      message: 'HEADSHOT BONUS',
      points: 25
    },
    {
      type: TYPES.GENERIC,
      message: 'SQUAD ORDER BONUS',
      points: 100
    },
    {
      type: TYPES.GENERIC,
      message: 'SAVIOR BONUS',
      points: 25
    },
    {
      type: TYPES.GENERIC,
      message: 'MULTI KILL',
      points: 30
    },
  ],
  [
    {
      type: TYPES.KILL,
      enemy: 'the_schnitzle',
      points: 100,
      weapon: 'BLOCK II'
    },
    {
      type: TYPES.GENERIC,
      message: 'PAYBACK',
      points: 50
    },
    {
      type: TYPES.GENERIC,
      message: 'SQUAD WIPE',
      points: 50
    },
  ],
  {
    type: TYPES.GENERIC,
    message: 'SQUAD SPAWN ON YOU',
    points: 25
  },
]

function App() {
  const [items, setItems] = useState([])
  const [poolIndex, setPoolIndex] = useState(0)

  const addItem = () => {
    const next = pool[poolIndex]

    if (Array.isArray(next)) {
      const newItems = next.map((item, index) => ({ ...item, key: items.length + index }))
      console.log(newItems)
      setItems([...newItems, ...items])
    } else {
      const item = { ...pool[poolIndex], key: items.length }
      console.log(item)
      setItems([item, ...items])
    }

    setPoolIndex(poolIndex + 1)
  }

  return (
    <div className="App">
      <button onClick={addItem}>next</button>
      <div className="flex row">
        <div className="flex col items-end">
          {
            items.map(item => {
              switch (item.type) {
                case TYPES.GENERIC: return (
                    <div key={item.key} className="entry anim-in flex row items-center small">
                      <span className="">{item.message}</span>
                      <span className="points">{item.points}</span>
                      <div className="arrow"></div>
                    </div>
                  )

                case TYPES.KILL: return <KillEntry key={item.key} item={item} />
              }
            })
          }
        </div>
        
        {
          items.length > 0 && (
            <div key={1000 + items.length} className="entry large sum">
              {items.map(i => i.points).reduce((prev, val) => prev + val)}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
