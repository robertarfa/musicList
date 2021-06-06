/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import music from '../data/data.json';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

export default function GenreList() {
    const { LISTA } = music;

    const listAll = LISTA.sort(function (a, b) {
        return a.CANTOR < b.CANTOR ? -1 : a.CANTOR > b.CANTOR ? 1 : 0;
    }).map(({ NUMERO, CANTOR, TITULO, INICIO }) => {
        return {
            NUMERO,
            CANTOR,
            // CantorToLower: CANTOR.toLowerCase(),
            CantorNoAccentLower: slugify(CANTOR.toLowerCase()),
            TITULO,
            // TituloToLower: TITULO.toLowerCase(),
            TituloNoAccentLower: slugify(TITULO.toLowerCase()),
            INICIO,
        };
    });

    const [loading, setLoading] = useState(false);
    const [allMusic, setAllMusic] = useState(listAll);
    const [filteredList, setFilteredList] = useState('');
    // const [firstLetter, setFirstLetter] = useState();
    const [activeCheckbox, setActiveCheckbox] = useState({
        titulo: false,
        cantor: true,
        firstLetter: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleFilter = () => {
        setLoading(true);
        // setAllMusic([]);
        if (activeCheckbox.cantor) {
            setAllMusic(listAll.filter((a) => a.CantorNoAccentLower.includes(filteredList.trim())));

            fntSetLoadFalse();
        }

        if (activeCheckbox.titulo) {
            setAllMusic(listAll.filter((a) => a.TituloNoAccentLower.includes(filteredList.trim())));
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

    function slugify(str) {
        var map = {
            a: 'á|à|ã|â|À|Á|Ã|Â',
            e: 'é|è|ê|É|È|Ê',
            i: 'í|ì|î|Í|Ì|Î',
            o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
            u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
            c: 'ç|Ç',
            n: 'ñ|Ñ',
        };

        str.toLowerCase();

        for (var pattern in map) {
            str = str.replace(new RegExp(map[pattern], 'g'), pattern);
        }

        return str;
    }

    const handleChange = (e) => setFilteredList(slugify(e.target.value.toLowerCase()));

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

    const fcArrayOfLetters = () => {
        const fntAllClick = () => {
            setLoading(true);
            setFilteredList('');
            setAllMusic(listAll);
            setActiveCheckbox((prev) => ({
                ...prev,
                cantor: true,
                firstLetter: false,
            }));
            fntSetLoadFalse();
        };
        const letters = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ];

        return (
            <>
                <div
                    style={{
                        margin: '10px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    }}
                >
                    {letters &&
                        letters.map((a, index) => (
                            <button
                                key={a}
                                style={{
                                    margin: '10px',
                                    padding: '5px 10px',
                                    boxShadow: '3px 3px 5px purple',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                                onClick={() => fntFindFirstLetter(letters[index])}
                            >
                                <a href='#' key={a}>
                                    {a?.toUpperCase()}
                                </a>
                            </button>
                        ))}
                </div>
                <button
                    style={{
                        margin: '10px',
                        padding: '5px 10px',
                        boxShadow: '3px 3px 5px purple',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '95%',
                    }}
                    onClick={() => fntAllClick()}
                >
                    TODOS OS CANTORES
                </button>
            </>
        );
    };

    const fntFindFirstLetter = (letter) => {
        // setFirstLetter(letter);

        // setAllMusic(listAll.filter((a) => a.CantorNoAccentLower.charAt(0) === letter));

        setLoading(true);

        setAllMusic(listAll.filter((a) => a.CantorNoAccentLower.charAt(0) === letter));
        fntSetLoadFalse();
    };

    // console.log('logs allMusic', { filteredList, allMusic });

    return (
        <>
            <div className='input'>
                <form onSubmit={handleSubmit} id='form'>
                    {!activeCheckbox.firstLetter && (
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
                                value={filteredList?.toUpperCase()}
                            />
                        </div>
                    )}
                    <div>{activeCheckbox.firstLetter && fcArrayOfLetters()}</div>

                    <div style={{ padding: '10px', margin: '10px', textAlign: 'center' }}>
                        <div style={{ padding: '10px', margin: '10px' }}>
                            <input
                                type='radio'
                                onChange={() => {
                                    setActiveCheckbox({
                                        cantor: true,
                                        titulo: false,
                                        firstLetter: false,
                                    });
                                    // setFilteredList('');
                                }}
                                value={activeCheckbox.cantor}
                                checked={activeCheckbox.cantor}
                            />
                            <label>Pesquisar por cantor</label>
                        </div>

                        <div style={{ padding: '10px', margin: '10px' }}>
                            <input
                                type='radio'
                                onChange={() => {
                                    setActiveCheckbox({
                                        cantor: false,
                                        titulo: true,
                                        firstLetter: false,
                                    });
                                    // setFilteredList('');
                                }}
                                value={activeCheckbox.titulo}
                                checked={activeCheckbox.titulo}
                            />
                            <label>Pesquisar por titulo</label>
                        </div>

                        <div style={{ padding: '10px', margin: '10px' }}>
                            <input
                                type='radio'
                                onChange={() => {
                                    setActiveCheckbox({
                                        cantor: false,
                                        titulo: false,
                                        firstLetter: true,
                                    });
                                    // setFilteredList('');
                                }}
                                value={activeCheckbox.firstLetter}
                                checked={activeCheckbox.firstLetter}
                            />
                            <label>Pesquisar pela primeira letra do nome do cantor</label>
                        </div>
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
