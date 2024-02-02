document.addEventListener("DOMContentLoaded", function () {
  const cartItems = [
    {
      id: 1,
      imgUrl:
        "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/34/471002/1.jpg?4137",
      name: "BT-103 Casque Bluetooth Sportif",
      price: 5130,
      quantity: 5,
    },
    {
      id: 2,
      imgUrl:
        "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/40/894991/1.jpg?8963",
      name: "Chargeur Macbook Pro 61W / Type-C",
      price: 45000,
      quantity: 2,
    },
    {
      id: 3,
      imgUrl:
        "https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/50/330972/1.jpg?1734",
      name: "Ola Tablet PC - Dual SIM - 4Go + 256Go",
      price: 150000,
      quantity: 2,
    },
  ];

  const cardContainer = document.querySelector(".cart");

  function renderCart() {
    cardContainer.innerHTML = "";
    cartItems.forEach((item) => {
      const itemElement = createItemElement(item);

      // Ajout du div créé à cardContainer
      cardContainer.appendChild(itemElement);
    });
    updateTotal();
  }

  renderCart();

  function removeItem(itemId) {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      cartItems.splice(index, 1);
      renderCart();
    }
  }

  function createItemElement(item) {
    // Création d'un div
    const itemElement = document.createElement("div");

    // Ajout de la classe item au div créé
    itemElement.classList.add("item");

    // Ajout du contenu au div créé
    itemElement.innerHTML = `
        <img
          src="${item.imgUrl}"
          alt="${item.name}"
        />
        <div class="details">
          <h3>${item.name}</h3>
          <p>Prix: XOF ${item.price}</p>
        </div>
        <div class="actions">
          <button class="like-btn">
            <span class="material-symbols-outlined"> favorite </span>
          </button>
          <button class="remove-btn" data-id="${item.id}">
            <span class="material-symbols-outlined"> delete_forever </span>
          </button>
          <div class="quantity">
            <button class="decrement-btn" data-id="${item.id}">
              <span class="material-symbols-outlined"> remove </span>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="increment-btn" data-id="${item.id}">
              <span class="material-symbols-outlined"> add </span>
            </button>
          </div>
        </div>
    `;

    const likeButton = itemElement.querySelector(".like-btn");
    const removeButton = itemElement.querySelector(".remove-btn");
    const decrementButon = itemElement.querySelector(".decrement-btn");
    const incrementButton = itemElement.querySelector(".increment-btn");

    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("active");
    });

    removeButton.addEventListener("click", function () {
      const itemId = parseInt(removeButton.dataset.id);
      removeItem(itemId);
    });

    decrementButon.addEventListener("click", function () {
      const itemId = parseInt(decrementButon.dataset.id);
      updateQuantity(itemId, -1);
    });

    incrementButton.addEventListener("click", function () {
      const itemId = parseInt(incrementButton.dataset.id);
      updateQuantity(itemId, +1);
    });

    return itemElement;
  }

  function updateQuantity(itemId, change) {
    const item = cartItems.find((item) => item.id === itemId);

    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        removeItem(itemId);
      } else {
        renderCart();
      }
    }
  }

  function updateTotal() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    document.querySelector(".totalAmount").textContent = `XOF ${total}`;
  }
});
