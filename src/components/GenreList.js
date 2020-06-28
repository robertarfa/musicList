import React, { useState } from 'react';
import music from '../data/data.json'
// import MusicList from './MusicList'

export default function GenreList() {

	const { LISTA } = music

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleChange = event => {
		setSearchTerm(event.target.value);
	};

	const handleFilter = () => {
		const filterMusic = LISTA.filter((music) => {
			const { TITULO, CANTOR } = music
			return (
				(TITULO.toLowerCase().includes(searchTerm))
				|| (TITULO.includes(searchTerm))
				|| (CANTOR.toLowerCase().includes(searchTerm))
				|| (CANTOR.includes(searchTerm))
			)
		});
		setSearchResults(filterMusic);
	};

	const filteredMusic = searchResults.map((musica, indice) => {
		const { NUMERO, CANTOR, TITULO, INICIO } = musica
		return (
			<div key={indice} className="container">

				<p >
					Código: {NUMERO}
				</p>
				<p>
					Cantor: {CANTOR}
				</p>
				<p>
					Título: {TITULO}
				</p>
				<p>
					Início da música: {INICIO}
				</p>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<p><a href="#">Voltar para o início da lista</a></p>
			</div>
		)
	})

	return (
		<>
			<div className="input">
				<input type="text" onChange={handleChange} value={searchTerm} />
				<input type="button" onClick={handleFilter} value="Pesquisar" />
			</div>
			<div>
				{filteredMusic.length === 0 ? LISTA.map((music, indice) => {
					const { NUMERO, CANTOR, TITULO, INICIO } = music
					return (

						<div key={indice} className="container">
							<p >
								Código: {NUMERO}
							</p>
							<p>
								Cantor: {CANTOR}
							</p>
							<p>
								Título: {TITULO}
							</p>
							<p>
								Início da música: {INICIO}
							</p>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<p><a href="#">Voltar para o início da lista</a></p>
						</div>
					)
				})
					: filteredMusic} 
			</div>
		</>
	)
}
