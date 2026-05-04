/* You receive a value from a 3rd-party library typed as unknown. 
You are certain it's a string and need to manipulate it.  */

// Create a variable upperValue.
// Assign secretValue to it using Type Assertion.
// Call .toUpperCase() on the resulting value.

let secretValue: unknown = "typescript is awesome";
const uppervalue = (secretValue as string).toUpperCase();

console.log(uppervalue);
