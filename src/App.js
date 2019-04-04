import React, { Component } from "react";
import Game from "./Game";

const createArray = function(length) {
	return new Array(length).fill(0);
};

const generateBoard = function(rows, columns) {
	return createArray(rows, rows).map(x => createArray(columns));
};

class App extends Component {
	constructor(props) {
		super(props);
		this.bounds = props.bounds;
		this.grid = generateBoard(this.bounds[0], this.bounds[1]);
		this.state = { liveCells: [] };
		this.handleClick = this.handleClick.bind(this);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
	}

	isAlive(cell) {
		return this.state.liveCells.some(([row, col]) => {
			return row === cell[0] && col === cell[1];
		});
	}

	handleClick(event) {
		const [rowId, columnId] = event.target.id.split("-");
		this.state.liveCells.push([+rowId, +columnId]);
		this.setState({ liveCells: this.state.liveCells });
	}

	start() {
		this.game = new Game(this.bounds, this.state.liveCells);
		this.intervalId = setInterval(() => {
			this.setState({ liveCells: this.game.nextGeneration() });
		}, 1000);
	}

	stop() {
		clearInterval(this.intervalId);
	}

	generateBoard() {
		const rows = this.grid.map((row, rowId) => {
			const columns = row.map((cell, columnId) => {
				let className = "dead-cell";
				if (this.isAlive([rowId, columnId])) {
					className = "live-cell";
				}
				const id = rowId + "-" + columnId;
				return <td id={id} className={className} />;
			});
			return (
				<tbody>
					<tr>{columns}</tr>
				</tbody>
			);
		});
		return <table onClick={this.handleClick}>{rows}</table>;
	}

	render() {
		return (
			<main>
				{this.generateBoard()}
				<section>
					<button onClick={this.start}>Start</button>
					<button onClick={this.stop}>Stop</button>
				</section>
			</main>
		);
	}
}

export default App;
