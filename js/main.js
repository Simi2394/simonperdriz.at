/*-------Funktion für aktive Tabs in über mich*/
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

/*---------Funktion für sidemenu Smartphones----------*/
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

/*---------Funktion für Kontaktformular Responses----------*/
const form = document.getElementById('form');
const msg = document.getElementById('msg');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value
    });
    var json = JSON.stringify(object);
    msg.innerHTML = "Bitte warten..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                msg.innerHTML = json.message;
            } else {
                console.log(response);
                msg.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            msg.innerHTML = "Da ging etwas schief.";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
        });
});