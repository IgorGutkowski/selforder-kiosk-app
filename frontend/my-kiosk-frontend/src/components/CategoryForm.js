// src/components/CategoryForm.js
import React from 'react';
import { Formik, Form, Field } from 'formik';

const CategoryForm = ({ onSubmit, initialData = {} }) => {
    return (
        <Formik
            initialValues={{ name: initialData.name || '' }}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);
                resetForm();
            }}
            enableReinitialize
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field name="name" placeholder="Category Name" required />
                    <button type="submit" disabled={isSubmitting}>
                        {initialData._id ? 'Update' : 'Add'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default CategoryForm;
