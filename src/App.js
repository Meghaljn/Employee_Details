// import React from 'react';
// import './App.css';
// import SurveyDashboard from './SurveyDashboard'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//        <SurveyDashboard/>
//       </header>
//     </div>
//   );
// }

export default App;


import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SurveyDashboard from './SurveyDashboard';
 
var destination = document.querySelector("#container")
 
ReactDOM.render(
    <div>
        <SurveyDashboard/>
    </div>,
    destination
);