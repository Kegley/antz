export class Resource {
	weight: number;
	size: number;

	constructor( data: any ) {
		super(data);
		this.weight = data.weight || 100;
		this.size = data.size || 10;
	}
}