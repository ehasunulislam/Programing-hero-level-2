// Write a function calculateTotal that takes a CartItem object.
// Use Destructuring to extract properties.
// If quantity is missing, ensure the calculation treats it as 1.
// Return the total cost (price * quantity).

type CartItem = {
  name: string;
  price: number;
  quantity?: number;
};


const calculateTotal = ({price, quantity = 1}: CartItem) => {
    return price * quantity;
}

const result_1 = calculateTotal({
    name: "Pen",
    price: 30,
    quantity: 5
});

console.log(result_1);
