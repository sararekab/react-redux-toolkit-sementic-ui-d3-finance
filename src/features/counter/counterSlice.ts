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
    increment: create.reducer(draft => {
      draft.count += 1
    }),
    decrement: create.reducer(draft => {
      draft.count -= 1
    }),
    incrementByAmount: create.reducer(
      (draft, action: PayloadAction<number>) => {
        draft.count += action.payload
      },
    ),
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        return response.data
      },
      {
        pending: draft => {
          draft.status = "loading"
        },
        fulfilled: (draft, action) => {
          draft.status = "idle"
          draft.count += action.payload
        },
        rejected: draft => {
          draft.status = "failed"
        },
      },
    ),
    incrementAsyncReject: create.asyncThunk(
      async (amount: number) => {
        throw new Error('error')
      },
      {
        pending: draft => {
          draft.status = "loading"
        },
        fulfilled: (draft, action) => {
          draft.status = "idle"
          draft.count += action.payload
        },
        rejected: draft => {
          draft.status = "failed"
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
