import grpc from "grpc"
import axios from "axios"
import protoloader from "@grpc/proto-loader"
import path from "path"

const server = new grpc.Server()


const packageDefinition = protoloader.loadSync(path.resolve("./test.proto"))
const proto = grpc.loadPackageDefinition(
    packageDefinition
);
const getUserById = ({ request: { id } }, callback) => {
    const requestResponse = {
        name: "will"
    }
    return callback(null, {
        id: 1,
        name: "willian",
        description: "sou lindo"
    })
}
console.log("teste123")
server.addService(proto.UserService.service, { getUserById: getUserById })
console.log("teste121231233")

server.bind('localhost:5000', grpc.ServerCredentials.createInsecure())
console.log("server is running at localhost:5000")
server.start()