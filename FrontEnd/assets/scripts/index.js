const API_URL = "http://localhost:5678/api";
let tousLesTravaux = [];

async function getTravaux() {
  const response = await fetch(`${API_URL}/works`);
  tousLesTravaux = await response.json();
  afficherTravaux(tousLesTravaux);
}

function afficherTravaux(travaux) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  travaux.forEach((travail) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = travail.imageUrl;
    img.alt = travail.title;
    figcaption.textContent = travail.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  const categories = await response.json();
  afficherFiltres(categories);
}

function afficherFiltres(categories) {
  const filters = document.querySelector(".filters");
  filters.innerHTML = "";

  const btnTous = document.createElement("button");
  btnTous.textContent = "Tous";
  btnTous.classList.add("active");
  filters.appendChild(btnTous);

  categories.forEach((categorie) => {
    const btn = document.createElement("button");
    btn.textContent = categorie.name;
    btn.dataset.id = categorie.id;
    filters.appendChild(btn);
  });

  gererFiltres();
}

function gererFiltres() {
  const boutons = document.querySelectorAll(".filters button");

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", (event) => {
      boutons.forEach((b) => b.classList.remove("active"));
      event.target.classList.add("active");

      const id = event.target.dataset.id;

      if (!id) {
        afficherTravaux(tousLesTravaux);
      } else {
        const travauxFiltres = tousLesTravaux.filter(
          (t) => t.categoryId === Number(id)
        );
        afficherTravaux(travauxFiltres);
      }
    });
  });
}

getTravaux();
getCategories();