import { createStore } from "./core.js";
import reduce from "./reducer.js";

const { attach, connect, dispatch } = createStore(reduce);

window.dispatch = dispatch;

export { attach, connect };
