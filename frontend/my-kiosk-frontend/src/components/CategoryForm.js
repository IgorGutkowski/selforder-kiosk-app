// CategoryForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const CategoryForm = ({ onSubmit, initialData = {}, setEditingCategory }) => {
    return (
        <div className="form-container">
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
                    <Form>
                        <div className="form-field">
                            <Field name="name" placeholder="Category Name" required />
                        </div>
                        <div className="form-field">
                            <button type="submit" disabled={isSubmitting} className="edit">
                                {initialData._id ? 'Update' : 'Add'}
                            </button>
                            {initialData._id && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingCategory(null);
                                        resetForm();
                                    }}
                                    className="admin-button delete"
                                >
                                    Cancel
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
