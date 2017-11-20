import React from 'react';

const Pagination = (props) => (
    <div>
        <a onClick={props.previousPage}>Previous</a> {props.state.currentPage + ' / ' + Math.ceil(props.state.hits / 10)} &nbsp;
        <a onClick={props.nextPage}>Next</a>
    </div>
);

export default Pagination;