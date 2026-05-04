/* You want a function that logs the length of various inputs (strings, arrays)
but rejects types that don't have a .length. */

// Write a generic function logLength<T>(input: T).
// Constrain T to ensure it must have a length property of type number.
// Return the length value.

function logLength<T extends {length: number}>(input: T): number {
    return input.length
}

const result1 = logLength("Hello World");

console.log(result1); 