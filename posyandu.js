const cardData = document.getElementById('data'); // Get the container where cards will be displayed

let dataNews = []; // deklarasi variable dataPanen dengan tipe data array

// fungsi displayData untuk men-generate data pada cardData
function displayCards(data) {
    console.log('datanews : ' + dataNews)
    const cardData = document.getElementById('data'); // Get the container where cards will be displayed
    cardData.innerHTML = ''; // Clear any existing content

    data.forEach(item => { // Loop through each item in the data array
        const card = document.createElement('div'); // Create a new div for the card
        card.className = 'card'; // Set the class for the card

        // Set the inner HTML of the card
        card.innerHTML = `
            <img src="./image/${item.image}" alt="Image">
            <div class="card-body">
                <a href="${item.link}">
                    <h3 style="color: black;">${item.title}</h3>
                </a>
                <p>${item.description}</p>
                <p class="date-place">${item.date} - ${item.place}</p>
            </div>
        `;

        cardData.appendChild(card); // Append the card to the container
    });
}

// menambil data dari file produksi.json
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayCards(data); // Call the function to display cards with the fetched data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });