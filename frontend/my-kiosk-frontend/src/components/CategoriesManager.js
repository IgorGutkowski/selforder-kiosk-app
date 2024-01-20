// src/components/CategoriesManager.js
import React, { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);

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
                    'Admin-Secret-Key': 'admin', // Replace with actual admin key
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                fetchCategories();
                setEditingCategory(null); // Clear editing state
            } else {
                console.error('Failed to submit category');
            }
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/admin/categories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Admin-Secret-Key': 'admin', // Replace with actual admin key
                },
            });

            if (response.ok) {
                fetchCategories(); // Refresh the list
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <h2>Manage Categories</h2>
            <CategoryForm
                onSubmit={addOrUpdateCategory}
                initialData={editingCategory || {}}
                resetAfterSubmit={!editingCategory}
            />
            {categories.map((category) => (
                <div key={category._id}>
                    {category.name}
                    <button onClick={() => setEditingCategory(category)}>Edit</button>
                    <button onClick={() => deleteCategory(category._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default CategoriesManager;
