import { readFile } from "fs/promises";
async function readFileAndSize(path: string): Promise<number> {
    const content = await readFile(path, {encoding: 'binary'})
    return content.length;
}
readFileAndSize("large_file").then(length => console.log(length))