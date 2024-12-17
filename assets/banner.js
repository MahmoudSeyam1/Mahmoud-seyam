document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;
            const productDescription = this.dataset.productDescription;
            const productImage = this.dataset.productImage;

            // Create a popup dynamically
            const popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <img src="${productImage}" alt="${productName}">
                    <h3>${productName}</h3>
                    <p>${productDescription}</p>
                    <form class="popup-form">
                        <label for="color">Color:</label>
                        <select id="color" name="color">
                            <option value="blue">Blue</option>
                            <option value="black">Black</option>
                        </select>
                        <label for="size">Size:</label>
                        <select id="size" name="size">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        <button type="button" class="add-to-cart" data-product-id="${productId}" data-product-name="${productName}">ADD TO CART</button>
                    </form>
                </div>`;

            document.body.appendChild(popup);

            // Close popup functionality
            popup.querySelector('.close-popup').addEventListener('click', function() {
                popup.remove();
            });

            // Add to cart functionality
            popup.querySelector('.add-to-cart').addEventListener('click', function() {
                const color = document.querySelector('#color').value;
                const size = document.querySelector('#size').value;

                // Add product to cart
                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: productId,
                        quantity: 1,
                        properties: {
                            Color: color,
                            Size: size
                        }
                    })
                }).then(response => {
                    if (response.ok) {
                        // Add "Soft Winter Jacket" if Black and Medium are selected
                        if (color === 'black' && size === 'medium') {
                            fetch('/cart/add.js', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: 'soft-winter-jacket-id', // Replace with actual ID
                                    quantity: 1
                                })
                            });
                        }
                        alert('Product added to cart!');
                    } else {
                        alert('Failed to add product to cart.');
                    }
                });
                popup.remove();
            });
        });
    });
});