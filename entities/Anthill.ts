import { Placeable } from './Placeable';
import { Queen } from './Queen';
import { Workers } from './Workers';
import { Task } from './Task';

export class Anthill extends Placeable {
	
	clientId: string;
	
	queen: Queen;
	workers: Workers;
	
	status: string;

	taskQueue: Array<any>
	
	constructor (data: any) {
		super(data);
		this.name = `${ data.uniqueUser } Anthill`;
		this.clientId = data.id;
		this.queen = new Queen(data);
		this.workers = new Workers(data, 3);
		this.status = "active";
		this.taskQueue = new Array<any>();
		console.log(`Anthill ${ this.name } complete`);

	}

	update() {
		//console.log(`Updating ${ this.name }: ${ this.status }`)
		this.workers.update();
		this.queen.update();
	}

	setStatus(status: string) {
		this.status = status;
	}
}