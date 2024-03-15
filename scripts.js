const listapohja = document.getElementById('tehtavapohja');  // Pohja
const tehtavaInput = document.getElementById('tehtava'); // Tekstikenttä

//---------------------
// Selaimen välimuisti
//---------------------

// Haetaan välimuisti
function tehtavamuisti(){
    listapohja.innerHTML = localStorage.getItem("ToDo");
}
// Tallennus välimuistiin
function tallenna(){
    localStorage.setItem("ToDo", tehtavapohja.innerHTML);
}

//----------------------------
// Tehtävien lisäys ja poisto
//----------------------------

function lisaa() {
    // Jos tehtäväkenttä ei ole tyhjä, lisätään tehtävä listaan.
    if (tehtavaInput.value !== '') {
        let li = document.createElement("li");
        li.innerHTML = tehtavaInput.value;
        
        let tehtavapohja = document.getElementById('tehtavapohja');
        
        // Halusin lisätä nämä listaan siten, että uusin on korkeimpana.
        if (tehtavapohja.firstChild) {
            tehtavapohja.insertBefore(li, tehtavapohja.firstChild);
        }
        else {
            tehtavapohja.appendChild(li);
        }
            
        // lisätään perään ikoni poistamiselle
        let del = document.createElement("span");
        del.innerHTML = "❌";
        li.appendChild(del);

        //Tyhjennetään tekstikenttä lähetyksen jälkeen ja logataan onnistuminen
        tehtavaInput.value = '';
        tallenna();
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


//-------------------------
// Tehtävien merkitseminen
//-------------------------

//Jos klikataan tehtävää, se merkitään tehdyksi
listapohja.addEventListener('click', function(teht){
    if (teht.target.tagName === "LI") {
        teht.target.classList.toggle("valmis");

        tallenna();
        console.log("Tehtävän tila on muuttunut");
    }
// Jos klikataan ruksia, se poistetaan välimuistista ja soitetaan äänimerkki
    else if (teht.target.tagName === "SPAN"){
        teht.target.parentElement.remove();
        merkkiaani('gallery/audio/Wood.mp3')
        tallenna();
        console.log("Tehtävä poistettu");
    }
}, false);

// Extra: Muokkaa tehtävää

//--------
// Extra
//--------

// Ilmoitetaan ettei kirjautuminen onnistu.
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
}

// Hampparimenu! :D
// Avautuu vain puhelimella klikkaamalla logoa, muuten heittää vain tekstiä konsoliin
function openMenu() {
    var navbar = document.getElementById('navbar');

    if (window.innerWidth <= 768) {
        navbar.classList.toggle('show');
        merkkiaani('/gallery/audio/Cartoon.mp3');
    }
    else {
        console.log("Här är Gilbert");
    }
}

// Lisätään merkkiäänimahdollisuuksia, koska miksi ei...
function merkkiaani(polku) {
    var merkki = new Audio(polku)
    merkki.loop = false;
    merkki.play();
}

// Täällä lopussa ajetaan komento lukea välimuistista tehtävät
tehtavamuisti();