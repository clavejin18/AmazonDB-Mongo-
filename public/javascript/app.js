// Submit setup
document.querySelector('#button').addEventListener('click', function (event) {
    if (event.target.matches('#submit')) {
        // fetch POST call to the submit route on the server
        // This will take the data from the form and send it to the server
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product: document.querySelector('#productName').value,
                department: document.querySelector('#departmentName').value,
                quantity: document.querySelector('#productQuantity').value,
                condition: document.querySelector('#productCondition').value,
                price: document.querySelector('#productPrice').value,
                email: document.querySelector('#email').value,
                created: Date.now()
            })
        }).then (response => response.json())
    }
});