export class Placeable {
	name: string;
	x: number;
	y: number;
	
	constructor( data: any ) {
		this.name = data.name;
		this.x = data.x;
		this.y = data.y;
	}
}