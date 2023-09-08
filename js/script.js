//Recuperation du formulaire
let form = document.querySelector('form');
//Notre tbody qui contiendra la liste des users
let tbody = document.querySelector('table tbody');
let users = [];
//Indice permettant de stocker la position de l'utilisateur sélectionné pour modification
let indexElementChoisi = -1;

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
        //On vérifie quelle action à éxecuter
        if (data.get('action').trim() === 'creer') {
            users.push(user);
        }
        else{
            //Dans ce cas c-à-d que l'action vaut modifier
            //On écrase l'ancien user contenant les anciennes infos
            users[indexElementChoisi] = user;
            let inputs = document.querySelectorAll('input');
            //Champ action
            inputs[3].value = 'creer';
            //Champ représentant le bouton
            inputs[4].value = 'Créer user';
            //On remet à -1
            indexElementChoisi = -1;
        }
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

//Fonction permettant de supprimer l'utilisateur
function deleteUser(index){
    users.splice(index, 1);
    afficher();
}

//Fonction permettant la mise à jour de l'utilisateur
function updateUser(index){
    indexElementChoisi = index;
    //On recupère tous les champs du formulaire pour les remplir par les anciennes valeurs de l'utilisateur
    let inputs = document.querySelectorAll('input');
    //Champ name
    inputs[0].value = users[index].name;
    //Champ password
    inputs[1].value = users[index].password;
    //Champ email
    inputs[2].value = users[index].email;
    //Champ action
    inputs[3].value = 'modifier';
    //Champ représentant le bouton
    inputs[4].value = 'Modifier';
}