import React, { useState } from 'react';
import music from '../data/data.json';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function GenreList() {
    const { LISTA } = music;

    const listAll = LISTA.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
        return {
            NUMERO,
            CANTOR,
            // CantorToLower: CANTOR.toUpperCase(),
            CantorNoAccentLower: Slugify(CANTOR.toUpperCase()),
            TITULO,
            // TituloToLower: TITULO.toUpperCase(),
            TituloNoAccentLower: Slugify(TITULO.toUpperCase()),
            INICIO,
        };
    });

    const [loading, setLoading] = useState(false);
    const [allMusic, setAllMusic] = useState(listAll);
    const [filteredList, setFilteredList] = useState('');
    const [activeCheckbox, setActiveCheckbox] = useState({
        titulo: false,
        cantor: true,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleFilter = () => {
        // console.log('logs listAll', listAll[0]);
        setLoading(true);
        // setAllMusic([]);
        if (activeCheckbox.cantor) {
            setAllMusic(listAll.filter((a) => a.CantorNoAccentLower.includes(filteredList)));

            fntSetLoadFalse();
        }

        if (activeCheckbox.titulo) {
            setAllMusic(listAll.filter((a) => a.TituloNoAccentLower.includes(filteredList)));
            fntSetLoadFalse();
        }
    };

    const fntSetLoadFalse = () => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    const handleCleanSearch = () => {
        setLoading(true);
        setFilteredList('');
        setAllMusic(listAll);

        // document.getElem?entById('form').reset();
        fntSetLoadFalse();
    };

    function Slugify(str) {
        var map = {
            a: 'á|à|ã|â|À|Á|Ã|Â',
            e: 'é|è|ê|É|È|Ê',
            i: 'í|ì|î|Í|Ì|Î',
            o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            c: 'ç|Ç',
            n: 'ñ|Ñ',
        };

        str.toUpperCase();

        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        }

        return str;
    }

    const handleChange = (e) => setFilteredList(e.target.value.toUpperCase());

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Loader
                    type='Puff'
                    color='rebeccapurple'
                    height={100}
                    width={100}
                    timeout={3000} //3 secs
                />
            </div>
        );
    }

    // console.log('logs allMusic', { allMusic, loading });

    return (
        <>
            <div className='input'>
                <form onSubmit={handleSubmit} id='form'>
                    <div>
                        <label>
                            {activeCheckbox.cantor
                                ? 'Pesquisa por cantor:'
                                : 'Pesquisa por titulo:'}
                        </label>
                        <input
                            type='text'
                            id='textSubmit'
                            onChange={handleChange}
                            value={filteredList}
                        />
                    </div>
                    <div style={{ padding: '10px', margin: '10px' }}>
                        <input
                            type='radio'
                            onChange={() => {
                                setActiveCheckbox({
                                    cantor: true,
                                    titulo: false,
                                });
                                setFilteredList('');
                            }}
                            value={activeCheckbox.cantor}
                            checked={activeCheckbox.cantor}
                        />
                        <label>Pesquisar por cantor</label>

                        <input
                            type='radio'
                            onChange={() => {
                                setActiveCheckbox({
                                    cantor: false,
                                    titulo: true,
                                });
                                setFilteredList('');
                            }}
                            value={activeCheckbox.titulo}
                            checked={activeCheckbox.titulo}
                        />
                        <label>Pesquisar por titulo</label>
                    </div>
                    <div className='button'>
                        <button type='submit' onClick={handleFilter}>
                            Pesquisar
                        </button>
                        <button type='submit' onClick={handleCleanSearch}>
                            Limpar
                        </button>
                    </div>
                </form>
            </div>

            <div className='span-number'>
                Quantidade de músicas disponíveis: <strong>{allMusic.length}</strong>
            </div>

            <div>
                {
                    allMusic &&
                        allMusic.map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
                            return (
                                <div key={NUMERO} className='container'>
                                    <p>Código: {NUMERO}</p>
                                    <p>Cantor: {CANTOR}</p>
                                    <p>Título: {TITULO}</p>
                                    <p>Início da música: {INICIO}</p>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <p>
                                        <a href='#'>Voltar para o início da lista</a>
                                    </p>
                                </div>
                            );
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
    );
}
