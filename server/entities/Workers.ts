import { nosync } from "colyseus";
import { Anthill } from './AntHill';


export class Workers {
	
	size: number;
	stats: Array<number>;

	@nosync
	anthill: Anthill;

	constructor( data: any, size, anthill: Anthill) {
		console.log("Creating Workers")
		this.size = size;
		this.anthill = anthill;
		
	}

	update() {
	
	}
}