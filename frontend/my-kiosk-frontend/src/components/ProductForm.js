// ProductForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const ProductForm = ({ onSubmit, initialData = {}, categories }) => {
    return (
        <div className="form-container">
            <h2>{initialData._id ? 'Edytuj Produkt' : 'Dodaj Produkt'}</h2>
            <Formik
                initialValues={{
                    name: initialData.name || '',
                    price: initialData.price || '',
                    category: initialData.category || '',
                    ingredients: initialData.ingredients || [],
                    image: initialData.image || '',
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    onSubmit(values);
                    setSubmitting(false);
                    if (!initialData._id) {
                        resetForm();
                    }
                }}
                enableReinitialize
            >
                {({ values, isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="form-field">
                            <Field name="name" placeholder="Product Name" required />
                        </div>
                        <div className="form-field">
                            <Field name="price" placeholder="Price" type="number" required />
                        </div>
                        <div className="form-field">
                            <Field name="category" as="select" required>
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c.name}>{c.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-field">
                            <Field name="image" placeholder="Image URL" />
                        </div>
                        <div className="ingredient-list">
                            {values.ingredients.map((ingredient, index) => (
                                <div key={index} className="ingredient-item">
                                    <Field name={`ingredients[${index}]`} />
                                    <button
                                        type="button"
                                        className="ingredient-remove-btn"
                                        onClick={() => setFieldValue('ingredients', values.ingredients.filter((_, i) => i !== index))}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="form-field">
                            <button className="button edit" type="button" onClick={() => setFieldValue('ingredients', [...values.ingredients, ''])}>
                                Add Ingredient
                            </button>
                        </div>
                        <div className="form-field">
                            <button className="button edit"type="submit" disabled={isSubmitting}>
                                {initialData._id ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductForm;
