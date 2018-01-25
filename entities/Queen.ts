import { nosync } from "colyseus";
import { Anthill } from './AntHill';

const WORKER = 0;
const QUEEN = 1;

export class Queen {

	mode: number;
	
	@nosync
	anthill: Anthill;

	constructor(data: any, anthill) {
		console.log("Creating Queen");
		this.mode = WORKER;
		this.anthill = anthill;

	}

	setMode(mode: number) {
		switch(mode){
			case WORKER:
				this.mode = WORKER;
				break;
			case QUEEN:
				this.mode = QUEEN;
				break;
		}
	}

	update() {
	
	}
}