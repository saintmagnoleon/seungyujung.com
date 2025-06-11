let currentIndex = 0;
const works = document.querySelectorAll(".media-gallery img, .media-gallery video, .media-gallery-random img, .media-gallery-random video");
let debounceTimer;

function openLightbox(index) {
    if (index < 0 || index >= works.length) return;

    currentIndex = index; // Update current index
    const media = works[index];
    const lightbox = document.getElementById("lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxVideo = document.getElementById("lightbox-video");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");

    // Update title and description
    lightboxTitle.textContent = media.getAttribute("data-title") || "Untitled";
    lightboxDescription.textContent = media.getAttribute("data-description") || "No description available.";

    // Check if it's an image or a video
    if (media.tagName.toLowerCase() === "video") {
        lightboxVideo.src = media.src || media.querySelector("source")?.src;
        lightboxVideo.style.display = "block";
        lightboxImg.style.display = "none";
    } else {
        lightboxImg.src = media.src;
        lightboxImg.style.display = "block";
        lightboxVideo.style.display = "none";
    }

    lightbox.style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox-modal").style.display = "none";
}

function changeImage(direction) {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
        currentIndex += direction;
        if (currentIndex >= works.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = works.length - 1;
        openLightbox(currentIndex);
    }, 200);
}


// PROGRESS BAR ANIMATION
window.addEventListener("scroll", function() {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.width = scrollPercent + "%";
});




// Wait for the DOM to load and add event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".arrow.left").addEventListener("click", () => changeImage(-1));
    document.querySelector(".arrow.right").addEventListener("click", () => changeImage(1));

    works.forEach((element, index) => {
        element.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    // Add event listener for keyboard navigation
    document.addEventListener("keydown", (event) => {
        if (document.getElementById("lightbox-modal").style.display === "flex") { // Check if lightbox is open
            if (event.key === "ArrowLeft") {
                changeImage(-1); // Move to previous image/video
            } else if (event.key === "ArrowRight") {
                changeImage(1); // Move to next image/video
            } else if (event.key === "Escape") {
                closeLightbox(); // Close the lightbox when pressing Esc
            }
        }
    });
});





function updateTime() {
    const e = (new Date).toLocaleTimeString();
    document.getElementById("dateTimeLocation").textContent = `It's ${e}`
}
document.addEventListener("DOMContentLoaded", () => {
    // Event listeners for arrow keys
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        }
    });

    // Click counter logic
    var clickCounter = document.getElementById("click-counter");
    var clickCount = parseInt(sessionStorage.getItem("clickCount")) || 0;
    clickCounter.innerText = `You clicked ${clickCount} times.`;
    
    document.addEventListener("click", () => {
        clickCount++;
        sessionStorage.setItem("clickCount", clickCount);
        clickCounter.innerText = `You clicked ${clickCount} times.`;
    });

    // Display current date
    document.getElementById("current-date").textContent = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
});





// Session timer logic
window.onload = function() {
    if (!sessionStorage.getItem("startTime")) {
        sessionStorage.setItem("startTime", Date.now().toString()); // Ensure it's stored as a string
    }

    setInterval(() => {
        const startTime = parseInt(sessionStorage.getItem("startTime"), 10); // Convert to number
        if (!isNaN(startTime)) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById("timer").innerText = `You've been here for ${elapsedTime} seconds.`;
        }
    }, 1000);
};
// Remove session timer on page unload
window.onbeforeunload = function() {
    sessionStorage.removeItem("startTime");
};





// Page loader effect
window.addEventListener("load", () => {
    const loader = document.getElementById("page-loader");
    const content = document.getElementById("content");
    loader.style.opacity = 0;
    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
    }, 500);
});



//MENU ICON TRANSITION ANIMATION    
const menu = document.getElementById("menu");
const menuButton = document.getElementById("menu-button");

menuButton.addEventListener("click", function() {
    menu.classList.toggle("show");
    menuButton.classList.toggle("active"); // Toggle the "X" effect
});

document.getElementById("search-bar").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    filterArchive(query);
});




function filterArchive(query) {
    const archiveItems = document.querySelectorAll(".archive-item");

    archiveItems.forEach(item => {
        const title = item.querySelector(".archive-title").textContent.toLowerCase();
        const content = item.querySelector(".archive-content").textContent.toLowerCase();

        if (title.includes(query) || content.includes(query)) {
            item.style.display = "flex"; // Show matching items
        } else {
            item.style.display = "none"; // Hide non-matching items
        }
    });
}






const archiveData = [
    { 
        title: "'LA NOUVELLE VAGUE'", 
        year: 2025, 
        date: "12.04.2025",
        content: "70*100CM", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/lanouvellevagueinstapost.jpg",
        link: "LA_NOUVELLE_VAGUE.html" 
    },
    { 
        title: "ISSUE #3", 
        year: 2025, 
        date: "26.03.2025",
        content: "While I'm Conscious (WIC) 3rd issue.", 
        thumbnail: "FOOTAGE/IMAGE/VIDEO THUMBNAILS/gaelreadingissue3.jpg",
        link: "ISSUE3.html" 
    },
    { 
        title: "RANDOM 2025", 
        year: 2025, 
        date: "28.03.2025",
        content: "Seungyu's 2025 random archive.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/riodejaneiro.jpg",
        link: "RANDOM2025.html"
    },
    { 
        title: "'ANTHROPOCÈNE'", 
        year: 2024, 
        date: "19.08.2024",
        content: "Assisted by Eneko.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/eneko.avif",
        link: "ANTHROPOCENE.html" 
    },
    { 
        title: "'BOUQUET DE FLEURS'", 
        year: 2024, 
        date: "25.05.2024",
        content: "LUV U LIL SIS.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/chaeyu1.avif",
        link: "BOUQUET DE FLEURS.html"
    },
    { 
        title: "'SANS TITRE'", 
        year: 2024, 
        date: "26.03.2024",
        content: "Assisted by Milan Pejic.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/milan2.avif",
        link: "SANS TITRE.html"
    },
    { 
        title: "'THE BARRACKS'", 
        year: 2024, 
        date: "26.03.2024",
        content: "Assisted by R4TPUNKI.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/lanouvellevague.avif",
        link: "THE BARRACKS.html"
    },
    { 
        title: "'BLIND-SELF-RELIANCE'", 
        year: 2024, 
        date: "12.04.2024",
        content: "Assisted by Diego.", 
        thumbnail: "FOOTAGE/IMAGE/ARCHIVE_THUMBNAILS/diego.jpg",
        link: "BLIND-SELF-RELIANCE.html" 
    },
    { 
        title: "RANDOM 2024", 
        year: 2024, 
        date: "31.12.2024",
        content: "Seungyu's 2024 random archive.", 
        thumbnail: "FOOTAGE/IMAGE/RANDOM 2024/ladybird.jpg",
        link: "RANDOM2024.html" 
    },
    { 
        title: "ISSUE #2", 
        year: 2024, 
        date: "02.02.2024",
        content: "While I'm Conscious (WIC) 2nd issue.", 
        thumbnail: "FOOTAGE/IMAGE/VIDEO THUMBNAILS/eyesissue2.jpg",
        link: "ISSUE2.html" 
    },
    { 
        title: "'UN1T' DIRECTED BY SEUNGYU JUNG", 
        year: 2023, 
        date: "30.05.2023",
        content: "SENDING LUV TO THE HOMIES.", 
        thumbnail: "FOOTAGE/IMAGE/VIDEO THUMBNAILS/un1t.jpg",
        link: "UN1T.html" 
    }
];

function generateArchive() {
    const container = document.getElementById("archive-container");
    container.innerHTML = "";

    const grouped = archiveData.reduce((acc, item) => {
        acc[item.year] = acc[item.year] || [];
        acc[item.year].push(item);
        return acc;
    }, {});

    const sortedYears = Object.keys(grouped).sort((a, b) => b - a);

    sortedYears.forEach(year => {
        const yearSection = document.createElement("div");
        yearSection.classList.add("archive-year-section");

        const yearTitle = document.createElement("h3");
        yearTitle.classList.add("archive-year");
        yearTitle.textContent = year;
        yearSection.appendChild(yearTitle);

        const grid = document.createElement("div");
        grid.classList.add("archive-grid");

        grouped[year].forEach(item => {
            const linkWrapper = document.createElement("a");
            linkWrapper.href = item.link;
            linkWrapper.classList.add("archive-item");
        
            const thumbnail = document.createElement("img");
            thumbnail.src = item.thumbnail;
            thumbnail.classList.add("archive-thumbnail");
        
            const title = document.createElement("h4");
            title.classList.add("archive-title");
            title.textContent = item.title;
        
            const content = document.createElement("p");
            content.classList.add("archive-content");
            content.textContent = item.content;
        
            const date = document.createElement("span");
            date.classList.add("archive-date");
            date.textContent = item.date || item.year; // fallback to year if date is missing
        
            linkWrapper.appendChild(thumbnail);
            linkWrapper.appendChild(title);
            linkWrapper.appendChild(content);
            linkWrapper.appendChild(date);
        
            grid.appendChild(linkWrapper);
        });
        yearSection.appendChild(grid);
        container.appendChild(yearSection);
    });
}

document.addEventListener("DOMContentLoaded", generateArchive);