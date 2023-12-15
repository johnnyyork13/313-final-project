import React from 'react';

export default function Book(props) {

    const addCommasToAuthors = props.book.author.map((author, index) => {
        let modifiedAuthor;
        if (index === 0) {
            modifiedAuthor = author;
        } else if (index < props.book.author.length - 1) {
            modifiedAuthor = ` ${author},`
        } else {
            ` ${author}`
        }
        return modifiedAuthor;
    });

    function handleBookClick() {
        props.setCurrentBook(props.book);
        props.setShowBook(true);
    }

    return (
        <div className="book" onClick={handleBookClick}>
            <p className="book-header book-title">{props.book.title}</p>
            <p className="book-header book-author">{addCommasToAuthors}</p>
        </div>
    )
}