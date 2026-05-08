// typeGuard => typeOf
type Beta = number | string;

function add(num1: Beta, num2: Beta) {
    if(typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    } else {
      return  num1.toString() + num2.toString();
    }
}

console.log(add(2, "2"));



// in Guard