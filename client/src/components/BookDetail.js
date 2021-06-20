
import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const BookDetail = (props) => {
    function displayBookDetail() {
        const { book } = props.data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-book">
                        {
                            book.author.books.map(item => (<li key={item.id}>{item.name}</li>))
                        }
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No book selected...</div>
            )
        }
    }

    return (
        <div id="book-details">
            {displayBookDetail()}
        </div>
    );
}

export default graphql(getBookQuery, {
    options: (props) => ({
        variables: { id: props.bookId }
    })
})(BookDetail);