import React from 'react';

export default function Header(props) {

    return (
        <header>
            <div 
                className="logo"
                onClick={() => props.setPage("home")}
            >My313Library</div>
            <nav>
                <a onClick={() => props.setPage('addBook')}>Add Book +</a>
                <a onClick={() => {
                    props.setPage('myBooks');
                    props.setBookList([]);
                }}>My Books</a>
            </nav>
        </header>
    )
}