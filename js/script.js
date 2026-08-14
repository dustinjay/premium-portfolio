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