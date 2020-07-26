var express = require('express');
const app = express();

const http = require('http');
var cors = require('cors')
const hostname = 'localhost';
const port = 4000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());
var surveys =["S1","S2","S3","S4"];

var Employee = [{
        "name": 'Employee1',
        "SurveyList": ["S2","S3"],
        "AssignedList":["S4","S1"]

    },
    {
        "name": 'Employee2',
        "SurveyList": ["S1","S3"],
        "AssignedList":["S4","S2"]
    },
    {
        "name": 'Employee3',
        "SurveyList": ["S1","S2"],
        "AssignedList":["S4","S3"]
    },
    {
        "name": 'Employee4',
        "SurveyList": ["S1","S2","S3"],
        "AssignedList":["S4"]
    },
    {
        "name": 'Employee5',
        "SurveyList": ["S1","S2","S3"],
        "AssignedList": ["S4"]
    }
]



app.all('/', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/', (req, res, next) => {
    res.json(Employee);
    res.end();
});


app.post('/', (req, res, next) => {//envokes when go is clicked gives AssignedList and SurveyList  of corresponding Employee as response to react
   
    console.log(`${req.body.Employee}`);
    var id = req.body.Employee;

    for (var i = 0; i < Employee.length; i++){
        if (Employee[i].name == id){
            break;
        }
    }
    var body= JSON.stringify({name:Employee[i].name,AssignedList:Employee[i].AssignedList,SurveyList:Employee[i].SurveyList});
    res.send(body);
    res.end();

});

app.put('/', (req, res, next) => { //envokes when done is clicked set new assignedlist and surveylist of the given employee 
    var id = req.body.Employee;
    for (var i = 0; i < Employee.length; i++){
        if (Employee[i].name == id){
            break;
        }
    }
    Employee[i].AssignedList = req.body.AssignedList;
    Employee[i].SurveyList = req.body.SurveyList;
    res.end();
});

app.delete('/', (req, res, next) => {
    res.end('Delete this employee');
});

app.all('/employee', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
});
app.post('/employee', (req, res, next) => {
    Employee.push({name:req.name,AssignedList:req.AssignedList,SurveyList:req.SurveyList});
    console.log('posted successfully');
    next();
});
app.get('/employee', (req, res, next) => { //displays employee name
    for(var i=0;i<Employee.length;i++){
        res.write(Employee[i].name+" ");
    }
    res.end();
    next();
});

app.all('/surveys', (req, res, next) => { //displays all surveys
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/surveys', (req, res, next) => {
    res.json(surveys);
    next();
});
app.post('/surveys', (req, res, next) => {
    surveys.push(req.body.surveys);
    next();
});


const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});