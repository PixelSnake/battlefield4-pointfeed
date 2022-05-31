import './App.css';
import React, { useState, useEffect } from 'react'
import KillEntry from './KillEntry'
import PointEntry from './PointEntry'
import { KillEvent, PointEvent, EventType } from './PointEvent';

const pool = [
  new KillEvent("Block II", "n00bslayer3000"),
  [
    new PointEvent("Headshot Bonus", 25),
    new PointEvent("Squad Order Bonus", 100),
    new PointEvent("Savior Bonus", 25),
    new PointEvent("Multi Kill", 30),
  ],
  [
    new KillEvent("Block II", "the_schnitzle"),
    new PointEvent("Payback", 50),
    new PointEvent("Squad Wipe", 50),
  ],
  new PointEvent("Squad Spawn on you", 25),
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
      <div className="flex row">
        <div className="flex col items-end">
          {
            items.map(item => {
              switch (item.type) {
                case EventType.Generic: return <PointEntry key={item.key} item={item} disappearTime={itemDisappearTime} onHide={remove} />
                case EventType.Kill: return <KillEntry key={item.key} item={item} disappearTime={itemDisappearTime} onHide={remove} />
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
