class ParentClass {
    name: string;
    age: string;
    address: string;

    constructor(name: string, age: string, address: string) {
        this.name = name //common
        this.age = age //common
        this.address = address //common
    }

    getSleep(gomHour: number) {
        console.log(`${this.name} ${gomHour} hour dore gomai`);
        
    }
}





class student extends ParentClass {

}  

const student1 = new student("Ehasun", "25", "Bogura");

student1.getSleep(7);


class Teacher extends ParentClass {
    designation: string;

    constructor(name: string, age: string, address: string, designation: string) {
        super(name, age, address)
        
        this.designation = designation //own
    }   

    // common
    getSleep(gomHour: number) {
        console.log(`${this.name} ${gomHour} hour dore gomai`);
        
    }

    // own
    takeClass(classTime: number) {
        console.log(`${this.name} is not good. Tini ${classTime} min valovabe calss nite pare na`);       
    }
}  

const teacher1 = new Teacher("Dibakor", "58", "haddipotti", "economic");

teacher1.takeClass(5)