    const modal = document.getElementById('card-modal');
    const modalImg = document.getElementById('modal-img-display');
    const cardSides = ["133.png", "132.png"];
    let currentSide = 0;

    function openModal(index) {
        currentSide = index;
        modalImg.src = cardSides[currentSide];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function switchSide(direction) {
        currentSide = (currentSide + direction + 2) % 2;
        modalImg.src = cardSides[currentSide];
    }

    // Mouse Listeners
    document.getElementById('trigger-front').onclick = () => openModal(0);
    document.getElementById('trigger-back').onclick = () => openModal(1);
    document.querySelector('.modal-close').onclick = closeModal;
    document.querySelector('.arrow-left').onclick = () => switchSide(-1);
    document.querySelector('.arrow-right').onclick = () => switchSide(1);

    // Keyboard Listeners
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === "ArrowLeft") switchSide(-1);
            if (e.key === "ArrowRight") switchSide(1);
            if (e.key === "Escape") closeModal();
        }
    });

    window.onclick = (e) => { if (e.target == modal) closeModal(); };
