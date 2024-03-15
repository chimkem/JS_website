const listapohja = document.getElementById('tehtavapohja');  // Pohja
const tehtavaInput = document.getElementById('tehtava'); // Tekstikenttä

// V To-Do:n scripti: V

// Lisää tehtävä
function lisaa() {
    // Jos tehtäväkenttä ei ole tyhjä, lisätään tehtävä listaan.
    if (tehtavaInput.value !== '') {
        let li = document.createElement("li");
        li.innerHTML = tehtavaInput.value;

        let tehtavapohja = document.getElementById('tehtavapohja');
        tehtavapohja.appendChild(li);

    // lisätään perään ikoni poistamiselle bootstrapilla
        let del = document.createElement("span");
        del.innerHTML = "\uF6B6";
        li.appendChild(del);

        //Tyhjennetään tekstikenttä lähetyksen jälkeen ja logataan onnistuminen
        tehtavaInput.value = '';
        console.log("Tehtävä lisätty listaan");
    } 
    // ... Muuten soitetaan äänimerkki ja lyödään punainen reuna tehtävälistan ympärille kahdeksi sekunniksi.
    else {
        merkkiaani('/gallery/audio/Metallic.mp3');
        tehtava.style.border = "1px solid #ec7166";
        tehtava.style.borderRadius = "10px";

        setTimeout(function() {
            tehtava.style.border = "";
        }, 2000);

    // Tästäkin logit konsoliin
        console.log("Tyhjä kenttä!");
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



// V Extrajuttuja V
// Ilmoitetaan ettei kirjautuminen onnistu.
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
}

// Hampparimenu! :D
// Avautuu vain puhelimella klikkaamalla logoa, muuten heittää erroria konsoliin
function openMenu() {
    var navbar = document.getElementById('navbar');

    if (window.innerWidth <= 768) {
        navbar.classList.toggle('show');
        merkkiaani('/gallery/audio/Cartoon.mp3');
    }
    else {
        console.log(":)");
    }
}

// Lisätään merkkiäänimahdollisuus, koska miksi ei...
function merkkiaani(polku) {
    var merkki = new Audio(polku)
    merkki.loop = false;
    merkki.play();
}