let cart = [];
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const details = document.getElementById('formContainer');

// Function to add items to the cart
function addToCart(productName, productPrice, quantityInputId, productImage) {
    const quantity = parseInt(document.getElementById(quantityInputId).value) || 1;

    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
    }

    updateCart();
}

// Function to update the cart count
function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Function to toggle the cart modal
function toggleCartModal() {
    if (cartModal.style.display === "block") {
        cartModal.style.display = "none";
    } else {
        renderCart();
        cartModal.style.display = "block";
    }
}

// Function to render the cart items in the modal
function renderCart() {
    cartItems.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price * item.quantity}</p>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    formContainer.innerHTML = ` 
    <form action = "getInfo.php" method= "post"> 
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required> 
        </div> 
        <div class="form-group"> 
            <label for="email">Email:</label> 
            <input type="email" id="email" name="email" required> 
        </div> <div class="form-group"> 
            <label for="phone">Phone Number:</label> 
            <input type="tel" id="phone" name="phone" required> 
        </div> 
        <div class="form-group"> 
            <label for="address">Address:</label> 
            <input type="text" id="address" name="address" required> 
        </div> 
        <button class="submit">Submit</button> 

    </form>
    `;

}

// Function to send cart details to WhatsApp
function sendToWhatsApp(name, email, phone, address) {
    const cartDetails = cart
        .map((item) => `${item.quantity} x ${item.name} - $${item.price * item.quantity}`)
        .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const message = `
Hello,
I want to place the following order:

${cartDetails}

Total: $${total}

My Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "9817341354"; // Replace with your WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
}
