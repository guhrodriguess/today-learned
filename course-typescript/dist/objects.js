"use strict";
const user = {
    firstName: "Gustavo",
    age: 20,
    email: "gustavo@gmail.com",
    password: "123456",
    orders: [{ productId: "1", price: 10 }],
    register() {
        return "a";
    },
};
const printLog = (message) => { };
printLog(user.password);
const author = {
    firstName: "Gustavo",
    age: 2,
    email: "gustavo@gmail.com",
    books: ["1", "2", "3"],
    orders: [],
    register() {
        return "a";
    },
};
const emailUser = {
    email: "gustavo@gmail.com",
    firstName: "Gustavo",
    login() {
        return "a";
    },
};
const newAuthor = {
    email: "gustavo@gmail.com",
    firstName: "Gustavo",
    books: [],
    login() {
        return "a";
    },
};
const grade = 1;
