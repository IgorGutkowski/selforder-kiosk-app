import React from 'react';
import { Formik, Form, Field } from 'formik';

const ProductForm = ({ onSubmit, initialData = {}, categories, setEditingProduct }) => {
    return (
        <div className="max-w-lg mx-auto my-10 p-5 border border-gray-200 rounded shadow bg-white">
            <h2 className="text-xl font-semibold mb-6">{initialData._id ? 'Edytuj Produkt' : 'Dodaj Produkt'}</h2>
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
                {({ values, isSubmitting, setFieldValue, resetForm }) => (
                    <Form className="space-y-4">
                        <div className="form-field">
                            <Field name="name" placeholder="Nazwa produktu" required className="form-input mt-1 block w-full border py-2 px-3 shadow rounded" />
                        </div>
                        <div className="form-field">
                            <Field name="price" placeholder="Cena" type="number" required className="form-input mt-1 block w-full border py-2 px-3 shadow rounded" />
                        </div>
                        <div className="form-field">
                            <Field name="category" as="select" required className="form-select mt-1 block w-full border py-2 px-3 shadow rounded">
                                <option value="">Wybierz kategorię</option>
                                {categories.map((c) => (
                                    <option key={c._id} value={c.name}>{c.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-field">
                            <Field name="image" placeholder="Image URL" className="form-input mt-1 block w-full border py-2 px-3 shadow rounded" />
                        </div>
                        <div className="ingredient-list space-y-2">
                            {values.ingredients.map((ingredient, index) => (
                                <div key={index} className="ingredient-item flex items-center space-x-2">
                                    <Field name={`ingredients[${index}]`} className="form-input mt-1 block flex-1 border py-2 px-3 shadow rounded" />
                                    <button
                                        type="button"
                                        className="ingredient-remove-btn bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                        onClick={() => setFieldValue('ingredients', values.ingredients.filter((_, i) => i !== index))}
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="form-field">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" type="button" onClick={() => setFieldValue('ingredients', [...values.ingredients, ''])}>
                                Dodaj składnik
                            </button>
                        </div>
                        <div className="form-field">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit" disabled={isSubmitting}>
                                {initialData._id ? 'Zaktualizuj' : 'Dodaj'}
                            </button>
                            {initialData._id && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingProduct(null);
                                        resetForm();
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                                >
                                    Anuluj
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProductForm;
