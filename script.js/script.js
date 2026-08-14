/*========================================================
  SAMUEL OCHOCHE PETER PORTFOLIO
  SCRIPT.JS
  PART 1
=========================================================*/

"use strict";

/*========================================================
PRELOADER
=========================================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if(preloader){

        preloader.style.opacity = "0";

        preloader.style.visibility = "hidden";

        preloader.style.transition = "0.6s";

        setTimeout(() => {

            preloader.remove();

        },600);

    }

});


/*========================================================
SELECT ELEMENTS
=========================================================*/

const header = document.getElementById("header");

const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector("nav");

const navLinks = document.querySelectorAll("nav ul li a");

const scrollTop = document.getElementById("scroll-top");


/*========================================================
MOBILE MENU
=========================================================*/

if(menuBtn){

    menuBtn.addEventListener("click",()=>{

        nav.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if(nav.classList.contains("active")){

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        }else{

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/*========================================================
CLOSE MENU WHEN LINK IS CLICKED
=========================================================*/

navLinks.forEach(link=>{

    link.addEventListener("click",()=>{

        nav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/*========================================================
STICKY HEADER
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY > 80){

        header.style.padding="12px 0";

        header.style.background="rgba(2,12,27,.95)";

        header.style.boxShadow="0 15px 30px rgba(0,0,0,.30)";

    }else{

        header.style.padding="18px 0";

        header.style.background="rgba(10,25,47,.75)";

        header.style.boxShadow="none";

    }

});


/*========================================================
SCROLL TO TOP BUTTON
=========================================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        scrollTop.classList.add("active");

    }else{

        scrollTop.classList.remove("active");

    }

});


scrollTop.addEventListener("click",(e)=>{

    e.preventDefault();

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*========================================================
ACTIVE NAVIGATION
=========================================================*/

const sections = document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});


/*========================================================
SMOOTH SCROLL
=========================================================*/

navLinks.forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            window.scrollTo({

                top:target.offsetTop - 70,

                behavior:"smooth"

            });

        }

    });

});


/*========================================================
WINDOW RESIZE
=========================================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 768){

        nav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/*========================================================
END OF PART 1
=========================================================*/

/*========================================================
SCRIPT.JS
PART 2
COUNTERS • SCROLL ANIMATION • INTERSECTION OBSERVER
=========================================================*/

"use strict";

/*========================================================
ANIMATED COUNTERS
=========================================================*/

const counters = document.querySelectorAll(".counter");

const counterSpeed = 200;

const startCounters = () => {

    counters.forEach(counter => {

        // Get the original text
        const originalText = counter.innerText.trim();

        // Check if it contains a "+"
        const hasPlus = originalText.includes("+");

        // Extract only the number
        const target = parseInt(originalText);

        let count = 0;

        const updateCounter = () => {

            const increment = Math.ceil(target / counterSpeed);

            if (count < target) {

                count += increment;

                if (count > target) count = target;

                counter.innerText = hasPlus ? count + "+" : count;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = hasPlus ? target + "+" : target;

            }

        };

        updateCounter();

    });

};

/*========================================================
INTERSECTION OBSERVER
=========================================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});


document.querySelectorAll(".fade").forEach(el=>{

    observer.observe(el);

});


/*========================================================
START COUNTER WHEN STATS SECTION APPEARS
=========================================================*/

const statSection = document.querySelector(".stats");

let counterStarted = false;

if(statSection){

const statObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting && !counterStarted){

counterStarted = true;

startCounters();

}

});

},{threshold:.4});

statObserver.observe(statSection);

}


/*========================================================
SECTION REVEAL
=========================================================*/

const revealElements = document.querySelectorAll(

".section-title,.project-card,.skill-card,.service-card,.certificate-card,.testimonial-card,.timeline-item,.stat-box"

);

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{
threshold:.15
});

revealElements.forEach(el=>{

el.style.opacity="0";

el.style.transform="translateY(50px)";

el.style.transition=".8s ease";

revealObserver.observe(el);

});


/*========================================================
HEADER BACKGROUND EFFECT
=========================================================*/

window.addEventListener("scroll",()=>{

const scroll = window.scrollY;

header.style.backdropFilter="blur(20px)";

header.style.background=

scroll>80

?

"rgba(2,12,27,.90)"

:

"rgba(10,25,47,.70)";

});


/*========================================================
IMAGE FLOAT EFFECT
=========================================================*/

const imageBox = document.querySelector(".image-box");

window.addEventListener("mousemove",(e)=>{

if(!imageBox) return;

const x = (window.innerWidth/2-e.clientX)/40;

const y = (window.innerHeight/2-e.clientY)/40;

imageBox.style.transform=`rotateY(${x}deg) rotateX(${-y}deg)`;

});


window.addEventListener("mouseleave",()=>{

if(imageBox){

imageBox.style.transform="rotateY(0deg) rotateX(0deg)";

}

});


/*========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/*========================================================
SCROLL PROGRESS BAR
=========================================================*/

const progress=document.createElement("div");

progress.id="progress-bar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const totalHeight=

document.documentElement.scrollHeight-

window.innerHeight;

const progressHeight=(window.pageYOffset/totalHeight)*100;

progress.style.width=progressHeight+"%";

});


/*========================================================
END OF PART 2
=========================================================*/

/*========================================================
SCRIPT.JS
PART 3
PROJECT FILTER • PARTICLES • SPOTLIGHT • DYNAMIC GREETING
=========================================================*/

"use strict";

/*========================================================
PROJECT FILTER
=========================================================*/

const filterButtons = document.querySelectorAll(".project-filter button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card => {

            if (filter === "all") {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";

                }, 100);

            } else if (card.classList.contains(filter)) {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";

                }, 100);

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.8)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 300);

            }

        });

    });

});


/*========================================================
PROJECT IMAGE HOVER EFFECT
=========================================================*/

projectCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});


/*========================================================
SPOTLIGHT EFFECT
=========================================================*/

const spotlight = document.createElement("div");

spotlight.id = "spotlight";

document.body.appendChild(spotlight);

window.addEventListener("mousemove", e => {

    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";

});


/*========================================================
FLOATING PARTICLES
=========================================================*/

const particleContainer = document.querySelector(".particles");

if (particleContainer) {

    for (let i = 0; i < 30; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = (5 + Math.random() * 8) + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";
        particle.style.opacity = Math.random();

        particleContainer.appendChild(particle);

    }

}


/*========================================================
DYNAMIC GREETING
=========================================================*/

const greeting = document.getElementById("greeting");

if (greeting) {

    const hour = new Date().getHours();

    let message = "Welcome";

    if (hour < 12) {

        message = "Good Morning 👋";

    } else if (hour < 17) {

        message = "Good Afternoon 👋";

    } else {

        message = "Good Evening 👋";

    }

    greeting.textContent = message;

}
/*========================================================
PARALLAX HERO
=========================================================*/

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    hero.style.backgroundPositionY = window.pageYOffset * 0.4 + "px";

});


/*========================================================
RANDOM GLOW ON SKILL CARDS
=========================================================*/

const skillCards = document.querySelectorAll(".skill-card");

setInterval(() => {

    skillCards.forEach(card => {

        card.classList.remove("glow");

    });

    if (skillCards.length) {

        const random = Math.floor(Math.random() * skillCards.length);

        skillCards[random].classList.add("glow");

    }

}, 2500);


/*========================================================
COPY EMAIL TO CLIPBOARD
=========================================================*/

const emailElement = document.querySelector(".info p:nth-child(2)");

if (emailElement) {

    emailElement.style.cursor = "pointer";

    emailElement.title = "Click to copy email";

    emailElement.addEventListener("click", () => {

        navigator.clipboard.writeText("samuelochochepeter@gmail.com");

        alert("Email copied successfully!");

    });

}


/*========================================================
END OF PART 3
=========================================================*/

/*========================================================
SCRIPT.JS
PART 4
ADVANCED UI • ACCESSIBILITY • PERFORMANCE
=========================================================*/

"use strict";

/*========================================================
LAZY LOAD IMAGES
=========================================================*/

const lazyImages = document.querySelectorAll("img");

const lazyObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const img = entry.target;

        img.classList.add("loaded");

        observer.unobserve(img);

    });

}, {
    rootMargin: "100px"
});

lazyImages.forEach(img => lazyObserver.observe(img));


/*========================================================
KEYBOARD ACCESSIBILITY
=========================================================*/

document.addEventListener("keyup", (e) => {

    if (e.key === "Escape") {

        nav.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    }

});


/*========================================================
ACTIVE BUTTON ANIMATION
=========================================================*/

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mousedown", () => {

        btn.style.transform = "scale(.96)";

    });

    btn.addEventListener("mouseup", () => {

        btn.style.transform = "";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "";

    });

});


/*========================================================
NAV LINK HOVER SOUND (OPTIONAL)
=========================================================*/

// Uncomment if you add an audio file

/*
const hoverSound = new Audio("assets/audio/hover.mp3");

navLinks.forEach(link => {

    link.addEventListener("mouseenter", () => {

        hoverSound.currentTime = 0;
        hoverSound.play();

    });

});
*/


/*========================================================
COPY PHONE NUMBER
=========================================================*/

const phoneElement = document.querySelector(".info p:first-child");

if (phoneElement) {

    phoneElement.style.cursor = "pointer";
    phoneElement.title = "Click to copy phone number";

    phoneElement.addEventListener("click", () => {

        navigator.clipboard.writeText("+2347035747319");

        const original = phoneElement.innerHTML;

        phoneElement.innerHTML = "<i class='fas fa-check'></i> Phone Copied!";

        setTimeout(() => {

            phoneElement.innerHTML = original;

        }, 2000);

    });

}


/*========================================================
COPYRIGHT YEAR
=========================================================*/

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML = copyright.innerHTML.replace(
        "2026",
        new Date().getFullYear()
    );

}


/*========================================================
HERO BUTTON ENTRANCE
=========================================================*/

window.addEventListener("load", () => {

    document.querySelectorAll(".hero-buttons .btn").forEach((btn, index) => {

        btn.style.opacity = "0";
        btn.style.transform = "translateY(40px)";

        setTimeout(() => {

            btn.style.transition = ".6s ease";
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";

        }, 300 + (index * 200));

    });

});


/*========================================================
SECTION TITLE ANIMATION
=========================================================*/

document.querySelectorAll(".section-title").forEach(title => {

    title.addEventListener("mouseenter", () => {

        title.querySelector(".line").style.width = "140px";

    });

    title.addEventListener("mouseleave", () => {

        title.querySelector(".line").style.width = "90px";

    });

});


/*========================================================
BACK TO TOP KEYBOARD SHORTCUT
=========================================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Home") {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    }

});


/*========================================================
LOG WEBSITE READY
=========================================================*/

console.log("%cSamuel Ochoche Peter Portfolio Loaded Successfully",
"color:#64FFDA;font-size:16px;font-weight:bold;");


/*========================================================
END OF PART 4
=========================================================*/

/*========================================================
SCRIPT.JS
PART 5
FINAL INITIALIZATION • THEME • GITHUB • EMAILJS
=========================================================*/

"use strict";

/*========================================================
THEME TOGGLE
=========================================================*/

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const currentTheme = document.body.classList.contains("light-theme")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", currentTheme);

    });

}

/*========================================================
LOAD GITHUB REPOSITORIES
=========================================================*/

const githubContainer = document.getElementById("github-projects");

async function loadGithubRepos() {

    if (!githubContainer) return;

    try {

        const response = await fetch(
            "https://api.github.com/users/YOUR_GITHUB_USERNAME/repos?sort=updated&per_page=6"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch repositories.");
        }

        const repos = await response.json();

        githubContainer.innerHTML = "";

        repos.forEach(repo => {

            githubContainer.innerHTML += `

            <div class="repo-card">

                <h3>${repo.name}</h3>

                <p>${repo.description || "No description available."}</p>

                <div class="repo-footer">

                    ⭐ ${repo.stargazers_count}

                    <a href="${repo.html_url}" target="_blank">

                        View Repository

                    </a>

                </div>

            </div>

            `;

        });

    } catch (error) {

        githubContainer.innerHTML = `

        <p>

        Unable to load GitHub repositories.

        </p>

        `;

        console.error(error);

    }

}

loadGithubRepos();

/*========================================================
EMAILJS CONTACT FORM
=========================================================*/

const contactForm = document.querySelector("form");

if (contactForm && typeof emailjs !== "undefined") {

    emailjs.init("YOUR_PUBLIC_KEY");

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = this.querySelector("button");

        button.disabled = true;
        button.innerText = "Sending...";

        emailjs.sendForm(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            this
        )

        .then(() => {

            alert("Message sent successfully!");

            this.reset();

        })

        .catch(() => {

            alert("Unable to send message.");

        })

        .finally(() => {

            button.disabled = false;
            button.innerText = "Send Message";

        });

    });

}

/*========================================================
GLOBAL ERROR HANDLER
=========================================================*/

window.addEventListener("error", (event) => {

    console.error("Portfolio Error:", event.message);

});

/*========================================================
UNHANDLED PROMISES
=========================================================*/

window.addEventListener("unhandledrejection", (event) => {

    console.error("Unhandled Promise:", event.reason);

});

/*========================================================
FINAL INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Initialized Successfully.");

    document.body.classList.add("loaded");

});