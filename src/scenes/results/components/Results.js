import React, { Component } from 'react';

export default class Results extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      searchParams: props.location.state.searchParams || ''
    };
  }

  /**
   * Init
   */
  componentDidMount() {
    this.search();
  }

  /**
   * Perform the search
   */
  search() {

    const request = new XMLHttpRequest();
    request.open('GET', '/fake', true);
    request.onload = function () {

      if (request.status >= 200 && request.status < 400) {

        this.setState({
          results: [
            {
              forename: 'Peter',
              surname: 'Roberts',
              dateOfBirth: '01/03/1945',
              crn: 'X087946',
              gender: 'Male',
              nationality: 'White British',
              birthPlace: 'England'
            },
            {
              forename: 'John',
              surname: 'Roberts',
              dateOfBirth: '23/03/1967',
              crn: 'X087947',
              gender: 'Male',
              nationality: 'White British',
              birthPlace: 'Scotland'
            },
            {
              forename: 'Frank',
              surname: 'Roberts',
              dateOfBirth: '12/03/1989',
              crn: 'X087948',
              gender: 'Male',
              nationality: 'White British',
              birthPlace: 'Wales'
            },
            {
              forename: 'Simon',
              surname: 'Roberts',
              dateOfBirth: '20/03/1954',
              crn: 'X087949',
              gender: 'Male',
              nationality: 'White British',
              birthPlace: 'Scotland'
            }
          ]
        });

      } else {
        console.error('SERVER ERROR');
      }
    }.bind(this);

    request.onerror = function () {
      console.error('SERVER ERROR');
    };

    request.send();
  }

  /**
   * Calculate the offender age based on DD/MM/YYYY
   * @param dateString
   * @returns {number}
   */
  pipeAge = (dateString) => {
    const today = new Date(),
      splitDate = dateString.split('/'),
      birthDate = new Date([splitDate[1], splitDate[0], splitDate[2]].join('/')),
      m = today.getMonth() - birthDate.getMonth(),
      age = today.getFullYear() - birthDate.getFullYear();

    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  /**
   *
   * @param event
   */
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchParams: event.target.value });
  };

  /**
   * Handle offender selection
   * @param event
   */
  handleClick = (event) => {
    event.preventDefault();
    const selected = this.state.results[event.target.id];
    console.info('Selected:', `${selected.forename} ${selected.surname}`);
  };

  /**
   * Handle search parameters submission
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();
  };

  /**
   * Render DOM
   * @returns {XML}
   */
  render() {

    return (
      <div>
        <h1 className="heading-xlarge">Search results</h1>
        <div className="grid-row">
          <div className="column-one-third">
            <form onSubmit={this.handleSubmit}>
              <label>Search parameters
                <input className="form-control" type="text" value={this.state.searchParams}
                       onChange={this.handleChange}/>
              </label>
            </form>
          </div>
          <div className="column-two-thirds">

            {!this.state.results.length &&
              <p>Searching...</p>
            }

            {this.state.results.length &&
              <div>
                <h2 className="heading-medium no-margin top">{this.state.results.length} results found</h2>

                <div className="margin-bottom">&nbsp;</div>

                {this.state.results.map((result, i) =>
                  <div key={i}>
                    <div className="panel panel-border-narrow">
                      <a id={i} className="clickable heading-large no-underline"
                         onClick={this.handleClick}>{result.surname}, {result.forename} - {result.dateOfBirth}</a>
                      <p className="form-label-bold no-margin bottom">CRN: {result.crn}</p>
                      <p
                        className="no-margin top">{result.gender}, {this.pipeAge(result.dateOfBirth)}, {result.nationality}</p>
                      <p className="no-margin top">Born in {result.birthPlace}</p>
                    </div>
                    <div>&nbsp;</div>
                  </div>
                )}
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}
