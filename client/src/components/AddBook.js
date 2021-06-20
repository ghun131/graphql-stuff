import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

const AddBook = (props) => {
    const [name, setName] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [authorId, setAuthorId] = React.useState('');

    function displayAuthors() {

        const data = props.getAuthorsQuery;
        if (data.loading) {
            return (<option disabled>Loading authors</option>);
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    function submitForm(event) {
        event.preventDefault();
        console.log(name, genre, authorId);
        props.addBookMutation({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })

    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={event => setName(event.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={event => setGenre(event.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={event => setAuthorId(event.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>

        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);