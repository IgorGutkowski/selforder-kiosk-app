// CategoryForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const CategoryForm = ({ onSubmit, initialData = {}, setEditingCategory }) => {
    return (
        <div className="max-w-lg mx-auto my-10 p-5 border border-gray-200 rounded shadow">
            <Formik
                initialValues={{ name: initialData.name || '' }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    onSubmit(values);
                    setSubmitting(false);
                    if (!initialData._id) {
                        resetForm();
                    }
                }}
                enableReinitialize
            >
                {({ isSubmitting, resetForm }) => (
                    <Form className="space-y-4">
                        <div className="form-field">
                            <Field name="name" placeholder="Nazwa kategorii" required className="form-input mt-1 block w-full border py-2 px-3 shadow rounded" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:bg-blue-600 transition ease-in-out duration-300">
                                {initialData._id ? 'Zaktualizuj' : 'Dodaj'}
                            </button>
                            {initialData._id && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingCategory(null);
                                        resetForm();
                                    }}
                                    className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-2 rounded shadow hover:bg-red-600 transition ease-in-out duration-300"
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

export default CategoryForm;
