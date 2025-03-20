# Shopping_list: prototype with explanations 
const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

const inputField = document.getElementById("items");
const priceField = document.getElementById("price");
const addButton = document.getElementById("add-item");
const clearButton = document.getElementById("clear-list");
const listElement = document.getElementById("shopping-list");

// Render the shopping list
function renderList() {
    listElement.innerHTML = ""; // Clear existing list

    shoppingList.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${item.name} - $${item.price.toFixed(2)}</span>`;

        // Toggle purchased status
        listItem.addEventListener("click", () => {
            listItem.classList.toggle("purchased");
        });

        // Add edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const newName = prompt("Edit item name:", item.name);
            const newPrice = parseFloat(prompt("Edit item price:", item.price)) || item.price;

            if (newName) {
                shoppingList[index] = { name: newName.trim(), price: newPrice };
                saveToLocalStorage();
                renderList();
            }
        });

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            shoppingList.splice(index, 1);
            saveToLocalStorage();
            renderList();
        });

        // Append buttons and list item
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
}

// Save list to local storage
function saveToLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Add new item
addButton.addEventListener("click", () => {
    const newItem = inputField.value.trim();
    const price = parseFloat(priceField.value.trim());

    // Validate input fields
    if (!newItem || isNaN(price)) {
        alert("Please enter both an item name and a valid price.");
        return;
    }

    shoppingList.push({ name: newItem, price: price });
    saveToLocalStorage();
    renderList();
    inputField.value = ""; // Clear input field
    priceField.value = ""; // Clear price field
});

// Clear the shopping list
clearButton.addEventListener("click", () => {
    if (confirm("Are you sure to clear all items the list?")) {
        shoppingList.length = 0;
        saveToLocalStorage();
        renderList();
    }
});

// Initial render
renderList();

