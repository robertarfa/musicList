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
			)
		});
		setSearchResults(filterMusic);
	};

	const handleCleanSearch = () => {
		setSearchResults([])
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

				<form onSubmit={handleSubmit}>
					<div>
						<label> Digite o nome do cantor ou música:</label>
						<input type="text" onChange={e => setSearchTerm(e.target.value)} />
					</div>
					<div>
						<button type="submit" onClick={handleFilter}>Pesquisar</button>
						<button type="submit" onClick={handleCleanSearch}> Limpar</button>
					</div>
				</form>

			</div>
			<div>

				{/* <div className="notFound">
					{searchTerm.length > 0 && searchTerm !== filteredMusic ? <span>Não encontrado</span> : filteredMusic === ''}
				</div> */}

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
