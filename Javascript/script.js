
document.addEventListener("DOMContentLoaded", function () {
    // ⭐ Sticky Navigation Hiding on Scroll Down, Showing on Scroll Up ⭐
    const navbar = document.getElementById("navbar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            navbar.classList.add("-translate-y-full");
        } else {
            navbar.classList.remove("-translate-y-full");
        }

        lastScrollY = currentScrollY;
    });

    // ⭐ Hero Section Image Slider ⭐
    const heroImages = [
        "./Resources/Homepage/Banner1.jpg",
        "./Resources/Homepage/Banner2.jpg",
        "./Resources/Homepage/Banner3.jpg",
        "./Resources/Homepage/Banner4.jpg",
        "./Resources/Homepage/Banner5.jpg"
    ];

    let currentImageIndex = 0;
    const heroBanner = document.querySelector(".banner-img");

    function changeHeroImage() {
        if (heroBanner) {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroBanner.src = heroImages[currentImageIndex];
        }
    }

    setInterval(changeHeroImage, 3000);

    // ⭐ Smooth Scrolling for Navigation Links ⭐
    document.querySelectorAll(".nav-links a, nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    window.scrollTo({
                        top: targetSection.offsetTop - navbarHeight,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ⭐ Today's Special Section ⭐
    const specials = {
        Monday: { deal: "Buy 2 Zinger Burgers, Get 1 Pepsi (500ml) Free!", image: "./Resources/Homepage/MondayS.jpg" },
        Tuesday: { deal: "Buy 1 Large Pizza, Get 1 Small Pizza 50% Off!", image: "./Resources/Homepage/TuesdayS.jpg" },
        Wednesday: { deal: "Family BBQ Platter - 20% Off!", image: "./Resources/Homepage/WednesdayS.jpg" },
        Thursday: { deal: "Buy Any 3 Burgers, Get 1 Free!", image: "./Resources/Homepage/ThursdayS.jpg" },
        Friday: { deal: "Order 2 Large Pizzas, Get Free Garlic Bread!", image: "./Resources/Homepage/FridayS.jpg" },
        Saturday: { deal: "Mighty Zinger + Fries + Drink Combo - 600 RS!", image: "./Resources/Homepage/SaturdayS.jpg" },
        Sunday: { deal: "Weekend Special: 15% Off on All Pizzas!", image: "./Resources/Homepage/SundayS.jpg" }
    };

    const specialText = document.querySelector("#specials .special-text");
    const specialImage = document.querySelector("#specials .special-img");

    function updateTodaysSpecial() {
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

        if (specials[today] && specialText && specialImage) {
            console.log(`✅ Today's special: ${today} - ${specials[today].deal}`);
            specialText.textContent = specials[today].deal;
            specialImage.src = specials[today].image;
        } else {
            console.error("❌ Error: Special section elements not found or missing data for today.");
        }
    }

    updateTodaysSpecial();
    setInterval(updateTodaysSpecial, 86400000); // 24 hours
});

window.onscroll = () => {
    const btn = document.getElementById("backToTop");
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  };
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateOpeningStatus() {
    const now = new Date();
    const hours = now.getHours();
    const open = 11; // 11 AM
    const close = 23; // 11 PM
  
    const statusEl = document.getElementById("openingStatus");
    if (hours >= open && hours < close) {
      statusEl.textContent = "We’re Open! 🍽️";
      statusEl.classList.remove("text-red-600");
      statusEl.classList.add("text-green-600");
    } else {
      statusEl.textContent = "Sorry, We’re Closed!";
      statusEl.classList.remove("text-green-600");
      statusEl.classList.add("text-red-600");
    }
  }
  updateOpeningStatus();

  
  function startCountdown(displayId) {
    const now = new Date();
    const endOfDay = new Date(now);
    
    // Set the offer end time (midnight)
    endOfDay.setHours(24, 0, 0, 0);
    
    let durationInSec = Math.floor((endOfDay - now) / 1000); // Time left in seconds

    const display = document.getElementById(displayId);

    const interval = setInterval(() => {
        const hours = String(Math.floor(durationInSec / 3600)).padStart(2, '0'); // Hours
        const minutes = String(Math.floor((durationInSec % 3600) / 60)).padStart(2, '0'); // Minutes
        const seconds = String(durationInSec % 60).padStart(2, '0'); // Seconds

        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (--durationInSec < 0) {
            clearInterval(interval);
            display.textContent = "Offer Ended!";
        }
    }, 1000);
}

startCountdown("specialTimer"); // Starts the countdown based on the local time



document.addEventListener("DOMContentLoaded", function () {
    const menuImages = {
        BBQ: [
            "./Resources/Homepage/BBQ.png",
            "./Resources/BBQ Pics/Beef Kebab.png",
            "./Resources/BBQ Pics/Mutton Tikka.png",
            "./Resources/BBQ Pics/Chops.png",
            "./Resources/BBQ Pics/Leg.png"
        ],
        Burgers: [
            "./Resources/Homepage/Burger.png",
            "./Resources/Burger Pics/Regular.png",
            "./Resources/Burger Pics/Patty.png",
            "./Resources/Burger Pics/Hamburger.png"
        ],
        Drinks: [
            "./Resources/Homepage/Drinks.png",
            "./Resources/Drinks Pics/Mango Juice.jpg",
            "./Resources/Drinks Pics/Strawberry Shake.jpg",
            "./Resources/Drinks Pics/Pepsi.png"
        ],
        Pizza: [
            "./Resources/Homepage/Pizza.png",
            "./Resources/Pizza Pics/Fajita-P.png",
            "./Resources/Pizza Pics/Veggie-P.png",
            "./Resources/Pizza Pics/neapolitan-P.png",
            "./Resources/Pizza Pics/HalfnHalf.png"
        ],
        Wraps: [
            "./Resources/Homepage/Wrap.png",
            "./Resources/Wraps Pics/Fajita.jpg",
            "./Resources/Wraps Pics/Z-Paratha.jpg",
            "./Resources/Wraps Pics/K-Paratha.png"
        ],
        Fries: [
            "./Resources/Homepage/Fries.jpg",
            "./Resources/Fries Pics/Family.png",
            "./Resources/Fries Pics/NHot.png",
            "./Resources/Fries Pics/Tikka.jpg"
        ],
        Combos: [
            "./Resources/Homepage/Combos.png",
            "./Resources/Combos/Combo1.png",
            "./Resources/Combos/Combo2.png",
            "./Resources/Combos/Combo3.png"
        ],
        Dips: [
            "./Resources/Homepage/Dips.png",
            "./Resources/Dips Pics/Garlic Mayo.png",
            "./Resources/Dips Pics/BBQ.png",
            "./Resources/Dips Pics/CheeseDip.jpg"
        ]
    };

    const menuItems = document.querySelectorAll(".menu-item");
    const intervals = {}; // to keep track of intervals per category

    menuItems.forEach(item => {
        const category = item.getAttribute("data-category");
        const imgElement = item.querySelector(".menu-img");
        const originalImage = menuImages[category][0];

        imgElement.src = originalImage;

        item.addEventListener("mouseenter", () => {
            let currentImgIndex = 0;

            if (intervals[category]) clearInterval(intervals[category]);

            intervals[category] = setInterval(() => {
                currentImgIndex = (currentImgIndex + 1) % menuImages[category].length;
                imgElement.src = menuImages[category][currentImgIndex];
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearInterval(intervals[category]);
            imgElement.src = originalImage;
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const menuImages = {
        Appetizers: [
            "./Resources/Homepage/Appitizers.png",
            "./Resources/Apppitizers Pics/Wings.png",
            "./Resources/Apppitizers Pics/MSticks.png",
            "./Resources/Apppitizers Pics/Fingers.png"
        ]
        
    };

    const swipeCategories = ['Appetizers']; // Add other swipe-enabled categories here
    const intervals = {}; // for hover-based switching

    document.querySelectorAll(".menu-item").forEach(item => {
        const category = item.dataset.category;
        const wrapper = item.querySelector(".menu-img-wrapper");

        if (!menuImages[category]) return;

        if (swipeCategories.includes(category)) {
            // Swipe/stack-style image behavior
            const images = menuImages[category];
            const imgElements = [];

            images.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = category;
                img.className = "absolute top-0 left-0 w-full h-full object-cover rounded-md transition-all duration-500";
                wrapper.appendChild(img);
                imgElements.push(img);
            });

            let currentIndex = 0;

            function updateStack() {
                imgElements.forEach((img, i) => {
                    const relativeIndex = (i - currentIndex + images.length) % images.length;
                    img.style.zIndex = images.length - relativeIndex;
                    img.style.transform = `translateX(${relativeIndex * 6}px) rotate(${relativeIndex * 2}deg)`;
                    img.style.opacity = relativeIndex === 0 ? 1 : 0.6;
                });
            }

            updateStack();

            // Click-to-cycle inside image wrapper only
            wrapper.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevent triggering link if nested
                currentIndex = (currentIndex + 1) % images.length;
                updateStack();
            });

        } else {
            
            const img = document.createElement("img");
            img.className = "menu-img absolute top-0 left-0 w-full h-full object-cover rounded-md";
            img.src = menuImages[category][0];
            wrapper.appendChild(img);

            item.addEventListener("mouseenter", () => {
                let currentImgIndex = 0;
                if (intervals[category]) clearInterval(intervals[category]);

                intervals[category] = setInterval(() => {
                    currentImgIndex = (currentImgIndex + 1) % menuImages[category].length;
                    img.src = menuImages[category][currentImgIndex];
                }, 1000);
            });

            item.addEventListener("mouseleave", () => {
                clearInterval(intervals[category]);
                img.src = menuImages[category][0];
            });
        }
    });
});
