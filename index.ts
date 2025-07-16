import EventEmitter from "events";
const emitter = new EventEmitter();
emitter.on("message", (arg: string) =>{
    if (arg.toLocaleLowerCase().includes("hello")){
        throw new Error("get tired from 'hello'")
    }
})
emitter.on("message", (arg: any) => console.log("event message emitted",` message contains ${arg}`));
emitter.on("message", (arg: string) => console.log(`length of message is ${arg.length}`));
console.log(emitter.eventNames());
emitter.emit("message", "kukureku");
emitter.emit("message", "Hell world")