const addStudent = <T extends {id: number, name: string, hasPen: boolean}> (stduentInfo: T) => {
    return{
        course: "Learn With Ehasun",
        ...stduentInfo
    }
}

const s1 = {
    id: 1,
    name: "Ehasun",
    hasPen: true,
}

const s2 = {
    id: 2,
    name: "Pagol",
    hasMoney: true,
}

const result = addStudent(s1);
console.log(result);


// log object create 

type Car = {
    id: number,
    name: string,
    color: string,
    model: string,
    engeenNumber: Number,
    registration: boolean,
}


const carDeclare = <T extends Car> (showCar: T) => {
    return {
        ...showCar
    }
}


const sportsCar1 = {
    id: 111,
    name: "Lambo",
    color: "yellow",
    model: "2025",
    engeenNumber: 1215582,
    registration: true
}

// const sportsCar2 = {
//     id: 111,
//     name: "Lambo",
//     color: "yellow",
//     model: "2025",
//     engeenNumber: 1215582,
//     registration: false
// }

const result2 = carDeclare(sportsCar1);
console.log(result2);


// this is the rules of typeScript declare