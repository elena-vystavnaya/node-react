const express = require("express");
const app = express();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const registerUserHandlers = require("./handlers/userHandlers");

const onConnection = (socket) => {
    const { roomId } = socket.handshake.query;
    socket.roomId = roomId;

    socket.join(roomId);

    registerUserHandlers(io, socket);

    socket.on("disconnect", (userId) => {
        socket.leave(roomId);
    });
};

io.on("connection", onConnection);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models/index");
const port = 8000;

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.removeHeader("X-Powered-By");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
});

//connect database
const uri =
    "mongodb+srv://admin:059357ok@cluster0.opo6o.mongodb.net/node_react?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
db.mongoose
    .connect(uri, options)
    .then(() => console.log("MongoDB connect"))
    .catch((err) => console.log(err));
///////////

//add url with verifyToken
const verifyToken = require("./controllers/verifyToken");
const unless = require("express-unless");
const router = express.Router();
const routes = require("./routes/index");

verifyToken.unless = unless;
app.use(
    "/api",
    verifyToken.unless({
        path: ["/api/register", "/api/login"],
    }),
    routes(router)
);
///////////

//error processing
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broken!");
});
///////////
