import { writeFile } from "node:fs/promises";
writeFile("hello.txt", "Hello world").then(()=> console.log("file created")).catch(er => console.log(er.message))
