const add_button = document.getElementById('button_add');
const price_field = document.getElementById('price');
const percentage_field = document.getElementById('concentration');
const volume_field = document.getElementById('volume');
const name_field = document.getElementById('name');
let counter = 0

function add_contact(){
    console.log(price_field);
    if(!price_field.checkValidity() || !percentage_field.checkValidity() || !volume_field.checkValidity()){
        return;
    }
    console.log("Add");
    contact = document.createElement('div');
    contact.classList.add("contact");
    contact.name = "s" + counter;
    document.body.appendChild(contact);
    names = document.createElement('div');
    names.innerHTML =  name_field.value + "<br>Cena: \t" + price_field.value + " Procenty: \t" + percentage_field.value + " Objętość: " + volume_field.value + "<br>Moc: " + (volume_field.value * percentage_field.value / 100.0 / price_field.value).toFixed(3) + " g / zł";
    contact.appendChild(names);
    remove = document.createElement('button');
    remove.innerHTML = "Usuń";
    contact.appendChild(remove);
    remove.addEventListener('click', remove_contact);
    // document.cookie = "s" + counter + "=" + name_field.value + " " + price_field.value + " " + percentage_field.value + " " + volume_field.value;
    counter++;
    // console.log("s" + counter + "=" + contact.innerHTML)
    // console.log("document.cookie = " + document.cookie);
}

function save_contract(){
    document.cookie = "s" + counter + "=" + name_field.value + " " + price_field.value + " " + percentage_field.value + " " + volume_field.value;
}

function remove_contact(e){
    console.log("Remove");
    console.log(e.currentTarget.parentElement);
    console.log(e.currentTarget.parentElement.name);
    document.body.removeChild(e.currentTarget.parentElement);

    document.cookie = e.currentTarget.parentElement.name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT'
}

function load_cookies() {
    var cookies = document.cookie.split(';');
    cookies[0] = " " + cookies[0];
    for(var i = 0; i < cookies.length; i++) {
       cookie = cookies[i].split("=");
       if(cookie.length != 2){
              continue;
       }
       cookie_name = cookie[0];
       data = cookie[1].split(" ");
       console.log(cookie_name);
       if(/s[0-9]+/.test(cookie_name)){
            console.log("Cookie substing:|" + cookie_name + "|" + cookie_name.substring(2) + "|" + parseInt(cookie_name.substring(2)) + "|");
            counter = parseInt(cookie_name.substring(2));
            console.log("Counter: " + counter);
           name_field.value = data[0];
           price_field.value = data[1];
           percentage_field.value = data[2];
           volume_field.value = data[3];
           add_contact();
       }
    }
    return "ret";
}

add_button.addEventListener('click', add_contact);
add_button.addEventListener('click', save_contract);
load_cookies();

