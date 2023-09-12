import { Icon } from "semantic-ui-react";
import "./PaginationComponent.css";

export default function PaginationComponent({ usersPerPage, users, currentPage, totalPages, handlePageChange }) {
    return (
        <div className="pagination-div">
            <nav className="nav-pagination">
                <ul >
                    <li>
                        <button className="btns" onClick={() => handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage)}
                            disabled={currentPage > 1 ? false : true}
                            icon="true">
                            <Icon name='left arrow' />
                        </button>
                    </li>
                    {[...Array(totalPages + 1).keys()].slice(1).map((nbr, i) => (
                        <li key={i}>
                            <button className={currentPage === nbr ? "active-btn" : "btns"} onClick={() => handlePageChange(nbr)}>{nbr}</button>&nbsp;
                        </li>
                    ))}
                    <li>
                        <button className="btns" onClick={() => handlePageChange(currentPage !== totalPages ? currentPage + 1 : currentPage)}
                            disabled={((currentPage < (users.length / usersPerPage)) && totalPages > 1) ? false : true}
                            icon="true">
                            <Icon name='right arrow' />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
};