const add_button = document.getElementById('button_add');
const price_field = document.getElementById('price');
const percentage_field = document.getElementById('concentration');
const volume_field = document.getElementById('volume');
const name_field = document.getElementById('name');
const container = document.getElementById('container');
const sort_input = document.getElementById('sort');
let measurements = [];

function add_contact(beer_name, price, percentage, volume, date){
    if (date == undefined){
        date = Date.now();
    }
    contact = document.createElement('div');
    contact.classList.add("contact");
    contact.name = "s" + measurements.length;
    container.appendChild(contact);
    description = document.createElement('div');
    description.innerHTML =  beer_name + "<br>Cena: \t" + price + " Procenty: \t" + percentage+ " Objętość: " + volume + "<br>Moc: " + (volume * percentage / 100.0 / price).toFixed(3) + " g / zł";
    contact.appendChild(description);
    remove = document.createElement('button');
    remove.innerHTML = "Usuń";
    contact.appendChild(remove);
    remove.addEventListener('click', remove_contact);
    measurements.push([beer_name, price, percentage, volume, date, measurements.length]);
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
    container.removeChild(e.currentTarget.parentElement);
    name_to_remove = e.currentTarget.parentElement.name.substring(1);
    measurements = measurements.filter(x => x[5] != name_to_remove);
    save_contracts();
}

function load_contracts_from_storage(){
    measurements_stored = JSON.parse(localStorage.getItem("measurements"));
    if(measurements_stored == null){
        measurements_stored = [];
    }
    for (var i = 0; i < measurements_stored.length; i++){
        add_contact(measurements_stored[i][0], measurements_stored[i][1], measurements_stored[i][2], measurements_stored[i][3], measurements_stored[i][4]);
    }
}

function sort(){
    if(sort_input.value == "n"){
        measurements.sort((a, b) => a[0].localeCompare(b[0]));
    } else if(sort_input.value == "rc"){
        measurements.sort((a, b) => a[1] - b[1]);
    } else if(sort_input.value == "mc"){
        measurements.sort((a, b) => b[1] - a[1]);
    } else if(sort_input.value == "ro"){
        measurements.sort((a, b) => a[3] - b[3]);
    } else if(sort_input.value == "mo"){
        measurements.sort((a, b) => b[3] - a[3]);
    } else if(sort_input.value == "rs"){
        measurements.sort((a, b) => a[2] - b[2]);
    } else if(sort_input.value == "ms"){
        measurements.sort((a, b) => b[2] - a[2]);
    } else if(sort_input.value == "rm"){
        measurements.sort((a, b) => a[3] * a[2] / a[1] - b[3] * b[2] / b[1]);
    } else if(sort_input.value == "mm"){
        measurements.sort((a, b) => b[3] * b[2] / b[1] - a[3] * a[2] / a[1]);
    } else if(sort_input.value == "d"){
        measurements.sort((a, b) => a[4] - b[4]);
    } 
    save_contracts();
    measurements = [];
    container.innerHTML = "";
    load_contracts_from_storage();

}


load_contracts_from_storage();
add_button.addEventListener('click', add_user_contract);
add_button.addEventListener('click', save_contracts);
sort_input.addEventListener('change', sort);