import React from 'react';
import {v4 as uuidv4} from 'uuid';

export default function Recent(props) {

    const [recentBooks, setRecentBooks] = React.useState([]);

    React.useEffect(() => {
        try {
            const url = props.root + '/books/recent';
            async function getRecentBooks() {
                await fetch(url).then((res) => res.json())
                .then((books) => setRecentBooks(books.bookList))
                .catch((err) => console.log(err));
            }
            getRecentBooks();
        } catch(err) {
            console.log(err);
        }
    }, [props.showBook])

    function handleRecentBookClick(book) {
        props.setCurrentBook(book);
        props.setShowBook(true);
    }

    const mappedRecentBooks = recentBooks.map((book) => {
        return  <a 
                    key={uuidv4()} 
                    className="recent-book-link"
                    onClick={() => handleRecentBookClick(book)}
                    >{book.title}
                </a>
    })
    

    return (
        <div className="recent-container">
            <p className="recent-container-header">Recent Additions</p>
            {mappedRecentBooks}
        </div>
    )
}