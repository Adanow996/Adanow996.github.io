const add_button = document.getElementById('button_add');
const price_field = document.getElementById('price');
const percentage_field = document.getElementById('concentration');
const volume_field = document.getElementById('volume');
const name_field = document.getElementById('name');

function add_contact(){
    console.log(price_field);
    if(!price_field.checkValidity() || !percentage_field.checkValidity() || !volume_field.checkValidity()){
        return;
    }
    console.log("Add");
    contact = document.createElement('div');
    contact.classList.add("contact");
    document.body.appendChild(contact);
    names = document.createElement('div');
    names.innerHTML =  name_field.value + "<br>Cena: \t" + price_field.value + " Procenty: \t" + percentage_field.value + " Objętość: " + volume_field.value + "<br>Moc: " + (volume_field.value * percentage_field.value / 100.0 / price_field.value).toFixed(3) + " g / zł";
    contact.appendChild(names);
    remove = document.createElement('button');
    remove.innerHTML = "Usuń";
    contact.appendChild(remove);
    remove.addEventListener('click', remove_contact);
}

function remove_contact(e){
    console.log("Remove");
    console.log(e.currentTarget.parentElement);
    document.body.removeChild(e.currentTarget.parentElement);
}

add_button.addEventListener('click', add_contact);