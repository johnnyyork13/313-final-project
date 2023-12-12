import React from 'react';
import Recent from './Recent';

export default function Sidebar(props) {

    const [search, setSearch] = React.useState({
        filter: "",
        keywords: "",
    });
    const [getResults, setGetResults] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        try {
            if (getResults) {
                const url = props.root + '/books/filter'
                async function getSearchResults() {
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(search)
                    }).then((res) => res.json())
                    .then((books) => {
                        console.log('returned booklist', books.bookList);
                        props.setBookList(books.bookList);
                        setGetResults(false);
                    })
                    .catch((err) => console.log(err));
                }
                getSearchResults();
            }
        } catch(err) {
            console.log(err);
        }
    }, [getResults]);

    function handleFilterChange(e) {
        setSearch((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSearchSubmit() {
        if (search.filter === "" || search.keywords === "") {
            setError(true);
        } else {
            setError(false);
            setGetResults(true);
        }
    }

    return (
        <aside>
            <p className="sidebar-header">Search Library</p>
            <label>
                <input onChange={handleFilterChange} type="radio" name="filter" value="isbn"/>
                ISBN
            </label>
            <label>
                <input onChange={handleFilterChange} type="radio" name="filter" value="title"/>
                Title
            </label>
            <label>
                <input onChange={handleFilterChange} type="radio" name="filter" value="author"/>
                Author
            </label>
            <label>
                <input onChange={handleFilterChange} type="radio" name="filter" value="publisher"/>
                Publisher
            </label>
            <label>
                <input onChange={handleFilterChange} type="radio" name="filter" value="year"/>
                Year
            </label>
            <div className="search-bar-container">
                {error && <span className="error-msg search-error">*Please select filter and enter keywords</span>}
                <input onChange={handleFilterChange} type="text" placeholder='Keywords' name='keywords' />
                <button className="main-btn" onClick={handleSearchSubmit} type="button">Search</button>
            </div>
            <Recent 
                root={props.root}
            />
        </aside>
    )
}