import React from 'react';
import music from '../data/musicas.json'
import MusicList from './MusicList'

export default function GenreList() {

	const { Nacionais, Internacionais, Japonesas, Italianas, Evangélicas, Infantil } = music


	return (
		<div>

			<h1 className="title">Lista de Músicas Karaoke</h1>

			<MusicList musicGenre={Nacionais} title={"Nacionais"} />
			<MusicList musicGenre={Internacionais} title={"Internacionais"} />
			<MusicList musicGenre={Japonesas} title={"Japonesas"} />
			<MusicList musicGenre={Italianas} title={"Italianas"} />
			<MusicList musicGenre={Evangélicas} title={"Evangélicas"} />
			<MusicList musicGenre={Infantil} title={"Infantil"} />

		</div>
	);
}


