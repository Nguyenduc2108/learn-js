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

var courseApi = "http://localhost:3000/courses";

fetch(courseApi)
    .then(function (response) {
        return response.json();
    })
    .then(function (courses) {
        console.log(courses);
    });
