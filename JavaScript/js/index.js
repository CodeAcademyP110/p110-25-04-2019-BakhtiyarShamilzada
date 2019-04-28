"use strict";

let positionCounter = 1;
let employeeCounter = 1;

class Company
{
    constructor(name)
    {
        this._name = name;
        this._positions = [];
    }
    addNewPosition(position)
    {
        this._positions.push(position);
    }
    removePosition(positionId)
    {
        this._positions = this._positions.filter(p  => p._id !== positionId);

    }
    findPositionById(id)
    {
        return this._positions.find(p => p._id === id);
    }
}
class Position
{
    constructor(positionName)
    {
        this._id = positionCounter;
        this._positionName = positionName;
        this._employees = [];
        positionCounter++;
    }
    addNewEmployee(employee)
    {
        this._employees.push(employee);
    }
    removeEmployee(employeeId)
    {
        this._employees = this._employees.filter(employ => employ._id !== employeeId);

    }
}
class Employee
{
    constructor(firstName, lastName, email, positionId)
    {
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._positionId = positionId;
        this._id = employeeCounter++;
    }
}
const BestCoder = new Company('Best Coder');

const FullStackDeveloper = new Position('Full Stack Developer');
const FrontEndDeveloper = new Position('Front-End Developer');
const BackEndDeveloper = new Position('Back-End Developer');
const ProjectManager = new Position('Project Manager');

const employee1 = new Employee('Bakhtiyar', 'Shamilzada', 'Bakhtiyarkhsh@code.edu.az', 1);
const employee2 = new Employee('Orxan', 'Memmedov', 'orkhan@code.edu.az', 2);
const employee3 = new Employee('Elchin', 'Maqsudov', 'elchin@code.edu.az',3);
const employee4 = new Employee('Ilkin', 'Besitov', 'ilkin@code.edu.az',4);

FullStackDeveloper.addNewEmployee(employee1);
FrontEndDeveloper.addNewEmployee(employee2);
BackEndDeveloper.addNewEmployee(employee3);
ProjectManager.addNewEmployee(employee4);

BestCoder.addNewPosition(FullStackDeveloper);
BestCoder.addNewPosition(FrontEndDeveloper);
BestCoder.addNewPosition(BackEndDeveloper);
BestCoder.addNewPosition(ProjectManager);

window.onload = function()
{
    const table = document.querySelector('table');
    table.classList.remove('d-none');
    const addPosition = document.querySelector('.add-position');
    addPosition.onclick = function(e)
    {
        e.preventDefault();
        const position = document.getElementById('position');

        if((position.value).trim())
        {
            const newPosition = new Position(position.value);
            BestCoder.addNewPosition(newPosition);

            const customSelect = document.querySelector('.custom-select');
            customSelect.innerHTML = '';
            position.value = '';
            updateSelect();
        }

       
    }
    
    function updateSelect()
    {
        BestCoder._positions.forEach(p => 
        {
            const option = document.createElement('option');
            option.value = p._id;
            
            option.innerText = p._positionName;
            document.querySelector('.custom-select').appendChild(option);
            
        })
    }
    updateSelect();
    const addEmployee = document.querySelector('.add-employee');
    addEmployee.onclick = function(e)
    {
        e.preventDefault();
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const positionSelect = document.getElementById('position-select');
        
        if(positionSelect.value)
        {
            const Position = BestCoder.findPositionById(+positionSelect.value);
        
            const newEmployee = new Employee(firstName.value, lastName.value, email.value, positionSelect.value);
    
            Position.addNewEmployee(newEmployee);

            firstName.value = '';
            lastName.value = '';
            email.value = '';
            positionSelect.value = ''

        }
        
        table.classList.remove('d-none');
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        
        updateTable();
        
    }
    const tbody = document.querySelector('tbody');
      
    function updateTable()
    {  
        BestCoder._positions.forEach(position =>
        {
            position._employees.forEach(employ =>
            {
                const tr = document.createElement('tr');

                const firstNameTd = document.createElement('td');
                firstNameTd.innerText = employ._firstName;

                const lastNameTd = document.createElement('td');
                lastNameTd.innerText = employ._lastName;

                const emailTd = document.createElement('td');
                emailTd.innerText = employ._email;

                const positionTd = document.createElement('td');
                positionTd.innerText = position._positionName;

                const removeTd = document.createElement('td');
                const button = document.createElement('button');
                button.className = 'btn btn-outline-danger btn-sm';
                button.innerText = 'Remove';
                removeTd.appendChild(button);

                tr.appendChild(firstNameTd);
                tr.appendChild(lastNameTd);
                tr.appendChild(emailTd);
                tr.appendChild(positionTd);
                tr.appendChild(removeTd);
                
                tbody.appendChild(tr);
                
                button.onclick = function()
                {
                    const Position = BestCoder.findPositionById(+employ._positionId);
                    Position.removeEmployee(employ._id);
                    tbody.innerHTML = '';
                    updateTable();
                }
                
                const removeAll = document.querySelector('.remove-all');
                removeAll.onclick = function()
                {
                    BestCoder._positions.forEach(pos =>
                        {
                            pos._employees.forEach(emp =>
                                {
                                   pos.removeEmployee(emp._id);
                                   table.classList.add('d-none');
                                   //updateTable();
                                })
                        })
                    
                    //position.removeEmployee(employ._id);
                    // tbody.innerHTML = '';
                    // updateTable();
                }
                
            })
            
        })
    }
    updateTable();
        
}

