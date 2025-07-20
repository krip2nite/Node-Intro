import CounterStream from "./CounterStream.ts";
const counterStream = new CounterStream(100);
counterStream.on('data', num => console.log(num));
counterStream.on('end', () => console.log("all numbers stream"))
counterStream.on('error', err =>console.log(err.message))