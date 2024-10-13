// Function to handle the Bing API search
function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '6aac0fc47d9842698f8e64c1ccd0c582'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';

            for (var i = 0; i < len; i++) {
                // Adding target="_blank" to open links in a new tab
                results += `<p><a href="${data.webPages.value[i].url}" target="_blank">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);  // Add search results to the div
            $('#searchResults').css('visibility', 'visible');  // Make the searchResults div visible
            $('#searchResults').dialog();  // Show the search results in a jQuery dialog
        })
        .fail(function () {
            alert('Error in fetching search results.');
        });
}

// Function to change the background image on click of the search engine name
function changeBackgroundImage() {
    var newBackground = 'url(./lib/background2.jpg)';  // Corrected path for the new background image
    $('body').css('background-image', newBackground);  // Change the background
}

// Function to display the current time (formatted HH:MM) in the time div and show it in a jQuery dialog
function showCurrentTime() {
    var currentTime = new Date();
    var formattedTime = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');

    console.log("Current Time: ", formattedTime);  // Debugging log for current time

    // Clear any previous content in the #time div before inserting the new time
    $('#time').html('');
    $('#time').append(`<p>${formattedTime}</p>`);  // Insert the formatted time in a <p> tag

    $('#time').css('visibility', 'visible');  // Make the time div visible

    // Check if the jQuery dialog is already initialized
    if ($('#time').dialog("instance")) {
        $('#time').dialog("destroy");  // Destroy previous instance to avoid multiple dialogs
    }

    // Initialize the jQuery dialog
    $('#time').dialog({
        title: "Current Time",
        modal: true,
        width: 400,
        height: 200,
        show: { effect: "fadeIn", duration: 500 },
        hide: { effect: "fadeOut", duration: 500 }
    });
}

// Event listener for the search button to trigger the Bing API search
$(document).ready(function () {
    $("#searchBtn").click(function () {
        apiSearch();  // Call the API search function when the search button is clicked
    });

    // Event listener for clicking the search engine name to change the background
    $("h1").click(function () {
        changeBackgroundImage();
    });

    // Event listener for clicking the time button to show the current time
    $("#timeBtn").click(function () {
        showCurrentTime();
    });
});
