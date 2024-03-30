"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import players from "../players.js";

const SpreadedCards = ({ players }) => {
	const randomPlayers = getRandomPlayers(players);
	return (
		<div className={styles.spread}>
			{randomPlayers.map((player) => (
				<Card
					key={player.id}
					name={player.name}
					power={player.power}
					className={"spreadedCard"}
				/>
			))}
		</div>
	);
};

const StackedCards = ({ players, handleSpread }) => {
	return (
		<div className={styles.stack}>
			{players.map((player) => (
				<Card
					key={player.id}
					id={player.id}
					name={player.name}
					power={player.power}
					handleSpread={handleSpread}
					className={"stackedCard"}
				/>
			))}
		</div>
	);
};

const Card = ({ id, name, power, handleSpread, className }) => {
	const [spreading, setSpreading] = useState(false);

	const handleClick = () => {
		if (!handleSpread) return;

		setSpreading(true);

		setTimeout(() => {
			handleSpread(id);
		}, 500);
	};
	return (
		<div
			className={`${styles[className]} ${spreading ? styles.spreading : ""}`}
			onClick={handleClick}
			id={id}
		>
			<p>{name}</p>
			<p>{power}</p>
		</div>
	);
};

export default function Home() {
	const [stackedPlayers, setStackedPlayers] = useState([]);
	const [spreadedPlayers, setSpreadedPlayers] = useState([]);

	console.log("stackedPlayers:", stackedPlayers);
	console.log("spreadedPlayers:", spreadedPlayers);

	useEffect(() => {
		setStackedPlayers(getRandomPlayers(players));
	}, []);

	const spreadCards = (id) => {
		const clickedPlayer = stackedPlayers.find((player) => player.id == id);
		setSpreadedPlayers((prev) => [...prev, clickedPlayer]);
		setStackedPlayers((prev) => prev.filter((player) => player.id != id));
	};

	return (
		<main className={styles.main}>
			<SpreadedCards players={spreadedPlayers} />
			{stackedPlayers.length > 0 && (
				<StackedCards
					players={stackedPlayers}
					handleSpread={spreadCards}
				/>
			)}
		</main>
	);
}

function getRandomPlayers(players) {
	const playersToShuffle = players.slice();
	shuffle(playersToShuffle);
	return playersToShuffle.slice(0, 5);
}

function shuffle(array) {
	let len = array.length,
		currentIndex;
	for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
		let randIndex = Math.floor(Math.random() * (currentIndex + 1));
		var temp = array[currentIndex];
		array[currentIndex] = array[randIndex];
		array[randIndex] = temp;
	}
}
