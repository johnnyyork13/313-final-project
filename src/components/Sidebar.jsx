import React from 'react';
import Recent from './Recent';

export default function Sidebar(props) {

    const [search, setSearch] = React.useState({
        filter: "",
        keywords: "",
    });
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        try {
            if (props.getResults) {
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
                        props.setBookList(books.bookList);
                        props.setPage('search');
                        props.setGetResults(false);
                    })
                    .catch((err) => console.log(err));
                }
                getSearchResults();
            }
        } catch(err) {
            console.log(err);
        }
    }, [props.getResults]);

    function handleFilterChange(e) {
        setSearch((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleSearchSubmit() {
        if (search.filter === "" || search.keywords === "" ) {
            setError({
                error: true,
                msg: "*Please select filter and enter keywords"
            });
        } else {
            setError(false);
            props.setGetResults(true);
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
                {error.error && <span className="error-msg search-error">{error.msg}</span>}
                <input onChange={handleFilterChange} type={(search.filter === "year" || search.filter === 'isbn') ? "number" : "text"} placeholder='Keywords' name='keywords' />
                <button className="main-btn" onClick={handleSearchSubmit} type="button">Search</button>
            </div>
            <Recent 
                root={props.root}
                setShowBook={props.setShowBook}
                setCurrentBook={props.setCurrentBook}
                showBook={props.showBook}
            />
        </aside>
    )
}