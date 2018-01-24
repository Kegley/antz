import { EventEmitter } from 'events';
import { nosync, EntityMap } from "colyseus";
import ClockTimer from "clock-timer.js";
import { Anthill } from '../entities/Anthill';

const clock: WeakMap<MapHandler, ClockTimer> = new WeakMap<MapHandler, ClockTimer>();

export class MapHandler extends EventEmitter {
	@nosync
	roomClock;

	players;
	messages = [];
	anthills = []
	resources = []
	objects = []

	size = {
		width: 0,
		height: 0
	}
	constructor(roomClock, options) {
		super();
		console.log("Set Map Handler")
		clock.set(this, roomClock);
		this.size = options.size;
		this.roomClock = roomClock;
		this.players = new Map();

	}

	createAntHill( data: any ) {
		var anthill = new Anthill( data );
		//find a place for the anthill
		this.placeAntHilOnMap(anthill);
		//push the anthill
		this.anthills.push(anthill)
		return anthill;
	}

	setPlayerAway( client, anthill ) {
		anthill.setStatus("away")
	}

	addResource( resource ) {
		
	}

	checkResources() {
		//num anthils
		//num resources
		//map area
	
	}

	addObject( object ) {
	
	}

	update( ) {
		//console.log(this.roomClock);
		for( var a in this.anthills ) {
			this.anthills[a].update();
		}
		this.checkResources();

	}

	gameOver( data ) {
		
	}
	
	increaseMap() {
		console.log("INCREASING MAP");
		this.size.width *= 2;
		this.size.height *=2;
	}


	placeAntHilOnMap(anthill) {
		let placing = true;
		let tries = 0;
		while(placing && tries < 3) {
			anthill.x = this.getRandomPosition(this.size.width);
			anthill.y = this.getRandomPosition(this.size.height);
			//search each anthill, ensure minimum distance from other anthills and outside influence area
			let tooClose = false;
			for(let a in this.anthills) {
				if (this.getDistanceBetweenObjects(anthill, this.anthills[a]) < 10) {
					tooClose = true;
					break;
				}
			}
			if(!tooClose) {
				placing = false
			}else {
				tries++;
			}
		}
		//if placement failed because too many tries, increase map
		if(placing) {
			this.increaseMap();
			this.placeAntHilOnMap(anthill);
		}
	}

	getRandomPosition(size) {
		var num = (Math.random()* (size)) + 1; // this will get a number between 1 and 99;
		return num - (size/2);
	}
	getDistanceBetweenObjects(object1, object2) {
		var a = object1.x - object2.x;
		var b = object1.y - object2.y;

		return Math.sqrt( a*a + b*b );
	}

}