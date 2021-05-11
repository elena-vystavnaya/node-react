const express = require("express");
const app = express();
const path = require("path");
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const registerUserHandlers = require("./handlers/userHandlers");

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../build")));

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
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV == "production") {
    app.use(function (req, res, next) {
        res.setHeader(
            "Strict-Transport-Security",
            "max-age=8640000; includeSubDomains"
        );
        if (
            req.headers["x-forwarded-proto"] &&
            req.headers["x-forwarded-proto"] === "http"
        ) {
            return res.redirect(301, "https://" + req.host + req.url);
        } else {
            return next();
        }
    });
} else {
    httpServer.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    });

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
}

const cors = require("cors");
app.use(cors());

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
