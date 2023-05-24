"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Server = (function () {
    function Server() {
        var app = (0, express_1.default)();
        this.app = app;
    }
    Server.prototype.listen = function () {
        this.app.listen(8080, function () {
            console.log("Server is on...");
            console.log("concurrently test");
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map