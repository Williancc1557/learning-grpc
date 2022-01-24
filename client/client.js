import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import path from "path"

const protoObject = protoLoader.loadSync(path.resolve("test.proto"))
const userClient = grpc.loadPackageDefinition(protoObject)

const client = new userClient.UserService("localhost:5000", grpc.credentials.createInsecure())

client.getUserById({
    id: 1
}, (err, notes) => {
    console.log(err, notes)
})