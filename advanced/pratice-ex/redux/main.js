// hiểu cấu trúc dữ liệu và luồng của redux
// 1. Quản lý state
/**
 * 1.nghe event click (nạp or rút tiền)
 * 2. chuyền đến hàm xử lý (event handler)
 * 3. trong event handler sẽ có 1 cái dispatch(gửi dữ liệu đi)
 * 4. trong event click sẽ có 1 hành động (action) đi kèm
 * 5. dispatch sẽ gửi action đến reducer
 * 6. action sẽ chuyền vào reducer ( trong kho store)
 * 7. reducer sẽ xử lý action và trả về state mới
 * 8. state mới sẽ được cập nhật ra ngoài UI
 */

// import { createStore } from "https://cdn.skypack.dev/redux";

/////////////////////////// MY REDUX ///////////////////////////
function createStore(reducer) {
    let state = reducer(undefined, {});
    const subscribers = [];

    return {
        getState() {
            return state;
        },
        dispatch(action) {
            // state mới = reducer nhận vào state trước đó và action
            state = reducer(state, action);

            subscribers.forEach((subscribers) => subscribers());
        },
        subscribe(subscriber) {
            subscribers.push(subscriber);
        },
    };
}

/////////////////////////// MY APP ///////////////////////////
const initState = 0;

// Reducer func
function bankReducer(state = initState, action) {
    switch (action.type) {
        case "DEPOSIT":
            return state + action.payload;
        case "WITHDRAW":
            return state - action.payload;
        default:
            return state;
    }
}

// Create store
// Tạo ra store và truyền reducer vào store
/**
 * 1. Trong store sẽ có 1 dispatch dùng để gửi action đi
 * 2. Trong store sẽ có 1 getState dùng để lấy state hiện tại ( trả state hiện tại )
 * 3. Trong store sẽ có 1 subscribe dùng để lắng nghe sự thay đổi của state ( thông báo lại dưới dạng callback)
 * 4. Trong store sẽ có 1 replaceReducer dùng để thay đổi reducer
 * 5. Trong store sẽ có 1
 */
const store = (window.store = createStore(bankReducer));

// Create action
function actionDeposit(payload) {
    return {
        type: "DEPOSIT",
        payload,
    };
}

function actionWithdraw(payload) {
    return {
        type: "WITHDRAW",
        payload,
    };
}

// DOM event
const depositBtn = document.getElementById("deposit");
const withdrawBtn = document.getElementById("withdraw");

// Event handler
depositBtn.addEventListener("click", () => {
    store.dispatch(actionDeposit(10));
});

withdrawBtn.addEventListener("click", () => {
    store.dispatch(actionWithdraw(10));
});

// Listener
store.subscribe(() => {
    render();
});
store.subscribe(() => {
    console.log("Sub 2");
});
store.subscribe(() => {
    console.log("Sub 3");
});

//render
function render() {
    const output = document.getElementById("output");
    output.innerText = store.getState();
}

render();
