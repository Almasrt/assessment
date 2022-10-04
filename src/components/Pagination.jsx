const Pagination = ({nPages, currentPage, setCurrentPage}) => {

    //holds the page numbers from 1 to the number max of pages
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    
    return (
        <>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {pageNumbers.map(pNum => (
                    <li key={pNum} className={`page-item ${currentPage == pNum ? 'active' : ''}`}>
                        <a onClick={() => setCurrentPage(pNum)}
                            className="page-link"
                            href="#">
                            {pNum}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        </>
    );
}

export default Pagination;