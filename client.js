function allReservations(){
    
    const url = 'http://localhost:3000/allReservations';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        result = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
        
        var table = document.getElementById("firstTabOverall");
        document.getElementById("firstTabOverall").innerHTML = "";
    // helper function        
    function addCell(tr, text) {
        var td = tr.insertCell();
        td.textContent = text;
        return td;
    }

    // create header 
    var thead = table.createTHead();
    var headerRow = thead.insertRow();
    addCell(headerRow, 'User Name');
    addCell(headerRow, 'Start Date');
    addCell(headerRow, 'Start Time');
    addCell(headerRow, 'Num Hours');

    // insert data
    result.forEach(function (item) {
        var row = table.insertRow();
        addCell(row, item.name);
        addCell(row, item.startDate);
        addCell(row, item.startTime);
        addCell(row, item.numHours);
    });


    };
    xhr.onerror = function() {
        console.log('Error occurred.');
    };
    xhr.send();
}



function modifyReservation(userName,startDate,startTime,numHours){
    console.log("in modify");
    console.log(userName,startDate,startTime,numHours);
    const url = `http://localhost:3000/update/${userName}/${startDate}/${startTime}/${numHours}`;
    console.log(url);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        data = xhr.responseText;
        console.log("Entry added!");
    };
    xhr.onerror = function() {
        console.log('Error occurred.');
    };
    xhr.send();
}


const thisForm = document.getElementById('collectData');
thisForm.addEventListener('submit', function (e) {
    console.log("qqqqqq");
    e.preventDefault();
    userName = document.getElementById('fname').value;
    startDate = document.getElementById('startDate').value;
    startTime = document.getElementById('startTime').value;
    numHours = document.getElementById('numHours').value
    
    console.log(userName,startDate,startTime,numHours);
    modifyReservation(userName,startDate,startTime,numHours);
});

function deleteUserfunc(userName){
    const url = `http://localhost:3000/delete/${userName}`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        data = xhr.responseText;
        console.log(data);
        var x = document.getElementById("snackbar");
        x.innerHTML = `<p>${data}</p>`;
        setTimeout(function(){ x.className = x.className.replace("show", ""); 
        console.log("is timeout working?");
        }, 3000);
    };
    xhr.onerror = function() {
        console.log('Error occurred.');
    };
    xhr.send();
}
const deleteUser = document.getElementById("deleteButton");
deleteUser.addEventListener('submit', function(e){
    e.preventDefault();
    userName = document.getElementById('userName').value;
    console.log(`Deleting User ${userName}`);
    deleteUserfunc(userName);
});


function addUserFunc(userName){
    const url = `http://localhost:3000/addUser/${userName}`
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        data = xhr.responseText;
        console.log(data);
    };
    xhr.onerror = function() {
        console.log('Error occurred.');
    };
    xhr.send();
};

const addUser = document.getElementById("justAddUser");
addUser.addEventListener('submit', function(e){
    e.preventDefault();
    userName = document.getElementById('addUserName').value;
    console.log(`Adding User ${userName}`);
    addUserFunc(userName);
});