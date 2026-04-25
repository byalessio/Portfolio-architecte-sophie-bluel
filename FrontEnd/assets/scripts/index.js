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

getTravaux();