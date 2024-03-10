import React, {useContext, useEffect, useState} from 'react';
import CategoryForm from './CategoryForm';
import { useCategoryChange } from '../context/CategoryChangeContext';
import { AdminContext } from '../context/AdminContext';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const { triggerCategoryChange } = useCategoryChange();
    const { state } = useContext(AdminContext);
    const adminKey = state.adminKey;


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/categories');
            if (!response.ok) {
                throw new Error('Error fetching categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const addOrUpdateCategory = async (category) => {
        const method = editingCategory ? 'PUT' : 'POST';
        const id = editingCategory ? editingCategory._id : '';
        const url = `http://localhost:3001/api/admin/categories/${id}`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Admin-Secret-Key': adminKey,
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                fetchCategories();
                setEditingCategory(null);
                triggerCategoryChange();

            } else {
                console.error('Failed to submit category');
            }
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    const deleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/admin/categories/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Admin-Secret-Key': adminKey,
                    },
                });

                if (response.ok) {
                    fetchCategories();
                    triggerCategoryChange();
                } else {
                    console.error('Failed to delete category');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };



    return (
        <div className="admin-container p-5">
            <h2 className="admin-title text-2xl font-semibold mb-4">Zarządzaj kategoriami</h2>
            <CategoryForm
                onSubmit={addOrUpdateCategory}
                initialData={editingCategory || {}}
                setEditingCategory={setEditingCategory}
            />
            <ul className="admin-list mt-4">
                {categories.map((category) => (
                    <li key={category._id} className="admin-list-item bg-white p-4 rounded shadow mb-4">
                        {category.name}
                        <div className="flex justify-between">
                            <button className="edit bg-yellow-500 text-white font-bold uppercase text-sm px-3 py-1 rounded shadow hover:bg-yellow-600 transition ease-in-out duration-300" onClick={() => setEditingCategory(category)}>Edytuj</button>
                            <button className="delete bg-red-500 text-white font-bold uppercase text-sm px-3 py-1 rounded shadow hover:bg-red-600 transition ease-in-out duration-300" onClick={() => deleteCategory(category._id)}>Usuń</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default CategoriesManager;
