import React from 'react';
import './App.css';
import GenreList from './components/GenreList';

export default function App() {
    return (
        <div>
            <h1 className='principalTitle'>Lista de músicas</h1>

            <GenreList />
        </div>
    );
}
