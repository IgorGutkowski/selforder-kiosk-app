import React from 'react';

const CategoryNavBar = ({ categories, onSelectCategory }) => {
    return (
        <div className="category-nav">
            <button onClick={() => onSelectCategory('')}>
                Wszystkie
            </button>
            {categories.map(category => (
                <button key={category._id} onClick={() => onSelectCategory(category.name)}>
                    {category.name}
                </button>
            ))}
        </div>
    );
};

export default CategoryNavBar;
