import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./Counter.module.css"
import {
  incrementIfOdd,
  counterSlice
} from "./counterSlice"

export const Counter = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector(counterSlice.selectors.selectCount)
  const status = useAppSelector(counterSlice.selectors.selectStatus)
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <h1>Status : {status}</h1>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(counterSlice.actions.decrement())}
        >
          -
        </button>
        <span aria-label="Count" className={styles.value}>
          {count}
        </span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(counterSlice.actions.increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          type="number"
          onChange={e => {
            setIncrementAmount(e.target.value)
          }}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(counterSlice.actions.incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => dispatch(counterSlice.actions.incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(incrementIfOdd(incrementValue))
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}
