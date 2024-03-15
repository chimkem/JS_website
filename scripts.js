// Katsotaan välimuisti
let todo = JSON.parse(localStorage.getItem("MatoMissio")) || [];

// referoidaan DOM elementit
const tehtavapohja = document.getElementById('tehtavapohja');  // Pohja
const tehtavaInput = document.getElementById('tehtavanimi'); // Tekstikenttä
const addBtn = document.querySelector(".btn");

// ladataan aiemmat mahdolliset tehtävät
window.onload = function() {
    tuoTehtavat();
};

//----------------------------
// ToDo Listan toiminta
//----------------------------

// Lisää Tehtävä listaan
//----------------------------
function uusiTehtava() {
    const uusi = tehtavaInput.value.trim();
    // Jos tehtäväkentässä on yli 3 kirjainta, lisätään tehtävä listaan.
    if (uusi.length > 3) {
        todo.push({
            nimi: uusi,
            ready: false
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

        console.error("Tyhjä kenttä tai liian lyhyt teksti!");
    }
}
// Tehtävien merkkaaminen ja poistaminen listalta
//----------------------------
tehtavapohja.addEventListener('click', function(event) {
    const target = event.target;

    if (target.tagName === "LI") {
        // Merkataan onko tehtävä tehty, default=false
        const listItem = target;
        const index = Array.from(tehtavapohja.children).indexOf(listItem);

        todo[index].ready = !todo[index].ready;

        listItem.classList.toggle("valmis");
        console.log("Tehtävän tila muuttunut");
        tallenna();

    } else if (target.tagName === "SPAN") {
        // Poista tehtävä
        const listItem = target.parentElement;
        const index = Array.from(tehtavapohja.children).indexOf(listItem);

        // Poistetaan tiedot
        todo.splice(index, 1);
        listItem.remove();

        tallenna();
        console.log("Tehtävä poistettu");
    }
}, false);


// Poistonappi
function poistoNappi() {
    const li = document.createElement("li");
    li.textContent = tehtavaInput.value;

    const del = document.createElement("span");
    del.innerHTML = "❌";
    li.appendChild(del);

    tehtavapohja.appendChild(li);
}

// Tuodaan tehtävät takaisin sivulle välimuistista
function tuoTehtavat() {
    // Tyhjennetään lista, ei haluta dublikaatteja
    tehtavapohja.innerHTML = '';

    //Lisätään järjestyksessä lista takaisin sivulle
    todo.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task.nimi;

        // Poistonappi
        const del = document.createElement("span");
        del.innerHTML = "❌";
        li.appendChild(del);

        // Jos tehtävä tehty, merkataan valmiiksi
        if (task.ready) {
            li.classList.add("valmis");
        }

        tehtavapohja.appendChild(li);
        console.warn("Tehtava palautettu välimuistista!");
    });
}

// Tallennus välimuistiin
function tallenna() {
    localStorage.setItem("MatoMissio", JSON.stringify(todo));
}

// Tyhjennä koko sivu
function forgetMe() {;
    alert("Nollataan sivu...");
    localStorage.clear();
    location.reload()
}

// Ilmoitetaan ettei kirjautuminen onnistu.
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

// Merkkiäänet
function merkkiaani(polku) {
    var merkki = new Audio(polku)
    merkki.loop = false;
    merkki.play();
}