import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "./counterAPI"

export interface CounterSliceState {
  count: number
  status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
  count: 0,
  status: "idle",
}

export const counterSlice = createAppSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.count += 1
    }),
    decrement: create.reducer(draft => {
      draft.count -= 1
    }),
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.count += action.payload
      },
    ),
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.count += action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectCount: counter => counter.count,
    selectStatus: counter => counter.status,
  },
})

export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = counterSlice.selectors.selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(counterSlice.actions.incrementByAmount(amount))
    }
  }
