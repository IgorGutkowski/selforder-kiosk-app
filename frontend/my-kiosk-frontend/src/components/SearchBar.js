// components/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResult }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        axios.get(`http://localhost:3001/api/products/search/${searchTerm}`)
            .then(response => {
                onSearchResult(response.data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
        setSearchTerm('');
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Wyszukaj produkt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded p-2"
            />
            <button onClick={handleSearch} className="bg-amber-900 text-white font-bold uppercase ml-2 text-sm px-4 py-2 rounded shadow hover:bg-amber-950 transition ease-in-out duration-300">Szukaj</button>
        </div>

    );
};

export default SearchBar;
