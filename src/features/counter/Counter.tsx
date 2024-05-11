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
  const [incrementAmount, setIncrementAmount] = useState(2)

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
            setIncrementAmount(Number(e.target.value || 0))
          }}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(counterSlice.actions.incrementByAmount(incrementAmount))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => dispatch(counterSlice.actions.incrementAsync(incrementAmount))}
        >
          Add Async
        </button>
        <button
          className={styles.asyncButton}
          disabled={status !== "idle"}
          onClick={() => dispatch(counterSlice.actions.incrementAsyncReject(incrementAmount))}
        >
          Add Async Error
        </button>
        <button
          className={styles.button}
          onClick={() => {
            dispatch(incrementIfOdd(incrementAmount))
          }}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
}
