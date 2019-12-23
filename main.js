'use strict'

let statesToSearch = [];
let maxResults = 10;

function addStates() {
    $('.addButton').on('click', function() {
        let selectedState = $('#states option:selected').text();
        let selectedCode = $('#states option:selected').val();
        let selectionStatus = statesToSearch.includes(`stateCode=${selectedCode}`);
        if (selectionStatus == false) {
            $('.statesToSearch').append(`<li>${selectedState}</li>`);
            statesToSearch.push(`stateCode=${selectedCode}`);
            $('.results').empty();
        } else {alert('Already selected!')};
    });
};

function clearResults() {
    $('.clearResults').on('click', function() {    
        $('.statesToSearch').empty();
        $('.results').empty();
        statesToSearch.length = 0;
    });
};

function searchStates() {
    $('.searchButton').on('click', function() {
        $('.results').empty();
        if (statesToSearch.length === 0) {
            alert('No states selected!');
        } else {
            let searchParams = statesToSearch.join('&');
            let searchResults = document.getElementById('maxResults').value;
            let searchUrl = `https://developer.nps.gov/api/v1/parks?${searchParams}&limit=${searchResults}&api_key=ASz77OGxseETKhhEpowr3df79KmGCTjmVz7EYA5o`;
            fetch(searchUrl)
            .then(response => response.json())
            .then(responseJson => buildParks(responseJson));
            };
        });
    };

function buildParks(responseJson) {
    let parksData = (responseJson.data);
    for (let i = 0; i < parksData.length; i++) {
        $('.results').append(
            `<h2>${parksData[i].fullName}</h2><br>
            <a href="${parksData[i].url}">${parksData[i].url}</a>
            <p>${parksData[i].description}</p>`
        );
    };
};

addStates();
searchStates();
clearResults();