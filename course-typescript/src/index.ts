let age: number = 5;
const firstName: string = "Gustavo";
const isStudent: boolean = true;
let idk: any = 5;

const ids: number[] = [1, 2, 3, 4, 5];
const booleans: boolean[] = [true, false, true];
const names: string[] = ["Gustavo", "Rodrigues", "Martins"];

// Tuple
const person: [number, string] = [1, "Gustavo"];

// List of tuples
const people: [number, string][] = [
  [1, "Gustavo"],
  [2, "Rodrigues"],
  [3, "Martins"],
];

// Intersections
const personId: string | number = 1;

// Enum
enum Direction {
  Up = 1,
  Down = 2,
  Left = "Esquerda",
}

const direction = Direction.Left;

// Type Assertions
const productName: any = "Boné";

let itemId = <string>productName;

console.log(age);
