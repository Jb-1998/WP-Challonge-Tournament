import React from 'react';
import ReactDOM from 'react-dom';
import MatchTable from '../index';

import "@testing-library/jest-dom/extend-expect";
import matchData from '../../../constants/matchTableTest.json'


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MatchTable></MatchTable>, div)
})

