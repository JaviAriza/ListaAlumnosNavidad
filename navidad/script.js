const students = [];

document.getElementById('student-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const country = document.getElementById('country').value.trim();
    const educationLevel = document.getElementById('education-level').value;

    if (!name || !surname || !age || !country || !educationLevel) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    students.push({ name, surname, age, country, educationLevel });
    renderTable();
    event.target.reset(); 
});

function renderTable(filteredStudents = students) {
    const tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = ''; 

    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.age}</td>
            <td>${student.country}</td>
            <td>${student.educationLevel}</td>
            <td>
                <!-- Botones para editar o eliminar estudiantes -->
                <button onclick="editStudent(${index})">Editar</button>
                <button onclick="deleteStudent(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row); 
    });
}

function editStudent(index) {
    const student = students[index]; 
    document.getElementById('name').value = student.name;
    document.getElementById('surname').value = student.surname;
    document.getElementById('age').value = student.age;
    document.getElementById('country').value = student.country;
    document.getElementById('education-level').value = student.educationLevel;

    students.splice(index, 1); 
    renderTable();
}


function deleteStudent(index) {
    students.splice(index, 1); 
    renderTable();
}

document.getElementById('apply-filters').addEventListener('click', function () {
    const filterAge = document.getElementById('filter-age').value; 
    const filterCountry = document.getElementById('filter-country').value.trim().toLowerCase(); 
    const searchName = document.getElementById('search-name').value.trim().toLowerCase(); 
    const filteredStudents = students.filter(student => {
        return (
            (!filterAge || student.age === parseInt(filterAge)) &&
            (!filterCountry || student.country.toLowerCase().includes(filterCountry)) &&
            (!searchName || student.name.toLowerCase().includes(searchName))
        );
    });

    renderTable(filteredStudents); 
});

document.getElementById('clear-filters').addEventListener('click', function () {
    document.getElementById('filter-age').value = ''; 
    document.getElementById('filter-country').value = ''; 
    document.getElementById('search-name').value = '';
    renderTable(); 
});

renderTable();
