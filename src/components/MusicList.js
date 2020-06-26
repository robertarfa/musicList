import React from 'react'

export default function MusicList(props) {

	const { musicGenre, title } = props

	const musicList = musicGenre.map((musica, indice) => {
		const { NUMERO, CANTOR, TITULO, INICIO } = musica
		return (
			<tr key={indice}>
				<td >
					{NUMERO}
				</td>
				<td>
					{CANTOR}
				</td>
				<td>
					{TITULO}
				</td>
				<td>
					{INICIO}
				</td>
				<td>{title}</td>
			</tr>
		)
	})


	return (
		<>

			<tr>
				<th>Número</th>
				<th>Cantor</th>
				<th>Título</th>
				<th>Ínicio da Letra</th>
				<th>{title}</th>
			</tr>
			{musicList}
		</>
	)
}
