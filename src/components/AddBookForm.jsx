import React from 'react';

export default function AddBookForm(props) {

    const [book, setBook] = React.useState({
        isbn: "",
        title: "",
        author: "",
        publisher: "",
        year: "",
    })
    const [checkFields, setCheckFields] = React.useState({
        ibsn: false,
        title: false,
        author: false,
        publisher: false,
        year: false,
    })
    const [postBook, setPostBook] = React.useState(false);

    React.useEffect(() => {
        if (postBook) {
            const url = props.root + '/book/add';
            async function addBook() {
                await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(book),
                }).then((res) => res.json())
                .then(() => props.setShowModal(true))
                .catch((err) => console.log(err));
            }    
            addBook();
        }
    }, [postBook])

    function handleFormInputChange(e) {
        setBook((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleFormSubmit() {
        let allFieldsHaveValues = true;
        for (const key in book) {
            if (book[key] === "") {
                allFieldsHaveValues = false;
                setCheckFields((prev) => ({
                    ...prev,
                    [key]: true,
                }))
            } else {
                setCheckFields((prev) => ({
                    ...prev,
                    [key]: false,
                }))
            }
        }
        if (allFieldsHaveValues) {
            setPostBook((prev) => !prev);
        }
    }


    return (
        <form className="add-book-form">
            <button 
                    onClick={() => props.setPage("home")}
                    className="exit-btn add-book-form-exit-btn"
                >Exit</button>
            <label htmlFor="isbn"><span><span className="input-label-text">ISBN</span> {checkFields.isbn && <span className="error-msg">*Please Enter an ISBN</span>}</span>
                <input type="text" name="isbn" onChange={handleFormInputChange} required/>
            </label>
            <label htmlFor="isbn"><span><span className="input-label-text">Title</span> {checkFields.title && <span className="error-msg">*Please Enter a Title</span>}</span>
                <input type="text" name="title" onChange={handleFormInputChange}/>
            </label>
            <label htmlFor="isbn"><span><span className="input-label-text">Author</span> {checkFields.author && <span className="error-msg">*Please Enter an Author</span>}</span>
                <input type="text" name="author" onChange={handleFormInputChange}/>
            </label>
            <label htmlFor="isbn"><span><span className="input-label-text">Publisher</span> {checkFields.publisher && <span className="error-msg">*Please Enter a Publisher</span>}</span>
                <input type="text" name="publisher" onChange={handleFormInputChange}/>
            </label>
            <label htmlFor="isbn"><span><span className="input-label-text">Year</span> {checkFields.year && <span className="error-msg">*Please Enter a Year</span>}</span>
                <input type="number" name="year" onChange={handleFormInputChange}/>
            </label>
            <button className="post-book-btn main-btn" type="button" onClick={handleFormSubmit}>Add Book</button>
        </form>
    )
}