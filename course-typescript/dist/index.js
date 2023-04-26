"use strict";
let age = 5;
const firstName = "Gustavo";
const isStudent = true;
let idk = 5;
const ids = [1, 2, 3, 4, 5];
const booleans = [true, false, true];
const names = ["Gustavo", "Rodrigues", "Martins"];
// Tuple
const person = [1, "Gustavo"];
// List of tuples
const people = [
    [1, "Gustavo"],
    [2, "Rodrigues"],
    [3, "Martins"],
];
// Intersections
const personId = 1;
// Enum
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction["Left"] = "Esquerda";
})(Direction || (Direction = {}));
const direction = Direction.Left;
// Type Assertions
const productName = "Boné";
let itemId = productName;
console.log(age);
