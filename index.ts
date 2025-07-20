//Readable Stream
import { createReadStream } from "node:fs";
let length = 0;
const stream = createReadStream("large_file", {encoding: 'binary', highWaterMark: 1024 * 1024 * 10});
stream.on("data", chunk => {
    // console.log(`chunk with ${chunk.length} bites`)
    length += chunk.length
});
stream.on("end", () => console.log("size =", length))
stream.on("error", (error) => console.log(error.message))