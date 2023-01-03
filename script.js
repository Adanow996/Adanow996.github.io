const add_button = document.getElementById('button_add');
const price_field = document.getElementById('price');
const percentage_field = document.getElementById('concentration');
const volume_field = document.getElementById('volume');
const name_field = document.getElementById('name');
let measurements = [];

function add_contact(beer_name, price, percentage, volume){
    contact = document.createElement('div');
    contact.classList.add("contact");
    contact.name = "s" + measurements.length;
    document.body.appendChild(contact);
    description = document.createElement('div');
    description.innerHTML =  beer_name + "<br>Cena: \t" + price + " Procenty: \t" + percentage+ " Objętość: " + volume + "<br>Moc: " + (volume * percentage / 100.0 / price).toFixed(3) + " g / zł";
    contact.appendChild(description);
    remove = document.createElement('button');
    remove.innerHTML = "Usuń";
    contact.appendChild(remove);
    remove.addEventListener('click', remove_contact);
    measurements.push([beer_name, price, percentage, volume, measurements.length])
}

function add_user_contract(){
    if(!price_field.checkValidity() || !percentage_field.checkValidity() || !volume_field.checkValidity()){
        return;
    }
    add_contact(name_field.value, price_field.value, percentage_field.value, volume_field.value);
    save_contracts();
}

function save_contracts(){
    localStorage.setItem("measurements", JSON.stringify(measurements));
}

function remove_contact(e){
    document.body.removeChild(e.currentTarget.parentElement);
    name_to_remove = e.currentTarget.parentElement.name.substring(1);
    measurements = measurements.filter(x => x[4] != name_to_remove);
    save_contracts();
}

function load_contracts(){
    measurements_stored = JSON.parse(localStorage.getItem("measurements"));
    if(measurements_stored == null){
        measurements_stored = [];
    }
    for (var i = 0; i < measurements_stored.length; i++){
        add_contact(measurements_stored[i][0], measurements_stored[i][1], measurements_stored[i][2], measurements_stored[i][3]);
    }
}


load_contracts();

add_button.addEventListener('click', add_user_contract);
add_button.addEventListener('click', save_contracts);