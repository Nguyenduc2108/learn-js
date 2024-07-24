const TODO_STORAGE_KEY = "TODO_STORAGE_KEY";

export default {
    get() {
        return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
    },
    set(todos) {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    },
};
