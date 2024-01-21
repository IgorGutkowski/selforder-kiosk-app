import { createContext, useState, useContext } from 'react';

const CategoryChangeContext = createContext();

export const useCategoryChange = () => useContext(CategoryChangeContext);

export const CategoryChangeProvider = ({ children }) => {
    const [categoryChangeTrigger, setCategoryChangeTrigger] = useState(0);

    const triggerCategoryChange = () => {
        setCategoryChangeTrigger(prev => prev + 1);
    };

    return (
        <CategoryChangeContext.Provider value={{ triggerCategoryChange }}>
            {children}
        </CategoryChangeContext.Provider>
    );
};
