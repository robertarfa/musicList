const fs = require('fs')
const musics = require('../data/data.json')

const listAll = musics.LISTA.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
	return (
		{
			NUMERO,
			CANTOR,
			TITULO,
			INICIO,
		}
	)
})

function WriteJson(listAll) {
	listAll.forEach((music) => {
		fs.writeFile(
			`../data/${music.CANTOR}.json`,
			JSON.stringify(music),
			function (err) {
				if (err) {
					console.log(err)
				}
			}
		)
	})
}

function readStateJson(CANTOR) {
	fs.readFile(`../data/${CANTOR}.json`, function (err, data) {
		if (err) {
			console.log(err)
		}

		console.log(`${CANTOR}${TITULO}`)
	})
}

readStateJson('5 a Seco - Maria Gadú')