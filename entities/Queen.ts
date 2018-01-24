const WORKER = 0;
const QUEEN = 1;

export class Queen {

	mode: number;

	constructor(data: any) {
		console.log("Creating Queen");
		this.mode = WORKER;
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