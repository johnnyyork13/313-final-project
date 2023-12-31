import React from 'react';
import {v4 as uuidv4} from 'uuid';
import Book from './Book';

export default function MyBooks(props) {

    const [bookList, setBookList] = React.useState([]);

    React.useEffect(() => {
        try {
            const url = props.root + '/books/all/my-books';
            async function getAllBooks() {
                await fetch(url).then((res) => res.json())
                .then((books) => setBookList(books.bookList))
                .catch((err) => console.log(err));
            }
            getAllBooks();
        } catch(err) {
            console.log(err);
        }
    }, [props.bookList, props.showBook])

    const mappedBookList = bookList.map((book) => {
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
            <p className="my-books-header">My Books</p>
            {mappedBookList.length > 0 && <div className="my-books">
                {mappedBookList}
            </div>}
            {mappedBookList.length === 0 && 
                <p className="no-books-header">No Books in Library Match Search Criteria</p>
            }
        </div>
    )
}