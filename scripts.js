// Katsotaan välimuisti
let todo = JSON.parse(localStorage.getItem("MatoMissio")) || [];

// referoidaan DOM elementit
const tehtavapohja = document.getElementById('tehtavapohja');  // Pohja
const tehtavaInput = document.getElementById('tehtavanimi'); // Tekstikenttä
const addBtn = document.querySelector(".btn");

// ladataan aiemmat mahdolliset tehtävät ja esitetään ne konsolissa
window.onload = function() {
    tuoTehtavat();
    console.log(todo);
};

//----------------------------
// ToDo Listan toiminta
//----------------------------

// Lisää Tehtävä listaan
//----------------------------
function uusiTehtava() {
    const uusi = tehtavaInput.value.trim();
    // Jos tehtäväkentässä on yli 2 kirjainta, lisätään tehtävä listaan.
    if (uusi.length > 2) {
        todo.push({
            nimi: uusi,
            valmis: false
        });

        poistoNappi();
        tehtavaInput.value = "";
        tallenna();
        console.log("Tehtävä lisätty");
    } 
    // ...Muuten soitetaan äänimerkki ja lyödään punainen reuna tehtävälistan ympärille kahdeksi sekunniksi.
    else {
        merkkiaani('/gallery/audio/Metallic.mp3');
            tehtavaInput.style.border = "1px solid #ec7166";
            tehtavaInput.style.borderRadius = "10px";

        setTimeout(function() {
            tehtavaInput.style.border = "";
        }, 2000);

        console.log("Tyhjä kenttä tai liian lyhyt teksti!");
    }
}
// Tehtävien merkkaaminen ja poistaminen listalta
//----------------------------
tehtavapohja.addEventListener('click', function(event) {
    const target = event.target;

    if (target.tagName === "LI") {
        // Merkataan onko tehtävä tehty, default=false
        const tehtava = target;
        const tieto = Array.from(tehtavapohja.children).indexOf(tehtava);

        todo[tieto].valmis = !todo[tieto].valmis;

        // CSS & Äänimerkki
        tehtava.classList.toggle("valmis");
        merkkiaani('gallery/audio/Wood.mp3')
        console.log("Tehtävän tila muuttunut");
        tallenna();

    } else if (target.tagName === "SPAN") {
        // Poista tehtävä
        const tehtava = target.parentElement;
        const tieto = Array.from(tehtavapohja.children).indexOf(tehtava);

        // Poistetaan tiedot
        todo.splice(tieto, 1);
        tehtava.remove();

        tallenna();
        console.log("Tehtävä poistettu");
    }
}, false);


// Poistonappi
function poistoNappi() {
    const li = document.createElement("li");
    li.textContent = tehtavaInput.value;

    // Poistonappi tehtävien perään
    const del = document.createElement("span");
    del.innerHTML = "❌";
    li.appendChild(del);

    // Tehtävät listaan
    tehtavapohja.appendChild(li);
}

// Tuo Tehtavat
function tuoTehtavat() {
    // Tyhjennetään lista, ei haluta dublikaatteja
    tehtavapohja.innerHTML = '';

    //Lisätään järjestyksessä lista takaisin sivulle näkyville
    todo.forEach(function(tehtava) {
        const li = document.createElement("li");
        li.textContent = tehtava.nimi;

        // Poistonappi tehtävien perään
        const del = document.createElement("span");
        del.innerHTML = "❌";
        li.appendChild(del);

        // Jos tehtävä jo tehty, näytetään valmiina
        if (tehtava.valmis) {
            li.classList.add("valmis");
        }

        // Tehtävät listaan ja konsoliin logia
        tehtavapohja.appendChild(li);
        console.log("Tiedot palautettu välimuistista");
    });
}

// Tallennus välimuistiin
function tallenna() {
    localStorage.setItem("MatoMissio", JSON.stringify(todo));
}

// "Unohda minut" -toiminto
function forgetMe() {;
    alert("Nollataan sivu...");
    localStorage.clear();
    location.reload();
}

// Ilmoitetaan, ettei voi kirjautua
function login() {
    alert("Jotain meni vikaan, yritä myöhemmin uudelleen!");
}

// Hampparimenu! :D, vain puhelimelle, muuten heittää varoitusta konsoliin.
function openMenu() {
    var navbar = document.getElementById('navbar');

    if (window.innerWidth <= 768) {
        navbar.classList.toggle('show');
        merkkiaani('/gallery/audio/Cartoon.mp3');
    }
    else {
        console.warn("Jätä Gilbert rauhaan!");
    }
}

// Merkkiääni toiminto
function merkkiaani(polku) {
    var merkki = new Audio(polku)
    merkki.loop = false;
    merkki.play();
}