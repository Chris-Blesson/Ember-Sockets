import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
export default class ChatController extends Controller {

    @service('websockets') websockets;
    @tracked socketRef = null;
    @tracked message = "";
    init() {
        super.init(...arguments);
        const socket = this.websockets.socketFor('ws://localhost:7000/');
        socket.on('open', this.myOpenHandler, this);
        socket.on('message', this.myMessageHandler, this);
        socket.on('close', function () {
            console.log('closed');
        }, this);
        this.socketRef = socket;

    }


    myOpenHandler(event) {
        console.log('On open event has been called: ' + event);
    }

    myMessageHandler(event) {
        console.log('Message: ' + event.data);
        this.message = event.data;
    }

    @action
    sendButtonPressed() {
        this.socketRef.send('Hello Websocket World');
    }

}
