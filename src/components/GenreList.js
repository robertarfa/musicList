import React, { useState } from 'react';
import music from '../data/data.json'
// import MusicList from './MusicList'

export default function GenreList() {

	const { LISTA } = music

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	const handleFilter = () => {
		const filterMusic = LISTA.filter((music) => {
			const { TITULO, CANTOR } = music
			return (
				(TITULO.toLowerCase().includes(searchTerm))
				|| (TITULO.includes(searchTerm))
				|| (CANTOR.includes(searchTerm))
				|| (CANTOR.toLowerCase().includes(searchTerm))
|| (CANTOR.toUpperCase().includes(searchTerm))
||(TITULO.toUpperCase().includes(searchTerm))
			)
		});

		filterMusic.length === 0 ?
			setSearchResults([{
				NUMERO: "Não encontrado",
				CANTOR: "Não encontrado",
				TITULO: "Não encontrado",
				INICIO: "Não encontrado"
			}])
			: setSearchResults(filterMusic);


		document.getElementById("form").reset();
	};

	const handleCleanSearch = () => {
		setSearchResults([])
		document.getElementById("form").reset();
	}

	const filteredMusic = searchResults.map((music, indice) => {
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


	return (
		<>
			<div className="input" >

				<form onSubmit={handleSubmit} id="form">
					<div>
						<label> Digite o nome do cantor ou música:</label>
						<input type="text" id="textSubmit" onChange={e => setSearchTerm(e.target.value)} />
					</div>
					<div className="button">
						<button type="submit" onClick={handleFilter}>Pesquisar</button>
						<button type="submit" onClick={handleCleanSearch}> Limpar</button>
					</div>
				</form>
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
