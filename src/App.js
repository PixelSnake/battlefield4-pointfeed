import './App.css';
import React, { useState, useEffect } from 'react'
import KillEntry from './KillEntry'
import PointEntry from './PointEntry'
import { KillEvent, EventType, GenericEvents } from './PointEvent';

const block2 = "Block II"
const p226 = "P226"

const pool = [
  GenericEvents.SquadSpawnOnYou,
  [
    GenericEvents.SaviorBonus,
    new KillEvent(block2, "n00bslay3r"),
  ],
  [
    GenericEvents.Payback,
    GenericEvents.SquadWipe,
    new KillEvent(block2, "gurkenwasser"),
  ],
  [
    GenericEvents.KillStreakStopped,
    new KillEvent(p226, "sn1perdude"),
  ],
  [
    GenericEvents.KillStreakStopped,
    new KillEvent(p226, "elastigirl"),
  ],
  [
    GenericEvents.HeadshotBonus,
    GenericEvents.AvengerBonus,
    GenericEvents.Multikill,
    new KillEvent(p226, "campernudel"),
  ],
  [
    GenericEvents.AvengerBonus,
    GenericEvents.Multikill,
    new KillEvent(p226, "hakunamatata"),
  ],
  [
    GenericEvents.SquadWipe,
    GenericEvents.Multikill,
    GenericEvents.KillStreakStopped,
    new KillEvent(p226, "pumbathebear"),
  ],
  [
    new KillEvent(block2, "shotgunguy"),
  ],
  [
    GenericEvents.Payback,
    GenericEvents.Multikill,
    new KillEvent(block2, "friendofshotty"),
  ],
  [
    GenericEvents.Multikill,
    new KillEvent(block2, "herbärt05"),
  ],
  [
    new KillEvent(block2, "rusherman"),
  ],
  [
    GenericEvents.HeadshotBonus,
    new KillEvent(block2, "campersau"),
  ],
  [
    GenericEvents.HeadshotBonus,
    GenericEvents.Multikill,
    new KillEvent(block2, "sn1per_rolf"),
  ],
  [
    GenericEvents.SquadOrderBonus,
    GenericEvents.SquadWipe,
    new KillEvent(block2, "PeterDerMetzger"),
  ],
]

const itemDisappearTime = 8000
let lastEventTime = 0
let toRemove = []

function App() {
  const [keyCounter, setKeyCounter] = useState(0)
  const [items, setItems] = useState([])
  const [poolIndex, setPoolIndex] = useState(0)

  const addItem = () => {
    const next = pool[poolIndex]

    if (Array.isArray(next)) {
      const newItems = next.map((item, index) => ({ ...item, key: keyCounter + index }))
      setItems(prev => [...newItems, ...prev])
      setKeyCounter(prev => prev + newItems.length)
    } else {
      const item = { ...pool[poolIndex], key: keyCounter }
      setItems(prev => [item, ...prev])
      setKeyCounter(prev => prev + 1)
    }

    setPoolIndex(prev => prev + 1)
    lastEventTime = Date.now()
  }

  const remove = (item, force = false) => {
    if (!force && Date.now() - lastEventTime < itemDisappearTime) {
      toRemove = [...toRemove, item]
    } else {
      setItems(prev => prev.filter(i => i.key !== item.key))
      toRemove.forEach(r => {
        setItems(prev => prev.filter(i => i.key !== r.key))
      })
      toRemove = []
    }
  }

  return (
    <div className="App">
      <button onClick={addItem}>next</button>
      <div className="flex row point-feed">
        <div className="flex col items-end">
          {
            items.map(item => {
              switch (item.type) {
                default: return <PointEntry key={item.key} item={item} disappearTime={itemDisappearTime} onHide={remove} />
                case EventType.Kill: return <KillEntry key={item.key} item={item} disappearTime={itemDisappearTime} onHide={remove} />
              }
            })
          }
        </div>
        
        {
          items.length > 1 && (
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
