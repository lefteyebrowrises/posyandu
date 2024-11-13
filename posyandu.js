const cardData = document.getElementById('data'); // Get the container where cards will be displayed

let dataNews = []; // deklarasi variable dataPanen dengan tipe data array

// Function to display news cards on the main page
function displayCards(data) {
    const cardData = document.getElementById('data'); // Get the container where cards will be displayed
    cardData.innerHTML = ''; // Clear any existing content

    data.forEach(item => { // Loop through each item in the data array
        const card = document.createElement('div'); // Create a new div for the card
        card.className = 'card'; // Set the class for the card

        // Set the inner HTML of the card
        card.innerHTML = `
            <img src="./image/${item.image}" alt="Image">
            <div class="card-body">
                <a href="${item.link}?title=${encodeURIComponent(item.title)}">
                    <h3 style="color: black;">${item.title}</h3>
                </a>
                <p>${item.description}</p>
                <p class="date-place">${item.date} - ${item.place}</p>
            </div>
        `;

        cardData.appendChild(card); // Append the card to the container
    });
}

// Function to display news detail on the detail page
// Function to display news detail on the detail page
function displayNewsDetail(data) {
    const newsDetail = document.getElementById('news-detail');
    newsDetail.innerHTML = ''; // Clear any existing content

    // Create elements for the news details
    const titleElement = document.createElement('h1');
    titleElement.className = 'title';
    titleElement.textContent = data.title;

    const datePlaceElement = document.createElement('p');
    datePlaceElement.className = 'date-place';
    datePlaceElement.textContent = `${data.date} - Oleh : ${data.place}`;

    const imageElement = document.createElement('img');
    imageElement.src = `../image/${data.image}`;
    imageElement.alt = 'Image';
    imageElement.className = 'featured-image';

    const detailElement = document.createElement('div');
    detailElement.innerHTML = data.detail; // This is the detailed content you want to show

    // Append all elements to the news detail container
    newsDetail.appendChild(titleElement);
    newsDetail.appendChild(datePlaceElement);
    newsDetail.appendChild(imageElement);
    newsDetail.appendChild(detailElement); // Only append the detailElement
}

// Fetching data from the JSON file for the main page
if (document.getElementById('data')) {
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
}

// Fetching data from the JSON file for the detail page
if (document.getElementById('news-detail')) {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const urlParams = new URLSearchParams(window.location.search);
            const title = urlParams.get('title'); // Get the title from the URL parameters

            // Find the specific news item based on the title
            const newsItem = data.find(item => item.title === title);
            if (newsItem) {
                displayNewsDetail(newsItem); // Call the function to display the news detail
            } else {
                console.error('News item not found');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}