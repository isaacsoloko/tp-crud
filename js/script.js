let form = document.querySelector('form');
let tbody = document.querySelector('table tbody');
let users = [];

form.addEventListener('submit', function(event){
    event.preventDefault();
    let data = new FormData(event.target);
    //On vérifie l'existence des données dans les inputs
    if (data.get('name').trim().length !== 0 &&
        data.get('password').trim().length !== 0 && 
        data.get('email').trim().length !== 0) {
        let user = {
            name : data.get('name').trim(),
            password : data.get('password').trim(),
            email : data.get('email').trim()
        }
        users.push(user);
        afficher();
        form.reset();
    }
    else{
        alert('Veuillez bien remplir les données');
    }
});

function afficher(){
    tbody.innerHTML = '';

    for(let i = 0; i < users.length; i++) {
        let ligne = `<tr>
            <td class="name-td">${users[i].name}</td>
            <td class="email-td">${users[i].email}</td>
            <td>
                <button type="button" onclick="updateUser(${i})">Modifier</button>
            </td>
            <td>
                <button type="button" onclick="deleteUser(${i})">Supprimer</button>
            </td>
        </tr>`

        tbody.innerHTML += ligne; 
    }
}

function deleteUser(index){
    users.splice(index, 1);
    afficher();
}

function updateUser(index){
    let inputs = document.querySelectorAll('input');
    //On vérifie s'il n'y a pas d'utilisateur en cour de modification
    if (inputs[0].value.trim().length !== 0 && 
    inputs[1].value.trim().length !== 0 && 
    inputs[2].value.trim().length !== 0) {
        alert('Un user est en cour de modification');
    }
    else{
        inputs[0].value = users[index].name;
        inputs[1].value = users[index].password;
        inputs[2].value = users[index].email;
        deleteUser(index);
    }
}