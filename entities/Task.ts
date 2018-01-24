export class Task {

	destination: {
		x: number,
		y: number
	}
	title: string;

	constructor(destination, title) {
		this.destination = destination;
		this.title = title;
	}
}