let a = 12;

let b = 154;

let c = 74;

function numbers(): number {
    return a;
}

console.log(numbers);



// interface
interface users {
    name: string,
    email: string,
    password: string
}

function auth(obj: users) {

}

auth({
    name: "Ehasun",
    email: "ehasun@gmail.com",
    password: "123f85fv5"
})