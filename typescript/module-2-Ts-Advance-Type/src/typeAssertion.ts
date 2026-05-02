const KgToGramConverter = (input: string | number): string | number | undefined => {
    if(typeof input === "number") {
        return input * 1000
    } else if(typeof input === "string") {
        const [value] = input.split(" ");
        return `Converted output: ${Number(value) * 1000}`
    }
}

const result1 = KgToGramConverter(2);
console.log(result1);

const result2 = KgToGramConverter("2 kg");
console.log(result2);

