const { assert } = require("chai");

const { Game } = require("../src/Game");

describe("game", function() {
	const game = new Game([4, 4], [[1, 2], [2, 2], [3, 2]]);

	describe("isAlive", function() {
		it("should return true for alive cell", function() {
			assert.equal(true, game.isAlive([2, 2]));
		});

		it("should return false for alive cell", function() {
			assert.equal(false, game.isAlive([3, 3]));
		});
	});

	describe("extractNeighbours", function() {
		it("it should return neighbour of given cell", function() {
			const expected = [
				[1, 1],
				[1, 2],
				[1, 3],
				[2, 1],
				[2, 3],
				[3, 1],
				[3, 2],
				[3, 3]
			];
			assert.deepEqual(expected, game.extractNeighbours([2, 2]));
		});
	});

	describe("validateNeighbour", function() {
		it("should return true if the neighbour cell lies within the bounds", function() {
			assert.equal(true, game.validateNeighbour([2, 1]));
		});

		it("should return false if the neighbour cell does not lie within the bounds", function() {
			assert.equal(false, game.validateNeighbour([1, 4]));
		});
	});

	describe("countAliveNeighbours", function() {
		it("should return number of live neigbours", function() {
			assert.equal(2, game.countAliveNeighbours([2, 2]));
		});
	});

	describe("nextGeneration", function() {
		it("should return next generation", function() {
			const expected = [[2, 1], [2, 2], [2, 3]];
			assert.deepEqual(expected, game.nextGeneration());
		});
	});

	describe("varifyRules", function() {
		it("should return true if the cell is alive and it has 2 or 3 alive neighbours", function() {
			assert.equal(true, game.varifyRules(true, 2));
			assert.equal(true, game.varifyRules(true, 3));
		});

		it("should return false if the cell is alive and it has less than 1 alive neighbours", function() {
			assert.equal(false, game.varifyRules(true, 0));
			assert.equal(false, game.varifyRules(true, 1));
		});

		it("should return false if the cell is alive and it has more than 3 alive neighbours", function() {
			assert.equal(false, game.varifyRules(true, 4));
		});

		it("should return true if the cell is dead and it has exactly 3 alive neighbours", function() {
			assert.equal(true, game.varifyRules(false, 3));
		});
	});
});
