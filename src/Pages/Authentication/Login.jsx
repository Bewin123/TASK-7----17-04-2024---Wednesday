import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css'; // Import custom CSS for styling

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const bookValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.string().required('ISBN is required'),
    publicationDate: Yup.date().required('Publication Date is required'),
  });

  const authorValidationSchema = Yup.object().shape({
    name: Yup.string().required('Author Name is required'),
    birthDate: Yup.date().required('Birth Date is required'),
    biography: Yup.string().required('Biography is required'),
  });

  const handleBookSubmit = (values, actions) => {
    const updatedBooks = [...books, values];
    setBooks(updatedBooks);
    actions.resetForm();
  };

  const handleAuthorSubmit = (values, actions) => {
    const updatedAuthors = [...authors, values];
    setAuthors(updatedAuthors);
    actions.resetForm();
  };

  const handleDeleteBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleDeleteAuthor = (index) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  return (
    <div className="admin-dashboard">
      <div className="content-box">
        <h2>Book Management</h2>
        <Formik
          initialValues={{ title: '', author: '', isbn: '', publicationDate: '' }}
          validationSchema={bookValidationSchema}
          onSubmit={handleBookSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="title" placeholder="Title" />
              <ErrorMessage name="title" component="div" className="error-message" />

              <Field type="text" name="author" placeholder="Author" />
              <ErrorMessage name="author" component="div" className="error-message" />

              <Field type="text" name="isbn" placeholder="ISBN" />
              <ErrorMessage name="isbn" component="div" className="error-message" />

              <Field type="date" name="publicationDate" placeholder="Publication Date" />
              <ErrorMessage name="publicationDate" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting} className="submit-button">
                Add Book
              </button>
            </Form>
          )}
        </Formik>
        <ul className="record-list">
          {books.map((book, index) => (
            <li key={index}>
              {book.title} - {book.author}{' '}
              <button onClick={() => handleDeleteBook(index)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="content-box">
        <h2>Author Management</h2>
        <Formik
          initialValues={{ name: '', birthDate: '', biography: '' }}
          validationSchema={authorValidationSchema}
          onSubmit={handleAuthorSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="text" name="name" placeholder="Author Name" />
              <ErrorMessage name="name" component="div" className="error-message" />

              <Field type="date" name="birthDate" placeholder="Birth Date" />
              <ErrorMessage name="birthDate" component="div" className="error-message" />

              <Field as="textarea" name="biography" placeholder="Biography" />
              <ErrorMessage name="biography" component="div" className="error-message" />

              <button type="submit" disabled={isSubmitting} className="submit-button">
                Add Author
              </button>
            </Form>
          )}
        </Formik>
        <ul className="record-list">
          {authors.map((author, index) => (
            <li key={index}>
              {author.name} - {author.birthDate}{' '}
              <button onClick={() => handleDeleteAuthor(index)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;


























