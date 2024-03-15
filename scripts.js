const listapohja = document.getElementById('tehtavapohja');
const tehtavaInput = document.getElementById('tehtava');

// Kirjautumisnappi
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
}

// Merkkiäänet, koska miksi ei
function playSound() {
    var sound = new Audio('/gallery/audio/Cartoon.mp3')
    sound.loop = false;
    sound.play();

    
}
function playSound2() {
    var metalli = new Audio('/gallery/audio/Metallic Clank.mp3')
    metalli.loop = false;
    metalli.play();
}

// To-Do

// Lisää tehtävä
function lisaa() {
    // Jos tehtäväkenttä on ei ole tyhjä, lisätään tehtävä listaan.
    if(tehtavaInput.value !== '') {
        let li = document.createElement("li");
        li.innerHTML = tehtavaInput.value;
        listapohja.appendChild(li);

        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        //Tyhjennetään tekstikenttä lähetyksen jälkeen
        tehtavaInput.value = '';
    } 
    // ... Muuten soitetaan äänimerkki ja lyödään punainen reuna tehtävälistan ympärille kahdeksi sekunniksi.
    else{
        playSound2();
        tehtava.style.border = "1px solid #ec7166";
        tehtava.style.borderRadius = "10px";

        setTimeout(function() {
            tehtava.style.border = "";
        }, 2000);
    }
}
// Suorita tehtävä
function suorita() {

}
// Poista tehtävä
function poista() {

}
// Tallenna tiedot sivun välimuistiin
function tallenna() {

}
// Extra: Muokkaa tehtävää
