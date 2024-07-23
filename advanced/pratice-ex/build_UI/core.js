// Phần lõi của javascript
// dùng module và tagged template literals để tạo html
//  tagged template literals: Tạo 1 func và gọi đến chính nó, truyền vào 1 array và 1 string: func`string`, func(array, string)

import { connect } from "./store";

// Tất cả dữ liệu viết bằng hàm html này sẽ được render ra html
export default function html([first, ...strings], ...values) {
    return values
        .reduce((acc, cur) => acc.concat(cur, strings.shift()), [first])
        .filter((x) => (x && x !== true) || x === 0)
        .join("");
}

// Create store
export function createStore(reducer) {
    let state = reducer();

    // Lấy DOM root để chuyền vào roots, lấy component tương ứng với root để cho vào render

    /**
     * 1.Map(): là 1 object đặc biệt , có tính chất lặp qua các phần tử
     * 2. có thể đặt key là bất cứ kiểu dữ liệu gì trong js
     */
    const roots = new Map();

    function render() {
        for (const [root, component] of roots) {
            // component() => func in ra chuỗi html
            const output = component();
            root.innerHTML = output;
        }
    }

    return {
        // attach: nhận view và đưa vào roots
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        connect2(
            selector = function (state) {
                return state;
            }
        ) {
            return function (component) {
                return function (props, ...args) {
                    return component(Object.assign({}, props, selector(state), ...args));
                };
            };
        },
        connect(selector = (state) => state) {
            return (component) =>
                // props: là các giá trị của state, các dữ liệu , công cụ muốn truyền vào component
                (props, ...args) =>
                    // component({ ...props, ...selector(state) }, ...args);
                    component(Object.assign({}, props, selector(state), ...args));
        },
        dispatch(action, ...args) {
            state = reducer(state, action, args);
            render();
        },
    };
}
