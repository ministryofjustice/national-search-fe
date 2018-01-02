// @flow
import React, { Component } from 'react';

type Props = {
  suggestions: Array<any>,
  click: Function
};

export default class Suggestions extends Component<Props> {
  render() {
    let filteredSuggestions = this.props.suggestions.filter(
      (suggestion, index, self) =>
        self.findIndex(
          t => t.text === suggestion.text && t.option === suggestion.option
        ) === index
    );

    return (
      <span>
        {filteredSuggestions.map((suggestion, i) => (
          <span key={i}>
            <a
              className="white"
              onClick={() =>
                this.props.click(suggestion.text, suggestion.option)
              }>
              {suggestion.option}
            </a>{' '}
          </span>
        ))}
      </span>
    );
  }
}
