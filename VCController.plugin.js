/**
 * @name VCController
 * @author Eric Andrechek
 * @description Opens a localhost API to control muting and deafening of your client.
 * @version 0.0.1
 * @authorLink https://github.com/EricAndrechek
 * @donate https://paypal.me/AndrechekEric
 * @website https://github.com/EricAndrechek/VCController
 * @source https://github.com/EricAndrechek/VCController/raw/main/VCController.plugin.js
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
    do_click(location) {
        document.getElementsByClassName("contents-18-Yxp")[location].click();
    }
    button(action) {
        let number_of_buttons =
            document.getElementsByClassName("contents-18-Yxp").length;
        let button_number = -1;
        let actions = {};
        actions["mute"] = -1;
        actions["deafen"] = -1;
        actions["screen"] = -1;
        actions["video"] = -1;
        actions["disconnect"] = -1;
        actions["settings"] = -1;
        if (number_of_buttons == 10) {
            // in voice chat
            actions["disconnect"] = 1;
            actions["video"] = 2;
            actions["screen"] = 3;
            actions["mute"] = 4;
            actions["deafen"] = 5;
            actions["settings"] = 6;
        } else if (number_of_buttons == 19) {
            // in voice chat gallery view
            actions["disconnect"] = 1;
            actions["video"] = 2;
            actions["screen"] = 3;
            actions["mute"] = 4;
            actions["deafen"] = 5;
            actions["settings"] = 6;
        } else if (number_of_buttons == 22) {
            // in voice chat gallery view
            actions["disconnect"] = 1;
            actions["video"] = 2;
            actions["screen"] = 19;
            actions["mute"] = 4;
            actions["deafen"] = 5;
            actions["settings"] = 6;
        } else if (number_of_buttons == 13) {
            // screen sharing options
            actions["disconnect"] = 1;
            actions["video"] = 2;
            actions["mute"] = 4;
            actions["deafen"] = 5;
            actions["screen"] = 10;
        } else {
            // not in voice chat
            actions["mute"] = 0;
            actions["deafen"] = 1;
            actions["settings"] = 2;
        }
        button_number = actions[action];
        console.log(button_number);
        if (button_number != -1) {
            this.do_click(button_number);
        }
    }
    createServer() {
        const server = http.createServer((req, res) => {
            let path = req.url.split("/")[1];
            if (path === "mute") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Muting");
                this.button("mute");
            } else if (path === "deafen") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Deafening");
                this.button("deafen");
            } else if (path === "screen") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Starting/stopping stream");
                this.button("screen");
            } else if (path === "video") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Starting/stopping video");
                this.button("video");
            } else if (path === "disconnect") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Disconnecting");
                this.button("disconnect");
            } else if (path === "settings") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Opening settings");
                this.button("settings");
            }
        });
        server.on("error", (err) => {});
        server.listen(6969, () => {});
    }
};
