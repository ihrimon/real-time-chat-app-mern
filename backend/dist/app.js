"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./app/routes"));
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
const __dirname = path_1.default.resolve();
// parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Real Time Chat App',
    });
});
app.use('/api/v1', routes_1.default);
// production build
if (config_1.default.node_env === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
    app.use((_req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
    });
}
exports.default = app;
