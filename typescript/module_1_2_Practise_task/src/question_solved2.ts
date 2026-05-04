/* A user signs up as a basic Person, 
but when hired, they gain
JobDetails. An Employee is a union of both. */

// Create a new type Employee that combines Person and JobDetails.
// Write a function getProfile that accepts an Employee.
// Return a string: "Name: [name], Role: [role]".

type Person = { name: string; age: number };
type JobDetails = { role: string; salary: number };

type Employee = Person & JobDetails;

const getProfile = (emp: Employee): string => {
    return `Name: ${emp.name}, Role: ${emp.role}`
}

const result_1 = getProfile({
    name: "Ehasun",
    role: "developer",
    age: 21,
    salary: 25000
});

console.log(result_1);
