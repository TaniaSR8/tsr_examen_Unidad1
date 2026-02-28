const formBuscar = document.getElementById("formBuscar");
const contentData = document.getElementById("contentData");
const parametro = document.getElementById("parametro"); 
const fechafrom = document.getElementById("fechafrom"); 
const fechato = document.getElementById("fechato"); 
const btnBuscar = document.getElementById("btnBuscar");

const apiKey = "0e1a4386d4ea40f393b9cc81a94df178";

const obtenerDatos = async () => {
    const url = `https://newsapi.org/v2/everything?q=apple&from=2026-02-22&to=2026-02-22&sortBy=popularity&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();


    data.articles.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("col-12", "col-md-6", "mb-4");

        card.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">${element.title}</h5>
              <img src="${element.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFhNLjRKHgrAPc6QcPbyLKcqHWmrMS6ZOqg&s'}" class="card-img-top" alt="Imagen noticia">
              <p class="card-text">${element.description || 'Sin descripción disponible'}</p>
              <p class="card-text">Medio: ${element.source.name}</p>
              <p class="card-text">${element.publishedAt}</p>
              <a href="${element.url}" target="_blank" class="card-link" >Ver noticia</a>
            </div>
          </div>`;
        contentData.appendChild(card);
    });
};


const buscarNoticias = async (event) => {
    event.preventDefault();

    if (parametro.value === "" && fechafrom.value === "" && fechato.value === "") {
        contentData.innerHTML = "<p>Debes ingresar al menos 1 parámetro</p>";
        return;
    }

    let url = "https://newsapi.org/v2/everything?";
    if (parametro.value) {
        url += `q=${parametro.value}&`;
    }
    if (fechafrom.value) {
        url += `from=${fechafrom.value}&`;
    }
    if (fechato.value) {
        url += `to=${fechato.value}&`;
    }

    url += `sortBy=popularity&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
        contentData.innerHTML = "<h2>Resultados</h2>";

        data.articles.forEach(element => {
            const card = document.createElement("div");
            card.classList.add("col-12", "col-md-6", "mb-4");

            card.innerHTML = `
              <div class="card h-100 shadow-sm border-0">
                <div class="card-body">
                  <h5 class="card-title text-primary fw-bold">${element.title}</h5>
                  <img src="${element.urlToImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFhNLjRKHgrAPc6QcPbyLKcqHWmrMS6ZOqg&s'}" class="card-img-top" alt="Imagen noticia">
                  <p class="card-text">${element.description || 'Sin descripción disponible'}</p>
                  <p class="card-text">Medio: ${element.source.name}</p>
                  <p class="card-text">${element.publishedAt}</p>
                  <a href="${element.url}" target="_blank" class="card-link">Ver noticia</a>
                </div>
              </div>`;
            contentData.appendChild(card);
        });
    } else {
        contentData.innerHTML = "<p>No se encontraron resultados</p>";
    }
};


obtenerDatos();


formBuscar.addEventListener("submit", buscarNoticias);
