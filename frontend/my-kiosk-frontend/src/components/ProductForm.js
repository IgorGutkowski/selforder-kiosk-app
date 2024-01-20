// src/components/ProductForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const ProductForm = ({ onSubmit, initialData = {}, categories }) => {
    return (
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
                if (!initialData._id) { // Only reset form if adding a new product, not updating
                    resetForm();
                }
            }}
            enableReinitialize
        >
            {({ values, isSubmitting, setFieldValue }) => (
                <Form>
                    <Field name="name" placeholder="Product Name" required />
                    <Field name="price" placeholder="Price" type="number" required />
                    <Field name="category" as="select">
                        <option value="">Select Category</option>
                        {categories.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </Field>
                    <Field name="image" placeholder="Image URL" />
                    <div>
                        Ingredients:
                        {values.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                <Field name={`ingredients[${index}]`} />
                                <button type="button" onClick={() => setFieldValue('ingredients', values.ingredients.filter((_, i) => i !== index))}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setFieldValue('ingredients', [...values.ingredients, ''])}>
                            Add Ingredient
                        </button>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {initialData._id ? 'Update' : 'Add'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ProductForm;
