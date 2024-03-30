function FungsiGet() {
    fetch('http://127.0.0.1:3000/tasks')
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; 
            let index = 1;
            data.data.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index}</td>
                    <td>${task.judul}</td>
                    <td>${task.deskripsi}</td>
                    <td>${task.due_date}</td>
                    <td>${task.completed ? 'Done' : 'Todo'}</td>
                    <td>
                        <button class="deleteButton" data-id="${task.id}">Delete</button>
                        <button class="updateButton" data-id="${task.id}">Update</button>
                        <button onclick="selectTask(${task.id}, '${task.judul}', '${task.deskripsi}', '${task.due_date}')">Pilih</button>

                    </td>
                `;
                row.querySelector('.deleteButton').addEventListener('click', function() {
                    const taskId = this.getAttribute('data-id');
                    deleteData(taskId);
                });
                row.querySelector('.updateButton').addEventListener('click', function() {
                    const taskId = this.getAttribute('data-id');
                    openUpdateModal(taskId);
                });
                todoList.appendChild(row);
                index++;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function deleteData(taskId) {
    fetch(`http://127.0.0.1:3000/task/delete/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data berhasil dihapus:', result);
        fetchTodos(); 
    })
    .catch(error => console.error('Error deleting data:', error));
}

function openUpdateModal(taskId) {
    
    fetch(`http://127.0.0.1:3000/task/get/${taskId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('updateJudul').value = data.data.judul;
            document.getElementById('updateDeskripsi').value = data.data.deskripsi
            document.getElementById('updateTaskButton').setAttribute('data-id', taskId);
        })
        .catch(error => console.error('Error fetching task details:', error));
}
document.getElementById('updateTaskButton').addEventListener('click', function() {
    const newJudul = document.getElementById('updateJudul').value;
    const newDeskripsi = document.getElementById('updateDeskripsi').value;
    const newDueDate = document.getElementById('updateDueDate').value;

    const taskId = document.getElementById('updateTaskButton').getAttribute('data-id');
    const newData = {
        judul: newJudul,
        deskripsi: newDeskripsi,
        due_date: newDueDate
    };

    updateTask(taskId, newData);
});
function updateTask(id, newData) {
    fetch(`http://127.0.0.1:3000/task/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data berhasil diupdate:', result);
        FungsiGet();
    })
    .catch(error => console.error('Error updating data:', error));
}
FungsiGet();

document.getElementById('addButton').addEventListener('click', function() {
    
    const judul = document.getElementById('judul').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const due_date = document.getElementById('due_date').value;

    
    const newData = {
        judul: judul,
        deskripsi: deskripsi,
        due_date: due_date
    };

    
    postDataToInsert(newData);
});

function postDataToInsert(newData) {
    fetch('http://127.0.0.1:3000/task/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data berhasil ditambahkan:', result);
        FungsiGet(); 
    })
    .catch(error => console.error('Error adding data:', error));
}