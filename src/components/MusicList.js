import React, { useEffect, useState } from 'react'

export default function MusicList(props) {

	const { musicGenre, title } = props

	const allMusic = musicGenre.map((musica) => {
		const { CANTOR, TITULO } = musica
		return (
			CANTOR, TITULO
		)
	})

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleChange = event => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		const filterMusic = allMusic.filter(music =>
			music.toLowerCase().includes(searchTerm)
		)
		setSearchResults(filterMusic)
	}, [searchTerm, allMusic])


	return (
		<>
			<input
				type="text"
				className="input"
				value={searchTerm}
				onChange={handleChange}
			/>

			{searchResults.map((musica, indice) => {
				const { NUMERO, CANTOR, TITULO, INICIO } = musica
				return (
					<div key={indice} className="container">
						<p>{title}</p>
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
					</div>
				)
			})}
		</>
	)
}
