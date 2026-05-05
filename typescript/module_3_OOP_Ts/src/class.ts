// class Animal {
//     name: string;
//     sound: string;
//     color: string

//     constructor(name: string, sound: string, color: string) {
//         this.name = name
//         this.sound = sound
//         this.color = color
//     }

//     vot() {
//         console.log(`${this.name} Modir kase ase. kinto ${this.sound}`)
//     }
// }


// Peremeter propertise
class Animal {
    constructor(public name: string, public sound: string, public color: string) {
        this.name = name
        this.sound = sound
        this.color = color
    }

    vot() {
        console.log(`${this.name} Modir kase ase. kinto ${this.sound}`)
    }
}

const kotta = new Animal("Hasina", "Hasina palai na", "brown");

kotta.vot()
