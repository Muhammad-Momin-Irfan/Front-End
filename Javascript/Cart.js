document.addEventListener("DOMContentLoaded", function () {
    console.log("JS Loaded ✅");

    // Delay execution slightly to ensure all elements are loaded
    setTimeout(() => {
        displayCart();
    }, 300);
});

// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let cartTotalElement = document.getElementById("cart-total");

    if (!cartContainer || !cartTotalElement) {
        console.warn("Cart elements not found ❌");
        return; 
    }

    cartContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-gray-300 text-lg">Your cart is empty!</p>`;
        cartTotalElement.textContent = "0.00 RS";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        let cartItem = document.createElement("div");
        cartItem.classList.add("flex", "items-center", "justify-between", "bg-red-500", "p-4", "rounded-lg", "shadow-md", "flex-wrap");

        cartItem.innerHTML = `
            <div class="flex items-center space-x-3">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg shadow-md">
                <div class="flex-1 text-left min-w-[200px]">
                    <h3 class="text-lg font-bold">${item.name}</h3>
                    <p class="text-sm text-black">${item.price.toFixed(2)} RS</p> 
                </div>
            </div>
            <div class="flex items-center">
                <button class="bg-black text-red-500 w-8 h-8 rounded-md transition hover:bg-red-600 hover:text-black decrease" data-index="${index}">−</button>
                <input type="text" class="w-10 text-center text-lg bg-black text-red-500 border border-black rounded-md mx-2" value="${item.quantity}" readonly>
                <button class="bg-black text-red-500 w-8 h-8 rounded-md transition hover:bg-red-600 hover:text-black increase" data-index="${index}">+</button>
            </div>
            <span class="text-xl font-bold min-w-[80px] text-black">${(item.price * item.quantity).toFixed(2)} RS</span>
            <button class="bg-black text-red-500 px-3 py-2 text-sm rounded-md transition hover:bg-red-600 hover:text-black remove-item" data-index="${index}">Remove</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = `${totalPrice.toFixed(2)} RS`;
}

// Use event delegation to handle dynamically added elements
document.body.addEventListener("click", function (event) {
    if (event.target.matches("button[data-name]")) {
        // Add to Cart Logic
        let button = event.target;
        let name = button.getAttribute("data-name");
        let price = parseFloat(button.getAttribute("data-price"));
        let image = button.getAttribute("data-image");

        console.log("Adding to Cart:", name, price);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} has been added to your cart!`);
        displayCart();
    }

    if (event.target.matches(".increase")) {
        // Increase Quantity
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    if (event.target.matches(".decrease")) {
        // Decrease Quantity
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

    if (event.target.matches(".remove-item")) {
        // Remove Item
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
});

// Function to handle checkout
function checkout() {
    alert("Proceeding to checkout!");
    localStorage.removeItem("cart");
    displayCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    displayCart();
}
