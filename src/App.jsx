import React from 'react';
import './App.css'
import {v4 as uuidv4} from 'uuid';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AddBookForm from './components/AddBookForm';
import Book from './components/Book';
import MyBooks from './components/MyBooks';
import ViewBook from './components/ViewBook';
import SearchBooks from './components/SearchBooks';

function App() {  

  // const root = 'https://us-central1-database-class-backend.cloudfunctions.net/api';
  const root = 'http://localhost:3000';

  const [bookList, setBookList] = React.useState([]);
  const [currentBook, setCurrentBook] = React.useState({});
  const [page, setPage] = React.useState("home");
  const [showModal, setShowModal] = React.useState(false);
  const [showBook, setShowBook] = React.useState(false);
  const [getResults, setGetResults] = React.useState(false);
  const [searchKey, setSearchKey] = React.useState("");

  React.useEffect(() => {
    try {
      if (page === 'home') {
        async function getAllBooks() {
          const url = root + '/books/all/glance'; //added limit of 12
          await fetch(url).then((res) => res.json())
          .then((books) => setBookList(books.bookList))
          .catch((err) => console.log(err));
        }
        getAllBooks();
      }
    } catch(err) {
      console.log(err);
    }
  }, [page, showBook])

  const mappedBookList = bookList.map((book) => {
    return <Book 
              key={uuidv4()}
              book={book}
              setCurrentBook={setCurrentBook}
              setPage={setPage}
              setShowBook={setShowBook}
            />
  })

  return (
    <div className="App">
      {showBook && 
        <ViewBook 
          currentBook={currentBook}
          setShowBook={setShowBook}
          root={root}
        />
      }
      <Header 
        setPage={setPage}
        setBookList={setBookList}
      />
      {(page === 'home' || page === "myBooks" || page === 'search') && <div className="home-container">
        <Sidebar 
          root={root}
          setBookList={setBookList}
          setPage={setPage}
          getResults={getResults}
          setGetResults={setGetResults}
          setShowBook={setShowBook}
          showBook={showBook}
          setCurrentBook={setCurrentBook}
          setSearchKey={setSearchKey}
        />
        {page === "home" && <div className='book-container'>
          <p className="book-container-header">At a Glance</p>
          {mappedBookList.length > 0 && <div className="mapped-book-container">
            {mappedBookList}
          </div>}
          {mappedBookList.length === 0 && 
            <p className="no-books-header">No Books in Library Match Search Criteria</p>
          }
        </div>}
        {page === "myBooks" && 
          <MyBooks 
            root={root}
            setCurrentBook={setCurrentBook}
            setPage={setPage}
            setShowBook={setShowBook}
            showBook={showBook}
          />
        }
        {page === 'search' && 
          <SearchBooks 
            root={root}
            setCurrentBook={setCurrentBook}
            setPage={setPage}
            setShowBook={setShowBook}
            showBook={showBook}
            bookList={bookList}
            searchKey={searchKey}
          />
        }
      </div>}
      {page === 'addBook' && <div className="add-book-container">
        {showModal && <div className="add-book-modal-background">
            <div className="add-book-modal">
              <p className="add-book-modal-header">Book Added Successfully!</p>
              <button 
                type="button" 
                className="main-btn" 
                onClick={() => {
                  setPage("home");
                  setShowModal(false);
                }}
                >Back Home</button>
            </div>
        </div>}
        <p className="add-book-container-header">Add Book</p>
        <AddBookForm 
          root={root}
          setPage={setPage}
          setShowModal={setShowModal}
        />
      </div>}
    </div>
  )
}

export default App
