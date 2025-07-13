import { readFile } from "node:fs/promises";
const content =  await readFile(process.argv[1], {encoding: "utf-8"})
console.log(content);
