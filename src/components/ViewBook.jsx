import React from 'react';

export default function ViewBook(props) {

    const addCommasToAuthors = props.currentBook.author.map((author) => `${author},`);

    const [deleteBook, setDeleteBook] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState(false);

    React.useEffect(() => {
        try {
            if (deleteBook) {
                const url = `${props.root}/book/delete/${props.currentBook._id}`;
                async function postDeleteBook() {
                    await fetch(url).then((res) => res.json())
                    .then(() => setDeleteBook(false))
                    .catch((err) => console.log(err));
                }
                postDeleteBook();
            }
        } catch(err) {
            console.log(err);
        }
    }, [deleteBook])

    return (
        <div className="view-book-container-background">
            {showDeleteModal && <div className="delete-book-modal-background">
                <div className="delete-book-modal">
                    <p className="delete-book-modal-header">
                        {confirmDelete ? "Book Successfully Deleted!" : "Are you sure you want to remove this book?"}
                    </p>
                    {!confirmDelete && <div className="delete-book-btn-container">
                        <button 
                            onClick={() => setShowDeleteModal(false)}
                            className="main-btn"
                        >Go Back</button>
                        <button
                            onClick={() => {
                                setDeleteBook(true);
                                setConfirmDelete(true);
                            }}
                            className="main-btn"
                        >Continue</button>
                    </div>}
                    {confirmDelete && <button 
                        onClick={() => {
                            props.setShowBook(false);
                            setShowDeleteModal(false);
                        }}
                        type="button" 
                        className="main-btn"
                    >Confirm</button>}
                </div>
            </div>}
            <div className="view-book-container">
                <button 
                    onClick={() => props.setShowBook(false)}
                    className="exit-btn"
                >Exit</button>
                <p className="view-book-header view-book-title">{props.currentBook.title}</p>
                <p className="view-book-header view-book-author">{addCommasToAuthors}</p>
                <p className="view-book-header view-book-publisher">{props.currentBook.publisher}</p>
                <p className="view-book-header view-book-year">{props.currentBook.year}</p>
                <p className="view-book-header view-book-isbn">ISBN# {props.currentBook.isbn}</p>
                <button 
                    onClick={() => setShowDeleteModal(true)}
                    type="button" 
                    className="main-btn remove-btn"
                >Remove Book</button>
            </div>
        </div>
    )
}