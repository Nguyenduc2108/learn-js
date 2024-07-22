// import { createStore } from "https://cdn.skypack.dev/redux";

////////////////////////////////// MY REDUX //////////////////////////////////////
function createStore(reducer) {
    let state = reducer(undefined, {});

    const subscribers = [];

    return {
        getState() {
            return state;
        },

        dispatch(action) {
            state = reducer(state, action);

            subscribers.forEach((listener) => listener());
        },

        subscribe(listener) {
            subscribers.push(listener);
        },
    };
}

////////////////////////////////// MY CODE //////////////////////////////////////
const initialValue = 0;

// Reducer
function counterReducer(state = initialValue, action) {
    switch (action.type) {
        case "DEPOSIT":
            return (state = state + action.payload);
        case "WITHDRAW":
            return (state = state - action.payload);
        default:
            return state;
    }
}

// Create a store
const store = (window.store = createStore(counterReducer));

// action creator
function deposit(payload) {
    return {
        type: "DEPOSIT",
        payload,
    };
}

function withdraw(payload) {
    return {
        type: "WITHDRAW",
        payload,
    };
}

// dom elements
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");

// event listeners
depositBtn.addEventListener("click", () => {
    store.dispatch(deposit(10));
});

withdrawBtn.addEventListener("click", () => {
    store.dispatch(withdraw(10));
});

// subscribe
store.subscribe(() => {
    render();
});

store.subscribe(() => {
    console.log("sub 123");
});

store.subscribe(() => {
    console.log("sub 23");
});

// render
function render() {
    const output = document.getElementById("output");
    output.innerHTML = store.getState();
}

render();
