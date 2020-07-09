import React, { useState } from 'react';
import music from '../data/data.json'

export default function GenreList() {

	const { LISTA } = music

	const listAll = LISTA.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
		return (
			{
				NUMERO,
				CANTOR,
				CantorNoAccentLower: Slugify(CANTOR.toLowerCase()),
				CantorNoAccentUpper: Slugify(CANTOR.toUpperCase()),
				CantorToLower: CANTOR.toLowerCase(),
				CantorFirstUpper: toUpperFirstLetter(CANTOR),
				CantorFirstUpperNoAccent: Slugify(toUpperFirstLetter(CANTOR)),
				CantorToUpper: CANTOR.toUpperCase(),
				TITULO,
				TituloNoAccentLower: Slugify(TITULO.toLowerCase()),
				TituloNoAccentUpper: Slugify(TITULO.toUpperCase()),
				TituloToLower: TITULO.toLowerCase(),
				TituloFirstUpper: toUpperFirstLetter(TITULO),
				TituloFirstUpperNoAccent: Slugify(toUpperFirstLetter(TITULO)),
				TituloToUpper: TITULO.toUpperCase(),
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
				// TituloFirstUpper,
				// TituloNoAccentUpper,
				// TituloFirstUpperNoAccent,
				TituloNoAccentLower,
				// TituloToUpper,
				CantorToLower,
				// CantorFirstUpper,
				// CantorFirstUpperNoAccent,
				// CantorToUpper,
				CantorNoAccentLower,
				// CantorNoAccentUpper
			} = music
			return (
				(TituloToLower.includes(filteredList))
				// || (TituloFirstUpper.includes(filteredList))
				// || (TituloNoAccentUpper.includes(filteredList))
				|| (TituloNoAccentLower.includes(filteredList))
				// || (TituloFirstUpperNoAccent.includes(filteredList))
				// || (TituloToUpper.includes(filteredList))
				|| (CantorToLower.includes(filteredList))
				// || (CantorFirstUpper.includes(filteredList))
				// || (CantorToUpper.includes(filteredList))
				// || (CantorNoAccentUpper.includes(filteredList))
				|| (CantorNoAccentLower.includes(filteredList))
				// || (CantorFirstUpperNoAccent.includes(filteredList))

			)
		});

		filterMusic.length === 0 ?
			setAllMusic([{
				NUMERO: "Não encontrado",
				CANTOR: "Não encontrado",
				TITULO: "Não encontrado",
				INICIO: "Não encontrado"
			}])
			: setAllMusic(filterMusic);

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
				})}
			</div>
		</>
	)
}
