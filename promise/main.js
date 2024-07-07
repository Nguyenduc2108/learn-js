// What is the promise? trong promise la` function
// promise có 3 trạng thái: Pending, Resolved, Rejected

// const promise = new Promise(
//     //Executor
//     function (resolve, reject) {
//         //Logic
//         //thanh` cong :  resolve('Success');
//         //that bai:  reject('Error');
//     }
// );

// // khi thuc hien promise thi se co Loading

// promise
//     .then(function () {
//         console.log("Success"); //resolve => then
//     })
//     .catch(function () {
//         console.log("Error"); // reject => catch
//     })
//     .finally(function () {
//         console.log("Done");
//         // lam xong thi tat Loading di
//     });

// function sleep(ms) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, ms);
//     });
// }

// sleep(1000)
//     .then(function () {
//         console.log(1);
//         return sleep(1000);
//     })
//     .then(function () {
//         console.log(2);
//         return sleep(1000);
//     })
//     .then(function () {
//         console.log(3);
//     });

// // Promise.resolve
// // Promise.reject
// // Promise.all

// const promise1 = new Promise(function (resolve) {
//     setTimeout(function () {
//         resolve([1]);
//     }, 1000);
// });

// const promise2 = new Promise(function (resolve) {
//     setTimeout(function () {
//         resolve([2, 3]);
//     }, 2000);
// });

// Promise.all([promise1, promise2]).then(function ([result1, result2]) {
//     console.log(result1.concat(result2));
// });

// VD Promise

var users = [
    {
        id: 1,
        name: "Huy",
    },
    {
        id: 2,
        name: "Hoa",
    },
    {
        id: 3,
        name: "Hung",
    },
    //...
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: "Anh Huy dep trai",
    },
    {
        id: 2,
        user_id: 2,
        content: "Anh Hoa xinh gai",
    },
];

// 1. Lấy comment
// 2. Tu comment lay ra user_id
// 3. Tu user_id lay ra user tuong ung

// Fake API
function getComments() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments);
        }, 1000);
    });
}

function getUsersByIds(userIds) {
    return new Promise(function (resolve) {
        var result = users.filter(function (user) {
            return userIds.includes(user.id);
        });
        setTimeout(function () {
            resolve(result);
        }, 1000);
    });
}

getComments().then(function (comments) {
    var userIds = comments.map(function (comment) {
        return comment.user_id;
    });

    return getUsersByIds(userIds)
        .then(function (users) {
            return {
                users: users,
                comments: comments,
            };
        })
        .then(function (data) {
            var commentBlock = document.getElementById("comment-block");
            var html = "";
            data.comments.forEach(function (comment) {
                var user = data.users.find(function (user) {
                    return user.id === comment.user_id;
                });
                html += `<li>${user.name}: ${comment.content}</li>`;
            });
            commentBlock.innerHTML = html;
        });
});

// Promise : xử lý thao tác bất đồng bộ
