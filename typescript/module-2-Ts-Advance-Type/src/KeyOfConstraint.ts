type User = {
  name: string;
  age: number;
  email: string;
};

type UserKeys = keyof User;

const user1: User = {
    name: "Ehasun",
    age: 25,
    email: "ehasun@example.com"
};
console.log(user1);


