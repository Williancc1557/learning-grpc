import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import path from "path"
import dotenv from "dotenv"
dotenv.config()

const protoObject = protoLoader.loadSync(path.resolve("test.proto"))
const userClient = grpc.loadPackageDefinition(protoObject)

const client = new userClient.UserService("localhost:5000", grpc.credentials.createInsecure())

client.getUserById({
    email: process.env.EMAIL_AXIOS_API,
    domain: process.env.DOMAIN_NAME,
    domainkey: process.env.DOMAIN_KEY
}, (err, notes) => {
    console.log(err, notes)
}) //