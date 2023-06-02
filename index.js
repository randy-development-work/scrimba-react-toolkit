import { createStore } from 'redux'
import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        running: true
    },
    reducers: {
        increment: state => {
            state.count += 1
        },
        decrement: state => {
            state.count -= 1
        },
        toggleRunning: state => {
            state.running = !state.running
        },
        incrementBy: (state, action) => {
            state.count += action.payload
        }
    }
})

console.log(slice.actions.incrementBy(10))
// store.dispatch({ type: "increment" })

// const initialState = {
//     count: 0,
//     running: true
// }

// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case "increment":
//             return {
//                 ...state,
//                 count: state.count + 1
//             }
//         case "decrement":
//             return {
//                 ...state,
//                 count: state.count - 1
//             }
//         case "toggleRunning":
//             return {
//                 ...state,
//                 running: !state.running
//             }
//         default:
//             return state
//     }
// }

const store = configureStore({
    reducer: {
        counter: slice.reducer
    }
})

store.subscribe(render)

function render() {
    const state = store.getState()
    const count = document.querySelector("#count")
    
    // get the current count and display it
    count.textContent = `Count: ${state.count}`
    
    // show a play button or pause button based on state
    document.querySelector("#play").textContent = state.running ? "⏸" : "▶️"
}

setInterval(() => {
    const state = store.getState()
    // check if the app is paused or not
    if (state.running) {
        // dispatch an action to increase the count by 1
        store.dispatch(slice.actions.increment())
    }
}, 1000)

document.querySelector("#plus").addEventListener("click", () => {
    // dispatch an action to increase the count by 1
    store.dispatch(slice.actions.incrementBy(10))
})

document.querySelector("#minus").addEventListener("click", () => {
    // dispatch an action to decrease the count by 1
    store.dispatch(slice.actions.decrement())
})

document.querySelector("#play").addEventListener("click", () => {
    // check if the app is paused or not
    // dispatch an action to either play or pause the counter
    store.dispatch(slice.actions.toggleRunning())
})