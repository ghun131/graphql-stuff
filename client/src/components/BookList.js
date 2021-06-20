import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetail from './BookDetail';

const BookList = (props) => {
    const [selected, setSelectedBook] = React.useState('');

    function displayBooks() {
        const data = props.data;
        if (data.loading) {
            return <div>Loading...</div>
        } else {
            return data.books.map(book => (
                <li key={book.id} onClick={(event) => setSelectedBook(book.id)}>{book.name}</li>
            ))
        }
    }


    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetail bookId={selected} />
        </div>
    );
}

export default graphql(getBooksQuery)(BookList);