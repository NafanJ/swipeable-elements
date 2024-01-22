let elements = [
    { id: 'element1', text: 'Swipe me away! (1)' },
    { id: 'element2', text: 'Swipe me away! (2)' },
    { id: 'element3', text: 'Swipe me away! (3)' },
    { id: 'element3', text: 'Swipe me away! (4)' },
    { id: 'element3', text: 'Swipe me away! (5)' }
];

const container = document.getElementById('container');

const createSwipeableElement = (element) => {
    const div = document.createElement('div');
    div.className = 'swipeable-element';
    div.id = element.id;
    div.textContent = element.text;
    container.appendChild(div);

    attachSwipeEvents(div);
};

const attachSwipeEvents = (elem) => {
    let startX, movedX, isDragging = false;

    const startDrag = (posX) => {
        startX = posX;
        movedX = 0;
        isDragging = true;
    };

    const moveDrag = (posX) => {
        if (isDragging) {
            movedX = posX - startX;
            elem.style.transform = `translateX(${movedX}px)`;
        }
    };

    const endDrag = () => {
        if (Math.abs(movedX) > 150) { // Swipe threshold
            elem.style.transition = 'transform 0.3s';
            elem.style.transform = `translateX(${movedX > 0 ? 1000 : -1000}px)`;
            setTimeout(() => {
                container.removeChild(elem);
                elements = elements.filter(el => el.id !== elem.id);
            }, 300);
        } else {
            elem.style.transition = 'transform 0.3s';
            elem.style.transform = 'translateX(0px)';
        }
        isDragging = false;
    };

    // Mouse Events
    elem.addEventListener('mousedown', (e) => startDrag(e.clientX), false);
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX), false);
    document.addEventListener('mouseup', endDrag, false);
    // Touch Events
    elem.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), false);
    elem.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX), false);
    elem.addEventListener('touchend', endDrag, false);
};

// Initial creation of elements
elements.forEach(createSwipeableElement);
