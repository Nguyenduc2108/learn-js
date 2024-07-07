//Fetch : gọi API từ server(backend) để lấy dữ liệu về

// API: Application Programming Interface: Giao diện lập trình ứng dụng
// Cổng giao tiếp giữa các phần mềm khác nhau

// Backend => API(url) => fetch
// => JSON => JSON.parse() => Javascript types => Render UI

// trong fetch là 1 promise

// var postApi = "https://jsonplaceholder.typicode.com/posts";

// // stream (luồng dữ liệu từ server về)
// fetch(postApi)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (posts) {
//         console.log(posts);
//     });

// fetch(courseApi)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (courses) {
//         console.log(courses);
//     });

var listCourses = document.querySelector("#list-courses");

var courseApi = "http://localhost:3000/courses";

function start() {
    getCourses(renderCourses);

    handleCreateForm();
}

start();

// functions
function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };

    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleDeleteCourse(courseId) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(courseApi + "/" + courseId, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var courseItem = document.querySelector(".course-item-" + courseId);
            if (courseItem) {
                courseItem.remove();
            }
        });
}

//  #list-courses là phần tử cha chứa tất cả các nút edit
listCourses.addEventListener("click", function (event) {
    if (event.target.matches(".edit-btn")) {
        var courseId = event.target.dataset.courseId;
        handleUpdateCourse(courseId);
    }
});

function handleUpdateCourse(courseId) {
    var createBtn = document.querySelector("#create");
    var updateBtn = document.querySelector("#update");

    var inputTitle = document.querySelector('input[name="title"]');
    var inputViews = document.querySelector('input[name="views"]');

    // Chỉnh sửa để lấy dữ liệu từ item cụ thể thay vì lấy dữ liệu đầu tiên
    var title = document.querySelector(".course-item-" + courseId + " h4").textContent;
    var views = document.querySelector(".course-item-" + courseId + " p").textContent;

    createBtn.classList.add("hide");
    updateBtn.classList.remove("hide");

    inputTitle.value = title;
    inputViews.value = views;

    // Xử lý sự kiện khi nhấn nút Save
    updateBtn.onclick = function () {
        var formData = {
            title: inputTitle.value,
            views: inputViews.value,
        };

        var options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        fetch(courseApi + "/" + courseId, options)
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                getCourses(renderCourses); // Cập nhật lại danh sách khóa học
                createBtn.classList.remove("hide");
                updateBtn.classList.add("hide");
                inputTitle.value = ""; // Reset dữ liệu trong form
                inputViews.value = "";
            });
    };
}

function renderCourses(courses) {
    var htmls = courses
        .map(function (course) {
            return `
            <li class="course-item-${course.id}">
                <h4>${course.title}</h4>
                <p>${course.views}</p>
                <button onclick="handleDeleteCourse(${course.id})">Remove</button>
                <button class="edit-btn" data-course-id="${course.id}">Edit</button>
            </li>
        `;
        })
        .join("");
    listCourses.innerHTML = htmls;
}

function handleCreateForm() {
    const createBtn = document.querySelector("#create");

    createBtn.addEventListener("click", function () {
        var title = document.querySelector('input[name="title"]').value;
        var views = document.querySelector('input[name="views"]').value;

        var formData = {
            title: title,
            views: views,
        };

        createCourse(formData, function () {
            getCourses(renderCourses);
        });
    });
}
