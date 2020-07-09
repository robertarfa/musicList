import React from 'react'
import fs from 'fs'

export default function ReadSingers() {

	function readStateJson(CANTOR) {
		fs.readFile(`../data/${CANTOR}.json`, function (err, data) {
			if (err) {
				console.log(err)
			}

			console.log(`${CANTOR}${TITULO}`)
		})
	}

	readStateJson('5 a Seco - Maria Gadú')


	return (
		<div>

		</div>
	)
}
