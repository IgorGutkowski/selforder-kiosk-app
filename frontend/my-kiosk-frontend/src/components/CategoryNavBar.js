import React from 'react';

const CategoryNavBar = ({ categories, onSelectCategory }) => {

    return (
        <div className="p-2 border-r border-gray-200 overflow-y-auto">
            <button onClick={() => onSelectCategory('')} className="bg-yellow-500 text-black font-bold uppercase text-base px-4 py-2 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300 mb-2 w-full text-left">Wszystkie</button>
            {categories.map(category => (
                <button key={category._id} onClick={() => onSelectCategory(category.name)} className="bg-yellow-500 text-black font-bold uppercase text-base px-4 py-2 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300 mb-2 w-full text-left">
                    {category.name}
                </button>
            ))}
        </div>
    );

};

export default CategoryNavBar;
