console.log("Hello from script.js");
button = document.getElementById("connect");

button.addEventListener('pointerup', function(event) {
    navigator.bluetooth.requestDevice({
        filters: [{
          name: 'Francois robot'
        }],
        optionalServices: ['battery_service'] // Required to access service later.
      })
      .then(device => { /* … */ })
      .catch(error => { console.error(error); });
  });

