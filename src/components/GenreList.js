import React, { useState } from 'react';
import music from '../data/data.json'

export default function GenreList() {

	const { LISTA } = music

	const listAll = LISTA.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
		return (
			{
				NUMERO,
				CANTOR,
				CantorToLower: CANTOR.toLowerCase(),
				CantorNoAccentLower: Slugify(CANTOR.toLowerCase()),
				TITULO,
				TituloToLower: TITULO.toLowerCase(),
				TituloNoAccentLower: Slugify(TITULO.toLowerCase()),
				INICIO,
			}
		)
	})

	const [allMusic, setAllMusic] = useState(listAll)
	const [filteredList, setFilteredList] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
	}

	const handleFilter = () => {
		const filterMusic = listAll.filter((music) => {
			const {
				TituloToLower,
				TituloNoAccentLower,
				CantorToLower,
				CantorNoAccentLower,

			} = music
			return (
				(TituloToLower.includes(filteredList))
				|| (TituloNoAccentLower.includes(filteredList))
				|| (CantorToLower.includes(filteredList))
				|| (CantorNoAccentLower.includes(filteredList))
			)
		});

		setAllMusic(filterMusic);

	};

	const handleCleanSearch = () => {
		setAllMusic(listAll)
		document.getElementById("form").reset();
	}

	function Slugify(str) {
		var map = {
			'a': 'á|à|ã|â|À|Á|Ã|Â',
			'e': 'é|è|ê|É|È|Ê',
			'i': 'í|ì|î|Í|Ì|Î',
			'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
			'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
			'c': 'ç|Ç',
			'n': 'ñ|Ñ'
		};

		str.toUpperCase()

		for (var pattern in map) {
			str = str.replace(new RegExp(map[pattern], 'g'), pattern);
		};

		return str;
	}

	function toUpperFirstLetter(str) {

		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	const handleChange = (e) => setFilteredList(e.target.value.toLowerCase())

	return (
		<>
			<div className="input" >

				<form onSubmit={handleSubmit} id="form">
					<div>
						<label> Digite o nome do cantor ou música:</label>
						<input type="text" id="textSubmit" onBlur={handleChange} />
					</div>
					<div className="button">
						<button type="submit" onClick={handleFilter}>Pesquisar</button>
						<button type="submit" onClick={handleCleanSearch}> Limpar</button>
					</div>
				</form>

			</div>

			<div className="span-number">
				Quantidade de músicas disponíveis: <strong>{allMusic.length}</strong>
			</div>

			<div>
				{allMusic.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
					return (
						<div key={NUMERO} className="container">
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
					// 	.sort((a, b) => {
					// 	console.log(a)
					// 	console.log(b)
					// 	// return a.CANTOR.localeCompare(b.CANTOR) //ordem alfabética
					// 	//return a.name.length - b.name.length //pelo tamanho do nome
					// })
				}
			</div>
		</>
	)
}
