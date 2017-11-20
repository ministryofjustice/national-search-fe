import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { Route, MemoryRouter } from 'react-router-dom';

import App from './App';

const renderTestSequence = ({
                                initialEntries,
                                initialIndex,
                                subject: Subject,
                                steps
                            }) => {

    const div = document.createElement('div');

    class Assert extends Component {

        componentDidMount() {
            this.assert();
        }

        componentDidUpdate() {
            this.assert();
        }

        assert() {
            const nextStep = steps.shift();
            if (nextStep) {
                nextStep({ ...this.props, div });
            } else {
                unmountComponentAtNode(div);
            }
        }

        render() {
            return this.props.children;
        }
    }

    class Test extends Component {
        render() {
            return (
                <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                    <Route render={(props) => (
                        <Assert {...props}>
                            <Subject/>
                        </Assert>
                    )}/>
                </MemoryRouter>
            );
        };
    }

    render(<Test/>, div);
};

describe('App', () => {

    it('navigates from search to Feedback', (done) => {

        renderTestSequence({

            subject: App,

            steps: [

                ({ history, div }) => {
                    console.assert(div.querySelector('h1').innerHTML.match(/National offender search/));
                    history.push('/feedback');
                },

                ({ div }) => {
                    console.assert(div.querySelector('h1').innerHTML.match(/Give feedback/));
                    done();
                }
            ]
        });
    });

});
