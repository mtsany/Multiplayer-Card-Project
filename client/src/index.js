import Phaser from 'phaser';
import Game from "./scenes/game";

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 780,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);

const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080/",
        methods: ["GET", "POST"]
    }
});
