const createArray = function(length, filler) {
	return new Array(length).fill(filler);
};

const generateWorld = function(rows, columns) {
	const grid = createArray(rows, rows).map(x => createArray(columns, 0));
	const world = [];
	grid.forEach((row, rowId) =>
		row.forEach((column, columnId) => world.push([rowId, columnId]))
	);
	return world;
};

const zipper = function(column) {
	return function(result, row) {
		for (let element of column) {
			result.push([row, element]);
		}
		return result;
	};
};

class Game {
	constructor(bounds, liveCells) {
		this.bounds = bounds;
		this.world = generateWorld(this.bounds[0], this.bounds[1]);
		this.liveCells = liveCells;
	}

	isAlive(cell) {
		return this.liveCells.some(([row, col]) => {
			return row === cell[0] && col === cell[1];
		});
	}

	validateNeighbour(neighbour) {
		return neighbour.every(index => index >= 0 && index <= this.bounds[0] - 1);
	}

	extractNeighbours(cell) {
		let row = [cell[0] - 1, cell[0], cell[0] + 1];
		let column = [cell[1] - 1, cell[1], cell[1] + 1];
		let zip = zipper(column);
		let allNeighbours = row.reduce(zip, []);
		allNeighbours.splice(4, 1);
		return allNeighbours.filter(neighbour => this.validateNeighbour(neighbour));
	}

	countAliveNeighbours(cell) {
		const neighbours = this.extractNeighbours(cell);
		return neighbours.filter(neighbour => this.isAlive(neighbour)).length;
	}

	varifyRules(isAlive, aliveNeighbours) {
		let rule2 = (isAlive && aliveNeighbours === 2) || aliveNeighbours === 3;
		let rule3 = !isAlive && aliveNeighbours === 3;

		return rule2 || rule3;
	}

	nextGeneration() {
		this.liveCells = this.world.filter(cell => {
			const isAlive = this.isAlive(cell);
			const aliveNeighbours = this.countAliveNeighbours(cell);
			return this.varifyRules(isAlive, aliveNeighbours);
		});
		return this.liveCells;
	}
}

export default Game;
// module.exports = { Game };
