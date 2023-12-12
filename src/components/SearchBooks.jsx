import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Book from './Book';

export default function SearchBooks(props) {

    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        setResults(props.bookList);
    }, [props.bookList]);

    const mappedBookList = results.map((book) => {
        return <Book 
                    key={uuidv4()}
                    book={book}
                    setCurrentBook={props.setCurrentBook}
                    setPage={props.setPage}
                    setShowBook={props.setShowBook}
        />
    })

    return (
        <div className="my-books-container">
            <p className="my-books-header">Search Library</p>
            {mappedBookList.length > 0 && <div className="my-books">
                {mappedBookList}
            </div>}
            {mappedBookList.length === 0 && 
                <p className="no-books-header">No Books in Library Match Search Criteria</p>
            }
        </div>
    )
}