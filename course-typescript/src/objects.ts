// Type
type Order = {
  productId: string;
  price: number;
};

type User = {
  firstName: string;
  age: number;
  email: string;
  password?: string;
  orders: Order[];
  register(): string;
};

const user: User = {
  firstName: "Gustavo",
  age: 20,
  email: "gustavo@gmail.com",
  password: "123456",
  orders: [{ productId: "1", price: 10 }],
  register() {
    return "a";
  },
};

const printLog = (message: string) => {};

printLog(user.password!);

// Unions
type Author = {
  books: string[];
};

const author: Author & User = {
  firstName: "Gustavo",
  age: 2,
  email: "gustavo@gmail.com",
  books: ["1", "2", "3"],
  orders: [],
  register() {
    return "a";
  },
};

// Interfaces
interface UserInterface {
  readonly firstName: string;
  email: string;
  login(): string;
}

const emailUser: UserInterface = {
  email: "gustavo@gmail.com",
  firstName: "Gustavo",
  login() {
    return "a";
  },
};

interface AuthorInterface {
  books: string[];
}

const newAuthor: AuthorInterface & UserInterface = {
  email: "gustavo@gmail.com",
  firstName: "Gustavo",
  books: [],
  login() {
    return "a";
  },
};

type Grade = number | string;
const grade: Grade = 1;
