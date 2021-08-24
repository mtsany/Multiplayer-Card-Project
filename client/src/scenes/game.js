import Card from '../helpers/card';
import Zone from '../helpers/zone';
import io from 'socket.io-client';

export default class Game extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Game'
        });
    }
    
    preload() {
        this.load.image('backOfCard', 'src/assets/back-of-card.jpg');
        this.load.atlas('cards', 'assets/atlas/cards.png', 'assets/atlas/cards.json');
        }

    create() {
        let self = this; // allows to access game scenes within other functions

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.socket = io('http://localhost:3000', {
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }
        });

        this.socket.on('connect', () => {
            console.log('Connected!');
            displayMessage('You connected with id: ${socket.id}')
        });
 
        this.dealCards = () => {
            for (let i = 0; i < 2; i ++ ) {
                let playerCard = new Card(this);
                playerCard.render(475 + (i*100), 650, 'backOfCard');
            }

        }

        this.dealText = this.add.text(75, 350, ['Deal Cards']).setFontSize(18).setFontFamily('Consolas').setColor('#00ffff').setInteractive();
    
        this.dealText.on('pointerdown', function () {
            self.dealCards();
        })

        this.dealText.on('pointerover', function() {
            self.dealText.setColor('#ffffff');
        })

        this.dealText.on('pointerout', function() {
            self.dealText.setColor('#808080');
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xffffff); // tints to white if picked up (or dragged)
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function(pointer, gameObject, dropped){
            gameObject.setTint(); // resets tint to normal
            if (!dropped) { // if not dropped, in a dropzone, return to ORIGINAL COORDINATES
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('drop', function(pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 350) + (dropZone.data.values.cards * 100);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
        })
    
    }

    update() {

    }
}