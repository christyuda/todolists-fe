function fetchTodos() {
    fetch('http://127.0.0.1:3000/tasks')
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; 
            let index = 1;
            data.data.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index++}</td>
                    <td>${task.judul}</td>
                    <td>${task.deskripsi}</td>
                    <td>${task.due_date}</td>
                    <td>${task.completed ? 'Yes' : 'No'}</td>
                `;
                todoList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

fetchTodos(); document.getElementById('addButton').addEventListener('click', function() {
    postData();
});

function postData() {
    const judul = document.getElementById('judul').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const due_date = document.getElementById('due_date').value;

    const data = {
        judul: judul,
        deskripsi: deskripsi,
        due_date: due_date
    };

    fetch('http://127.0.0.1:3000/task/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Data berhasil ditambahkan:', result);
        // Refresh list after successful addition
        fetchTodos();
    })
    .catch(error => console.error('Error adding data:', error));
}