document.addEventListener('DOMContentLoaded', () => {
    // Selecciona TODAS las tarjetas que tengan la clase 'principalCard' o 'secondaryCard'
    // independientemente de su contenedor.
    const cards = document.querySelectorAll('.principalCard, .secondaryCard');
    
    // Almacena las clases originales de cada tarjeta para restaurarlas
    const originalClasses = new Map();

    // Función para actualizar la imagen de una tarjeta (ignorará si no tiene imagen)
    function updateCardImage(cardElement) {
        const img = cardElement.querySelector('figure img');
        if (!img) return; // Si no hay imagen (como en las nuevas tarjetas), la función termina aquí.

        const blackSrc = img.dataset.blackSrc;
        const whiteSrc = img.dataset.whiteSrc;

        if (cardElement.classList.contains('principalCard')) {
            img.src = whiteSrc;
        } else {
            img.src = blackSrc;
        }
    }

    cards.forEach(card => {
        // Guarda las clases iniciales de cada tarjeta (puede ser 'secondaryCard' o 'principalCard')
        originalClasses.set(card, Array.from(card.classList));

        // Actualiza la imagen al cargar la página para asegurar el estado inicial correcto
        // Esto es importante para todas las tarjetas que contengan una imagen.
        updateCardImage(card);

        // Solo queremos que las 'secondaryCard' reaccionen al hover para iniciar el cambio
        if (card.classList.contains('secondaryCard')) {
            card.addEventListener('mouseenter', () => {
                // Al pasar el ratón, iterar sobre todas las tarjetas
                cards.forEach(otherCard => {
                    if (otherCard === card) {
                        // Es la tarjeta sobre la que estamos pasando el ratón: la hacemos principal
                        otherCard.classList.remove('secondaryCard');
                        otherCard.classList.add('principalCard');
                    } else {
                        // Son las otras tarjetas: las hacemos secundarias
                        otherCard.classList.remove('principalCard');
                        otherCard.classList.add('secondaryCard');
                    }
                    // Llama a la función para actualizar la imagen después de cambiar la clase
                    updateCardImage(otherCard);
                });
            });

            card.addEventListener('mouseleave', () => {
                // Al salir del ratón, restauramos las clases originales a todas las tarjetas
                cards.forEach(otherCard => {
                    otherCard.className = ''; // Limpia todas las clases existentes
                    // Añade las clases originales que habíamos guardado
                    originalClasses.get(otherCard).forEach(cls => {
                        otherCard.classList.add(cls);
                    });
                    // Llama a la función para actualizar la imagen después de restaurar la clase
                    updateCardImage(otherCard);
                });
            });
        }
    });

    // La sección que actualizaba la initialPrincipalCard ya no es necesaria
    // porque el bucle inicial `cards.forEach(card => { updateCardImage(card); });`
    // ya se encarga de que todas las imágenes estén en su estado correcto al cargar la página.
});