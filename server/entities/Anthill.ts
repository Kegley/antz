import { nosync } from "colyseus";
import { Placeable } from './Placeable';
import { Queen } from './Queen';
import { Workers } from './Workers';
import { Task } from './Task';

export class Anthill extends Placeable {
	
	clientId: string;
	
	queen: Queen;
	workers: Workers;
	
	status: string;

	@nosync
	taskQueue: Array<any>
	
	constructor (data: any) {
		super(data);
		this.name = `${ data.uniqueUser } Anthill`;
		this.clientId = data.id;
		this.queen = new Queen(data, this);
		this.workers = new Workers(data, 3, this);
		this.status = "active";
		this.taskQueue = new Array<any>();
		console.log(`Anthill ${ this.name } complete`);

	}


	update() {
		//console.log(`Updating ${ this.name }: ${ this.status }`)
		this.workers.update();
		this.queen.update();
	}

	getTaskQueue() {
		return this.taskQueue;
	}

	addTaskToQueue(task: Task) {
		this.taskQueue.push(task);
		return this.taskQueue.indexOf(task);
	}

	removeTaskFromQueue(priority: number) {
		this.taskQueue.splice(priority, 1);
	}

	reorderTasksInQueue(priority: number, direction: string) {
		var element = priority;
		if(direction === 'up' && priority > 0) {
			--element;
		}else if(direction === 'down' && priority < this.taskQueue.length - 1)  {
			++element;
		}else {
			console.log(`Can't move ${ direction }`)
		}
	}

	setStatus(status: string) {
		this.status = status;
	}
}