import { Room, Client, nosync } from "colyseus";
import { MapHandler } from "../handlers/MapHandler"

const TICK_RATE = 30;
const MAX_CLIENTS = 15;

const MAP_X_STARTER = 25;
const MAP_Y_STARTER = 25;

//ACTIONS
enum Actions {
	ADD_TO_QUEUE,
	SET_QUEEN_ROLE,
	REMOVE_FROM_QUEUE,
	UPDATE_PRIORTIES
} 

export class AntMap extends Room<MapHandler> {
	

	constructor() {
		super();
	}

	onInit (options) {
		console.log("Ant Farm ", this.roomId, " Created: ", options);
		//GAME ENGINE SETTINGS
		this.autoDispose = true;;
		this.setSimulationInterval(this.onUpdate)
		//END GAME ENGINE SETTINGS

		options.size = {
			width: MAP_X_STARTER,
			height: MAP_Y_STARTER
		}
		this.setState(new MapHandler(this.clock, options))
		this.state.messages = ["New Ant Farm Map Created"];

		
	}
	
	requestJoin( options ) {
		console.log(options)
		//check if the MAX_CLIENTS and the user not in room already
		return this.state.players.size < MAX_CLIENTS;
	}

    onJoin (client) {
		client.uniqueUser = `${ client.id }-${ client.sessionId }`
        this.state.messages.push(`${ client.sessionId } joined @ ${ JSON.stringify(this.clock) }`);
		var anthill = this.state.createAntHill(client)
		this.state.players.set(client, anthill);
		console.log("Done creating anthill for client @ (x:", anthill.x, ",y: ", anthill.y, ")");
		let that = this;
		setTimeout(function() {
			console.log("Updating Messages")
			that.state.messages.push(`Updated From Server due to trigger ${ client.sessionId }`)
		}, 1500);
    }

    onLeave (client) {
        this.state.messages.push(`${ client.sessionId } left.`);

		this.state.setPlayerAway(client, this.state.players.get(client));
		
		//remove player
		this.state.players.delete(client);
		//finished
		console.log(this.roomId, " User: ", client.sessionId, " left.");
    }

    onMessage (client, data) {
		try {
			data = JSON.parse(data);
		} catch (e) {
			console.log("Already JSON Format");
		}
        this.state.messages.push(`(${ client.sessionId }) ${ data }`);
		console.log(typeof(data));
        console.log(this.roomId, " received message from", client.sessionId, ":", data);
		switch(data.action) {
			case Actions.ADD_TO_QUEUE:
				console.log(`Add task to ${ client }'s queue`);
				break;
			case Actions.SET_QUEEN_ROLE:
				console.log(`Set Queen to ${ data.value } for ${ client }`);
				break;
				
			default:
				console.log(data.action)
				break;
		}
    }
	
	onUpdate = () => {
		//console.log("updating")
		this.state.update();
	}

    onDispose () {
       
	}
}