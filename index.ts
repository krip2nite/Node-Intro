import { readFile ,writeFile } from "node:fs/promises";
async function printFile(path: string) {
    const content : string = await readFile(path, {encoding: "utf8"})
    console.log(content);
    
}
async function writeToFile(path: string, content: string) {
    writeFile(path, content); 
}

(async () =>{
    await writeToFile("hello.txt", "Hello Universe");
    await printFile("hello.txt")
})();