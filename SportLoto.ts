import _ from 'lodash';

const DEFAULT_AMOUNT: number = 7;
const DEFAULT_MIN: number = 1;
const DEFAULT_MAX: number = 49;

interface ParsedArgs {
    amount: number;
    min: number;
    max: number;
}

function parseArguments(): ParsedArgs {
    const args: string[] = process.argv.slice(2);

    let amount: number = parseInt(args[0]);
    if (isNaN(amount) || amount != 7) {
        if (args[0] !== undefined && args[0] !== '') {
            console.warn(`Warning: Invalid or non-positive value for 'amount' (${args[0]}). Using default: ${DEFAULT_AMOUNT}`);
        } else {
            console.warn(`Warning: 'amount' argument not provided. Using default: ${DEFAULT_AMOUNT}`);
        }
        amount = DEFAULT_AMOUNT;
    }

    let min: number = parseInt(args[1]);
    if (isNaN(min) || min < 1) {
        if (args[1] !== undefined && args[1] !== '') {
            console.warn(`Warning: Invalid value for 'min' (${args[1]}). Using default: ${DEFAULT_MIN}`);
        } else {
            console.warn(`Warning: 'min' argument not provided. Using default: ${DEFAULT_MIN}`);
        }
        min = DEFAULT_MIN;
    }

    let max: number = parseInt(args[2]);
    if (isNaN(max) || max > 49) {
        if (args[2] !== undefined && args[2] !== '') {
            console.warn(`Warning: Invalid value for 'max' (${args[2]}). Using default: ${DEFAULT_MAX}`);
        } else {
            console.warn(`Warning: 'max' argument not provided. Using default: ${DEFAULT_MAX}`);
        }
        max = DEFAULT_MAX;
    }

    if (min > max) {
        console.warn(`Warning: Minimal value (${min}) was greater than maximal value (${max}). Swapping them.`);
        [min, max] = [max, min];
    }
    return { amount, min, max };
}

function generateUniqueRandomNumbers(amount: number, min: number, max: number): number[] {
    const rangeSize: number = max - min + 1;

    if (amount > rangeSize) {
        const errorMessage = `Error: Cannot generate ${amount} unique numbers within the range [${min}, ${max}]. 
        The maximum unique numbers possible in this range is ${rangeSize}.`;
        console.error(errorMessage);
        process.exit(1);
    }

    const allNumbersInRange: number[] = _.range(min, max + 1);
    const shuffledNumbers: number[] = _.shuffle(allNumbersInRange);
    const randomNumbers: number[] = _.take(shuffledNumbers, amount);

    return randomNumbers;
}


const { amount, min, max }: ParsedArgs = parseArguments();
let randomNumbers: number[] = generateUniqueRandomNumbers(amount, min, max);
randomNumbers = _.sortBy(randomNumbers);
console.log("Generated Random Unique Numbers:", randomNumbers.join(', '));

