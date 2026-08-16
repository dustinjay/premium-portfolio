// ==========================================
// CUSTOM CURSOR
// ==========================================

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

if (cursor && follower) {

    let mouseX = 0;
    let mouseY = 0;

    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", function(e) {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });

    function moveFollower() {

        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.left = followerX + "px";
        follower.style.top = followerY + "px";

        requestAnimationFrame(moveFollower);
    }

    moveFollower();
}


// ==========================================
// MOBILE MENU
// ==========================================

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");

if (menu && nav) {

    menu.addEventListener("click", function() {

        nav.classList.toggle("active");

    });

    nav.querySelectorAll("a").forEach(function(link) {

        link.addEventListener("click", function() {

            nav.classList.remove("active");

        });

    });
}


// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(e) {

        const id = this.getAttribute("href");

        if (!id || id === "#") {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(id);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// ==========================================
// LIGHTBOX
// ==========================================

const projects =
    document.querySelectorAll(".project-image");

const lightbox =
    document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close">×</button>
    <div class="lightbox-content"></div>
`;

document.body.appendChild(lightbox);


const lightboxContent =
    lightbox.querySelector(".lightbox-content");

const closeButton =
    lightbox.querySelector(".lightbox-close");


// ==========================================
// OPEN IMAGE / VIDEO
// ==========================================

projects.forEach(function(project) {

    project.addEventListener("click", function(e) {

        e.preventDefault();

        e.stopPropagation();

        lightboxContent.innerHTML = "";


        // VIDEO

        if (project.classList.contains("video")) {

            const video =
                document.createElement("video");

            video.src =
                project.getAttribute("href");

            video.controls = true;

            video.autoplay = true;

            video.playsInline = true;

            lightboxContent.appendChild(video);

        }


        // IMAGE

        else {

            const original =
                project.querySelector("img");

            if (!original) return;

            const image =
                document.createElement("img");

            image.src = original.src;

            image.alt = original.alt;

            lightboxContent.appendChild(image);

        }


        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

    lightboxContent.innerHTML = "";

}


closeButton.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener("click", function(e) {

    if (e.target === lightbox) {

        closeLightbox();

    }

});


document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        closeLightbox();

    }

});

document.querySelectorAll('.graphic-project').forEach(function (project) {

    project.addEventListener('click', function (e) {

        e.preventDefault();

        const image =
            this.querySelector('img');

        if (!image) return;


        const lightbox =
            document.createElement('div');

        lightbox.style.position = 'fixed';
        lightbox.style.inset = '0';
        lightbox.style.width = '100vw';
        lightbox.style.height = '100vh';
        lightbox.style.background = 'rgba(0,0,0,.97)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = '99999';
        lightbox.style.cursor = 'pointer';


        const largeImage =
            document.createElement('img');

        largeImage.src = image.src;

        largeImage.alt = image.alt;

        largeImage.style.width = '100vw';
        largeImage.style.height = '100vh';
        largeImage.style.objectFit = 'contain';


        lightbox.appendChild(
            largeImage
        );

        document.body.appendChild(
            lightbox
        );

        document.body.style.overflow =
            'hidden';


        lightbox.addEventListener(
            'click',
            function () {

                lightbox.remove();

                document.body.style.overflow =
                    '';

            }
        );

    });

});

// =========================================
// GRAPHIC + LEAD GENERATION LIGHTBOX
// =========================================

const imageProjects = document.querySelectorAll(
    '.graphic-project, .leadgen-sample'
);

imageProjects.forEach(function (project) {

    project.addEventListener('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        const image = this.querySelector('img');

        if (!image) return;


        const lightbox =
            document.createElement('div');

        lightbox.className =
            'image-lightbox';


        lightbox.innerHTML = `

            <button
                type="button"
                class="image-lightbox-close"
                aria-label="Close image"
            >
                ×
            </button>

            <img
                src="${image.src}"
                alt="${image.alt}"
            >

        `;


        document.body.appendChild(lightbox);


        requestAnimationFrame(function () {

            lightbox.classList.add('active');

        });


        document.body.style.overflow =
            'hidden';


        // CLOSE BUTTON

        const closeButton =
            lightbox.querySelector(
                '.image-lightbox-close'
            );


        function closeImageLightbox() {

            lightbox.classList.remove(
                'active'
            );

            document.body.style.overflow =
                '';

            setTimeout(function () {

                lightbox.remove();

            }, 300);

        }


        closeButton.addEventListener(
            'click',
            closeImageLightbox
        );


        // CLICK OUTSIDE IMAGE

        lightbox.addEventListener(
            'click',
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    closeImageLightbox();

                }

            }
        );


        // ESC KEY

        function escapeHandler(event) {

            if (event.key === 'Escape') {

                closeImageLightbox();

                document.removeEventListener(
                    'keydown',
                    escapeHandler
                );

            }

        }


        document.addEventListener(
            'keydown',
            escapeHandler
        );

    });

});