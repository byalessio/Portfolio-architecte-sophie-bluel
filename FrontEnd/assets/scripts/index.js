const API_URL = "http://localhost:5678/api";

async function getTravaux() {
  const response = await fetch(`${API_URL}/works`);
  const travaux = await response.json();
  afficherTravaux(travaux);
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
}

getTravaux();
getCategories();