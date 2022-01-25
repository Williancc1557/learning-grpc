import grpc from "grpc"
import axios from "axios"
import protoloader from "@grpc/proto-loader"
import path from "path"

const server = new grpc.Server()


const packageDefinition = protoloader.loadSync(path.resolve("test.proto"))
const proto = grpc.loadPackageDefinition(
    packageDefinition
);
const getUserById = async ({ request: { email, domain, domainkey } }, callback) => {
    const requestResponse = await axios.post("https://login-api-dev.herokuapp.com/users/get",
        {
            "email": email,
            "domain": domain,
            "domainkey": domainkey
        })
    const dataResponse = requestResponse.data
    console.log(dataResponse)
    return callback(null, dataResponse)
}

server.addService(proto.UserService.service, { getUserById: getUserById })

server.bind('localhost:5000', grpc.ServerCredentials.createInsecure())
console.log("server is running at localhost:5000")
server.start()