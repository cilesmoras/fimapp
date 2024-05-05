"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
dotenv_1.default.config();
const PORT = process.env.port || 5001;
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
app.get("/", (req, res, next) => {
    res.send("Helow solo.");
});
// import mfoPapRoute from "./app/mfo-pap/mfo-pap.route.js";
// app.use("/mfo-pap", mfoPapRoute);
// Handling errors
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send("Internal server error");
});
