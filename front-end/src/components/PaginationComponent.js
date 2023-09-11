import { Button, ButtonGroup, Icon } from "semantic-ui-react";
import "./PaginationComponent.css";

export default function PaginationComponent({ usersPerPage, users, currentPage, totalPages, handlePageChange }) {
    return (
        <div className="pagination-div">
            <nav className="nav-pagination">
                <ul>
                    {currentPage > 1 && <Button basic color="grey" onClick={() => handlePageChange(currentPage !== 1 ? currentPage - 1 : currentPage)}
                        className={currentPage > 1 ? "" : "pagination__disable"}
                        icon labelPosition='left'>
                        Prev
                        <Icon name='left arrow' />
                    </Button>}
                    <ButtonGroup>
                        {[...Array(totalPages + 1).keys()].slice(1).map((nbr, i) => (
                            <li key={i}>
                                <Button active={currentPage === nbr ? true : false} basic color={currentPage === nbr ? "blue" : "grey"} onClick={() => handlePageChange(nbr)}>{nbr}</Button>&nbsp;
                            </li>
                        ))}
                    </ButtonGroup>&nbsp;
                    {((currentPage < (users.length / usersPerPage)) && totalPages > 1) && <Button basic color="grey" onClick={() => handlePageChange(currentPage !== totalPages ? currentPage + 1 : currentPage)}
                        icon labelPosition='right'>
                        Next
                        <Icon name='right arrow' />
                    </Button>}
                </ul>
            </nav>
        </div>
    )
};