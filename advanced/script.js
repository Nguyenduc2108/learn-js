//IIFE :

// function expression
(function () {
    console.log("IIFE");
})();

const app = (function () {
    //Private
    const cars = [];
    return {
        add(car) {
            cars.cars.push(car);
        },
        edit(index, car) {
            cars.cars[index] = car;
        },
        delete(index) {
            cars.cars.splice(index, 1);
        },
    };
})();

const number = (function (a, b) {
    a + b;
})(1, 2);

console.log(number); // Output: ? // ko co return => undefined

var age = 18;
{
    {
        {
            var age = 14;
        }
    }
    console.log(age);
}

// scope
/**
 * 1. Global scope: toàn bộ file
 * 2. Block scope: if, for, while, trong {}, trong khối code
 * 3. Function scope: trong function, chỉ có thể truy cập trong function đó
 */

// Closure
/**
 * 1. Function trong function
 * 2. Function con có thể truy cập biến của function cha
 * 3. Function cha không thể truy cập biến của function con
 * 4. Biến của function cha không bị hủy khi function cha kết thúc
 * 5. Biến của function cha không thể thay đổi bởi function con
 * 6. Function con có thể thay đổi biến của function cha thông qua return
 * 7. Có thể truy cập biến của function cha thông qua return
 *
 */

function createCounter() {
    let counter = 0;

    function increase() {
        return ++counter;
    }

    return increase;
}

const counter1 = createCounter();

console.log(counter1());

// VD
// Hàm tạo logger
function createLogger(namespace) {
    function logger(str) {
        console.log(`[${namespace}] ${str}`);
    }
    return logger;
}

// App

// Register.js
const infoLogger = createLogger("Info");

infoLogger("This is an info message");

// VD2
function createStorage(key) {
    const store = JSON.parse(localStorage.getItem(key)) ?? {};

    const save = () => {
        localStorage.setItem(key, JSON.stringify(store));
    };

    const storage = {
        get(key) {
            return store[key];
        },
        set(key, value) {
            store[key] = value;
            save();
        },
        remove(key) {
            delete store[key];
            save();
        },
    };
    return storage;
}

// Profile.js
const profileSetting = createStorage("profile_setting");

console.log(profileSetting.get("name"));

profileSetting.set("name", "Teo");
profileSetting.set("age", 18);
profileSetting.set("address", "HCM");

//VD3

function createApp() {
    const cars = [];

    const appCars = {
        add(car) {
            cars.push(car);
        },
        show() {
            console.log(cars);
        },
    };
    return appCars;
}

const appApp = createApp();

appApp.show();

appApp.add("BMW");

appApp.show();

appApp.add("Audi");
appApp.add("Mercedes");

appApp.show();

function a(x) {
    x++;
    return function () {
        console.log(++x);
    };
}

a(1)();
a(1)();
a(1)();

let x = a(1);
x();
x();
x();
// Output: ?

///////////////////////////// hosting
// var: hosting + undefined
// let, const: hosting + ReferenceError
//////////////////////////////////////
///////////////////////////// strict mode
// "use strict";
// 1. Không được khai báo biến mà không sử dụng
// 2. Không được gán giá trị cho biến mà chưa khai báo
// 3. Không được xóa biến
// 4. Không được gán giá trị cho các thuộc tính chỉ đọc
// 5. Không được gán giá trị cho các tham số
// 6. Không được gán giá trị cho NaN, Infinity, undefined
// 7. Không được sử dụng eval
// 8. Không được sử dụng with
// 9. Không được sử dụng arguments.caller và arguments.callee
// 10. Không được sử dụng delete cho biến, hàm, hằng số
// 11. Không được sử dụng hàm eval
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// Data types
// primitive types (value types)

var a = 1;
var b = a;

a = 2;
console.log(b); // Output: 1

var a = { name: "Teo" };
var b = a;

a.name = "Ti";
console.log(b.name); // Output: Ti

var a = { name: "Teo" };
var b = { ...a };

a.name = "Ti";
console.log(b.name); // Output: Teo

// VD2
function sum(a, b) {
    console.log(a, b);
}

const c = 1;
const d = 2;
sum(c, d);

function func(obj) {
    obj = JSON.parse(JSON.stringify(obj));
    obj = { ...obj };
    obj.name = "Audi";
    console.log(obj);
}

const ap = {
    name: "BMW",
};

func(ap);

console.log(ap);
