// @flow
import React from 'react';

type Props = {
  suggestions: Array<any>,
  click: Function
};

const Suggestions = (props: Props) => (
  <span>
    {props.suggestions.map((suggestion, i) => (
      <span key={i}>
        <a
          className="white"
          onClick={() => props.click(suggestion.text, suggestion.option)}>
          {suggestion.option}
        </a>{' '}
      </span>
    ))}
  </span>
);

export default Suggestions;
