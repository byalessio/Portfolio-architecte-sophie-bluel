const API_URL = "http://localhost:5678/api";

const form = document.querySelector("#login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 401) {
      afficherErreur("E-mail ou mot de passe incorrect");
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";

  } catch (error) {
    console.error(error);
    afficherErreur("Une erreur est survenue, réessayez");
  }
});

function afficherErreur(message) {
  const erreur = document.querySelector("#login-error");
  erreur.textContent = message;
  erreur.style.display = "block";
}