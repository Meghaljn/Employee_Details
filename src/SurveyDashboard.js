import React, { Component } from "react"; 
 
class SurveyDashboard extends Component{
  constructor(props) {    
    super(props);     

    var SurveyList=["S1","S3"];
    var AssignedList=["S4","S2"];
    var Employee = "Employee1";

    this.state = {
      SurveyList:SurveyList,
      AssignedList:AssignedList,
      Employee:Employee
    }

    this.addItem = this.addItem.bind(this); //adds the selected survey to  Assignedlist and removes from surveyList 
    this.deleteItem = this.deleteItem.bind(this);//adds the selected survey to  surveyList and removes from Assignedlist 

    this.handlechange = this.handlechange.bind(this);//gives the employee_name to backend and return lists according to the employee selected
    this.saveData = this.saveData.bind(this);//saves new state at the backend
  }

  handlechange(event){

    fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ Employee: this.state.Employee })
      // We convert the React state to JSON and send it as the POST body
    }).then( response => response.json() )
    
    .then(json=>{
      console.log(json);
      this.setState({
        AssignedList: json.AssignedList,
        SurveyList:json.SurveyList
      })
    })
    
  }

  addItem(survey){
    this.state.AssignedList.push(survey);
    var array = this.state.SurveyList.filter(function(i){ return (i!== survey );});
    this.setState({
      AssignedList: this.state.AssignedList,
      SurveyList: array
    })
  
  }

  deleteItem(survey){
    this.state.SurveyList.push(survey);
    var AssignedList = this.state.AssignedList.filter(i=> i !== survey)

      this.setState({
        SurveyList : this.state.SurveyList,
        AssignedList: AssignedList
      })
  }
  saveData(event){
    fetch('http://localhost:4000', {
      method: 'PUT',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({Employee: this.state.Employee,AssignedList:this.state.AssignedList,SurveyList:this.state.SurveyList})
      // We convert the React state to JSON and send it as the POST body
    })
  }
 
  render(){
    return(
      <div>
      <div className="level-item has-text-centered">
        <article className="panel is-primary">
          <p className="panel-heading">
              Select an employee
          </p>
          <div className="control">
            <div className="select">
              
              <select id="selEmployee"onChange={(e) => this.setState({Employee: e.target.value})}>
                <option value="Employee1">Employee1</option>
                <option value="Employee2">Employee2</option>
                <option value="Employee3">Employee3</option>
                <option value="Employee4">Employee4</option>
                <option value="Employee5">Employee5</option>
              </select>
            </div>
            <button class="button is-primary" onClick={this.handlechange}> Go</button> 
          </div> 
        </article>
      </div>
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <article class="panel is-primary">
              <p class="panel-heading">
                  Survey List
              </p>
           
              <ul class="list">
                {this.state.SurveyList.map(function(survey) {
                  return(
                    <a class="navbar-item is-expanded  is-block has-text-centered">
                    <h1 class="panel-block" value={survey}>{survey} <button align="right" class="button is-primary" onClick={()=>this.addItem(survey)}>remove</button></h1>
                    </a>
                  );
                },this)} 
              </ul>
            </article>
          </div>
        </div>
        
        <div class="level-right">
          <div class="level-item">
            <article class="panel is-primary">
              <p class="panel-heading">
                Assigned Survey
              </p>
              
              <ul class= "list">
                {this.state.AssignedList.map(function (survey) {
                  return(
                    <a class="navbar-item is-expanded  is-block has-text-centered">

                    <p1 class="panel-block"  value={survey} >{survey  }<button align="right" class="button is-primary"  onClick={()=>this.deleteItem(survey)} >remove</button></p1>
                    </a>
 
                  );
                },this)}
              </ul> 
            </article>
          </div>
        </div>
      </nav>
      <div class="level-item has-text-centered">
        <button class="button is-primary" onClick={this.saveData}>Done</button>
      </div>
      </div>

    );
  }
}

export default SurveyDashboard