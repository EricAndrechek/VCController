/**
 * @name VCController
 * @author Eric Andrechek
 * @description Opens a localhost API to control muting and deafening of your client.
 * @version 0.0.1
 * @authorLink https://github.com/EricAndrechek
 * @donate https://paypal.me/AndrechekEric
 * @website https://github.com/EricAndrechek/VCController
 * @source https://gist.github.com/EricAndrechek/15e9b9a0713eb3cb6a21e134ad4835e6/raw/b21be12212e6e78952a0045104f947b4706adb5b/VCController.plugin.js
 */

const http = require("http");

module.exports = class VCController {
    start() {
        this.load();
    }
    stop() {}
    load() {
        this.createServer();
    }
    deafen() {
        document.querySelector('[aria-label="Deafen"]').click();
    }
    mute() {
        document.querySelector('[aria-label="Mute"]').click();
    }
    createServer() {
        const server = http.createServer((req, res) => {
            let path = req.url.split("/")[1];
            if (path === "mute") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Muting");
                this.mute();
            } else if (path === "deafen") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Deafening");
                this.deafen();
            }
        });
        server.on("error", (err) => {});
        server.listen(6969, () => {});
    }
};
