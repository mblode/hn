import React from 'react';

function Pagination({ currentPage, onPaginate }) {
    return (
        <div className="Pagination">
            <div className="Pagination__inner">
                <button
                    data-button="prev"
                    type="button"
                    onClick={() => onPaginate(currentPage - 1)}
                >
                    {'<'} Prev
        </button>
                {currentPage} / 10
        {' '}
                <button
                    data-button="next"
                    type="button"
                    onClick={() => onPaginate(currentPage + 1)}
                >
                    Next {'>'}
                </button>
            </div>
        </div>
    );
}

export default Pagination;
