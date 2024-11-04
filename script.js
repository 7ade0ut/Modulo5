document.addEventListener('DOMContentLoaded', () => {
  const displayArea = document.getElementById('displayArea');
  const ranges = document.querySelectorAll('.range');

  // Función para obtener datos de la API y crear tarjetas de personajes
  async function fetchCharacters(start, end, colorClass) {
    displayArea.innerHTML = ''; // Limpiar el área de visualización antes de mostrar nuevos personajes

    for (let i = start; i <= end; i++) {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${i}/`);
        if (!response.ok) throw new Error(`Character ${i} not found`);
        const data = await response.json();

        // Crear una tarjeta para cada personaje
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        // Añadir imagen del personaje
        const characterImage = document.createElement('img');
        characterImage.src = `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`;
        characterImage.alt = data.name;
        characterCard.appendChild(characterImage);

        // Añadir contenido de texto
        characterCard.innerHTML += `
          <div class="dot ${colorClass}"></div>
          <h3>${data.name}</h3>
          <p>Estatura: ${data.height} cm</p>
          <p>Peso: ${data.mass} kg</p>
        `;
        displayArea.appendChild(characterCard);

      } catch (error) {
        console.error('Error fetching character:', error);
      }
    }
  }

  // Asignar evento de click a cada rango
  ranges.forEach(range => {
    range.addEventListener('click', () => {
      const [start, end] = range.getAttribute('data-range').split('-').map(Number);

      // Determinar el color según el rango
      const colorClass = start === 1 ? 'red' : start === 6 ? 'green' : 'blue';

      // Llamar a la función para obtener personajes del rango actual
      fetchCharacters(start, end, colorClass);
    });
  });
});
