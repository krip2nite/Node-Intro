import { createWriteStream } from "node:fs";
const writeStream = createWriteStream("large_file",{highWaterMark: 1024 * 1024 * 10});
const max = 1000000000;
for (let i = 0; i < max; i++)
{
    writeStream.write("Hello");
    i += 5;
}
writeStream.end(()=> console.log("all data written"));