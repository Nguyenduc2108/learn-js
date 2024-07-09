// arrow function

// const name = "John";
// const age = 25;

// function highlight([first, ...strings], ...values) {
//     return values.reduce((acc, curr) => `${acc} <span>${curr}</span> ${strings.shift()}`, first);
// }

// const html = highlight`Hello, my name is ${name} and I am ${age} years old.`;

// document.body.innerHTML = html;

const numbers = [1, 2, 3, 4, 5];

Array.prototype.reduce2 = function (callback, result) {
    let i = 0;
    if (arguments.length < 2) {
        i = 1;
        result = this[0];
    }

    for (; i < this.length; i++) {
        result = callback(result, this[i], i, this);
    }

    return result;
};

const result = numbers.reduce2((total, number) => {
    return total + number;
});

console.log(result);
