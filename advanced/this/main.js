const iPhone7 = {
    // Properties
    name: "iPhone 7",
    brand: "Apple",
    price: 650,

    // Methods
    takePhoto() {
        console.log(`${this.name} is taking a photo...`);
    },
};

console.log(iPhone7);

/**
 * This
 * - this là một keyword đặc biệt trong JavaScript, nó tham chiếu đến object mà phương thức hoặc thuộc tính đang được gọi.
 * - this giúp chúng ta truy cập đến các thuộc tính và phương thức của object mà chúng ta đang làm việc.
 * - Trong một phương thức, this tham chiếu đến object chứa phương thức đó.
 * - Trong một hàm, this tham chiếu đến global object (window trong trình duyệt).
 * - Trong strict mode, this sẽ là undefined nếu hàm không được gọi trên một object.
 * - Để tránh nhầm lẫn, nên sử dụng this trong phương thức của object.
 */

/////////////////// bind
// bind() method tạo ra một hàm mới, trong đó this được gán cho một giá trị cụ thể.
// Syntax: function.bind(thisArg[, arg1[, arg2[, ...]]])
// thisArg: Giá trị mà this sẽ tham chiếu đến.
// arg1, arg2, ...: Các tham số được truyền vào hàm.

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const cars = ["BMW"];

    const root = $("#root");
    const input = $("#input");
    const submit = $("#submit");

    return {
        add(car) {
            cars.push(car);
        },
        edit(index, car) {
            cars[index] = car;
        },
        delete(index) {
            cars.splice(index, 1);
        },
        getCars() {
            return cars;
        },
        render() {
            const html = cars
                .map(
                    (car, index) => `
                    <li>
                        ${car}
                        <span class="delete" data-index="${index}">&times;</span>
                    </li>
                    `
                )
                .join("");
            root.innerHTML = html;
        },

        handleDelete(e) {
            const deleteBtn = e.target.closest(".delete");

            if (deleteBtn) {
                const index = deleteBtn.dataset.index;
                app.delete(index);
                app.render();
            }
        },

        init() {
            // Handle DOM events
            submit.onclick = () => {
                const value = input.value;

                //  Do not add car if it is already existed
                if (!cars.includes(value)) {
                    this.add(value);
                    this.render();
                    input.value = "";
                    input.focus();
                } else {
                    alert("Car is already existed!");
                    input.value = "";
                    input.focus();
                }
            };

            // Delete car
            root.onclick = this.handleDelete.bind(this);

            this.render();
        },
    };
})();

app.init();

/////////////// call
// call() method gọi một hàm với một giá trị this được gán và các tham số được truyền vào.
// Syntax: function.call(thisArg, arg1, arg2, ...)
// thisArg: Giá trị mà this sẽ tham chiếu đến.
// arg1, arg2, ...: Các tham số được truyền vào hàm.
function random() {
    console.log(Math.random());
}

random.call(); // Math.random()

const teacher = {
    firstName: "Minh",
    lastName: "Nguyen",
};

const me = {
    firstName: "Dinh",
    lastName: "Tran",
    getFullName() {
        console.log(this.firstName + " " + this.lastName);
    },
};

me.getFullName(); // Dinh Tran
me.getFullName.call(teacher); // Minh Nguyen

// trong call bind this

//////////////////// apply Gần giống với call, nhưng tham số thứ 2 là một mảng các tham số
// apply() method gọi một hàm với một giá trị this được gán và một mảng các tham số được truyền vào.
// Syntax: function.apply(thisArg, [argsArray])
// thisArg: Giá trị mà this sẽ tham chiếu đến.
// argsArray: Mảng các tham số được truyền vào hàm.
const teachers = {
    firstName: "Minh",
    lastName: "Thu",
};

function greet(greeting, message) {
    return `${greeting} ${this.firstName} ${this.lastName}. ${message}`;
}

let result = greet.apply(teachers, ["Hello", "How are you?"]);

console.log(result); // Hello Minh Thu. How are you?  => gọi hàm và bind this luôn

// So sánh với call() method
result = greet.call(teachers, "Hello", "How are you?");

console.log(result); // Hello Minh Thu. How are you?

function Animal(name, color) {
    this.name = name;
    this.color = color;
}

function Cat() {
    Animal.apply(this, arguments);
    this.speak = function () {
        console.log("Meo meo");
    };
}

const cat = new Cat("Tom", "Black");

console.log(cat); // Cat { speak: [Function (anonymous)] }
