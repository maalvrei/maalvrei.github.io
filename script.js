document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.threeCardsContainer > div');
    const originalClasses = new Map();

    // Función para actualizar la imagen de una tarjeta
    function updateCardImage(cardElement) {
        const img = cardElement.querySelector('figure img');
        if (!img) return; // Si no hay imagen, salimos

        // Obtener las rutas de imagen desde los atributos data-*
        const blackSrc = img.dataset.blackSrc;
        const whiteSrc = img.dataset.whiteSrc;

        if (cardElement.classList.contains('principalCard')) {
            // Si la tarjeta es principal, usa la imagen blanca
            img.src = whiteSrc;
        } else {
            // Si la tarjeta es secundaria, usa la imagen negra
            img.src = blackSrc;
        }
    }

    cards.forEach(card => {
        // Guarda las clases iniciales de cada tarjeta
        originalClasses.set(card, Array.from(card.classList));

        // Actualiza la imagen al cargar la página para asegurar el estado inicial correcto
        // Esto es importante si el HTML inicial no siempre coincide con la imagen correcta
        updateCardImage(card);

        // Solo queremos que las secondaryCard reaccionen al hover
        if (card.classList.contains('secondaryCard')) {
            card.addEventListener('mouseenter', () => {
                cards.forEach(otherCard => {
                    if (otherCard === card) {
                        otherCard.classList.remove('secondaryCard');
                        otherCard.classList.add('principalCard');
                    } else {
                        otherCard.classList.remove('principalCard');
                        otherCard.classList.add('secondaryCard');
                    }
                    // Llama a la función para actualizar la imagen después de cambiar la clase
                    updateCardImage(otherCard);
                });
            });

            card.addEventListener('mouseleave', () => {
                cards.forEach(otherCard => {
                    otherCard.className = ''; // Limpia todas las clases
                    originalClasses.get(otherCard).forEach(cls => {
                        otherCard.classList.add(cls);
                    });
                    // Llama a la función para actualizar la imagen después de restaurar la clase
                    updateCardImage(otherCard);
                });
            });
        }
    });

    // Manejar el caso inicial de la principalCard original si no es hoverable
    // Esto asegura que su imagen también se actualice si cambia a secondaryCard
    const initialPrincipalCard = document.querySelector('.threeCardsContainer .principalCard');
    if (initialPrincipalCard && !initialPrincipalCard.classList.contains('secondaryCard')) {
        // Si la principalCard original no tiene los listeners de hover,
        // necesitamos asegurar que su imagen se actualice si su clase es modificada por otro hover.
        // No necesita un listener aquí, ya que el loop de mouseenter/mouseleave la manejará.
        // Solo la actualizamos inicialmente
        updateCardImage(initialPrincipalCard);
    }
});