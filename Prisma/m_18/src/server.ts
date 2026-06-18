interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

class UserManager {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const user = this.getUserById(id);

    if (!user) {
      return null;
    }

    Object.assign(user, updates);
    return user;
  }

  deleteUser(id: number): boolean {
    const initialLength = this.users.length;

    this.users = this.users.filter(user => user.id !== id);

    return this.users.length !== initialLength;
  }

  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }

  printUsers(): void {
    this.users.forEach(user => {
      console.log(
        `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`
      );
    });
  }
}

const manager = new UserManager();

manager.addUser({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isActive: true
});

manager.addUser({
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  isActive: false
});

manager.addUser({
  id: 3,
  name: "Charlie",
  email: "charlie@example.com",
  isActive: true
});

const activeUsers = manager.getActiveUsers();

activeUsers.forEach(user => {
  console.log(`${user.name} is active`);
});

manager.updateUser(2, {
  isActive: true,
  email: "newbob@example.com"
});

const foundUser = manager.getUserById(2);

if (foundUser) {
  console.log("Updated User:", foundUser);
}

manager.deleteUser(1);

manager.printUsers();

function calculateTotal(
  numbers: number[]
): number {
  return numbers.reduce(
    (sum, current) => sum + current,
    0
  );
}

const values = [
  10,
  20,
  30,
  40,
  50
];

const total = calculateTotal(values);

console.log("Total:", total);