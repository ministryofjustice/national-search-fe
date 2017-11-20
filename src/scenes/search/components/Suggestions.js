import React from 'react';

const Suggestions = (props) => (
    <span>
        {props.suggestions.map((suggestion, i, arr) =>
            <span key={i}><a className="white" onClick={() => props.click(suggestion.text, suggestion.option)}>{suggestion.option}</a> </span>
        )}
    </span>
);

export default Suggestions;