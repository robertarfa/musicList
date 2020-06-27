import React, {useState} from 'react'

export default function MusicList(props) {

	const { musicGenre, title } = props

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const allMusic = musicGenre.map((musica) => {
	 	const { NUMERO, CANTOR, TITULO, INICIO  } = musica
	 	return (
	 		NUMERO, CANTOR, TITULO, INICIO 
	 	)
	})

	
	const handleChange = event => {
	 	setSearchTerm(event.target.value);
	 };

	// useEffect(() => {
	// 	const filterMusic = allMusic.filter(music =>
	// 		music.toLowerCase().includes(searchTerm)
	// 	)
	// 	setSearchResults(filterMusic)
	// }, [searchTerm, allMusic])
  const handleFilter = () => {
    const filterMusic = musicGenre.filter((music) =>
      music.TITULO.toLowerCase().includes(searchTerm)
                                        ||  music.TITULO.includes(searchTerm) 
					//&&
					//music.CANTOR.toLowerCase().includes(searchTerm)
                                        //||  music.CANTOR.includes(searchTerm)
    );
    setSearchResults(filterMusic);
   };
	
	const filteredMusic = searchResults.map((musica, indice) => {
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
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<p><a href="#">Voltar para o início da lista</a></p>
					</div>
				)
			})

	return (
		<>
	 <input type="text" onChange={handleChange} value={searchTerm} />
      <input type="button" onClick={handleFilter} value="Pesquisar" />

			{filteredMusic.length === 0 ? musicGenre.map((musica, indice) => {
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
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<p><a href="#">Voltar para o início da lista</a></p>
					</div>
				)
			}) : filteredMusic}
		</>
	)
}
