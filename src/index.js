import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SurveyDashboard from './SurveyDashboard';
 
var destination = document.querySelector("#container")
 
ReactDOM.render(
    <div>
        <SurveyDashboard/>
    </div>,
    destination
);