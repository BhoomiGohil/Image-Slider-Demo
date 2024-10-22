// Array of image objects with URLs and IDs.
var images = [
  { url: "./Images/1.jpg", id: 1 },
  { url: "./Images/2.jpg", id: 2 },
  { url: "./Images/3.jpg", id: 3 },
  { url: "./Images/4.jpg", id: 4 },
  { url: "./Images/5.jpg", id: 5 },
  { url: "./Images/6.jpg", id: 6 },
  { url: "./Images/7.jpg", id: 7 },
  { url: "./Images/8.jpg", id: 8 },
  { url: "./Images/9.jpg", id: 9 },
  { url: "./Images/10.jpg", id: 10 },
  { url: "./Images/11.jpg", id: 11 },
  { url: "./Images/12.jpg", id: 12 },
  { url: "./Images/13.jpg", id: 13 },
  { url: "./Images/14.jpg", id: 14 },
  { url: "./Images/15.jpg", id: 15 },
];

// Select necessary HTML elements.
var dbimg = images; // Reference to the images array.
var imageContainer = document.querySelector(".imageContainer"); // Container for small images.
var screenWrapper = document.querySelector(".screen-wrapper"); // Overlay wrapper.
var display = document.querySelector(".display"); // Container for large image display.
var glassScreen = document.querySelector(".glassScreen"); // Overlay screen.
var displaybutton = document.querySelector(".display-button"); // Arrow button container.

var pic = dbimg.length; // Total number of images.
var number = 12; // Number of images per set.
var start = 0,
  end = number - 1; // Range for the initial set.
var repetition = pic / number; // Total sets based on the number of images.

// Clear all elements from the display container.
function clearBigImage(display) {
  while (display.hasChildNodes()) {
    display.removeChild(display.firstChild);
  }
}

// Display a large version of the clicked image.
function imageClick(value) {
  clearBigImage(display); // Remove any previous large image.
  screenWrapper.style.display = "flex"; // Show the overlay.

  var displayimg = document.createElement("img"); // Create large image element.
  displayimg.setAttribute("value", value);
  displayimg.src = images[value].url;
  displayimg.alt = "Big Images that display on screen";
  displayimg.setAttribute("id", "bigimage");

  display.appendChild(displayimg); // Add the large image to display container.
}

// Display a set of small images.
function displaySmallImage(start, end) {
  for (let i = start; i <= end; i++) {
    var div = document.createElement("div"); // Create a div for each image.
    div.setAttribute("class", "smallImageEl");
    div.setAttribute("id", "div-box" + i);
    imageContainer.appendChild(div);

    var img = document.createElement("img"); // Create an image element.
    img.setAttribute("value", i);
    img.setAttribute("class", "image");
    img.src = images[i].url;

    img.onclick = function (event) {
      imageClick(event.target.getAttribute("value")); // Show large image on click.
    };

    div.appendChild(img); // Add the image to the div.
  }
}

// Display the first set of images by default.
displaySmallImage(start, end);

// Clear all small images from the image container.
function clearSmallImage(imageContainer) {
  while (imageContainer.hasChildNodes()) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
}

// Display specific sets of images based on button clicks.
function numberButtonClick(id) {
  clearSmallImage(imageContainer); // Clear previous images.

  var index = 0; // Start index for new set.

  for (let i = 1; i <= id; i++) {
    start = index;
    index += number;
    end = number * id - 1;

    if (end >= pic) {
      end = pic - 1; // Ensure 'end' doesn't exceed total images.
    }
  }

  displaySmallImage(start, end); // Display the new set.
}

// Create buttons for navigating between image sets.
for (let i = 0; i <= repetition; i++) {
  var button = document.createElement("button");
  button.setAttribute("id", i);
  button.innerHTML = i + 1; // Set button label.
  button.className = "button";

  button.onclick = function () {
    numberButtonClick(parseInt(this.id) + 1); // Display corresponding image set.
  };

  document.querySelector(".button-div").appendChild(button); // Add button to container.
}

// Update the large image view in a loop.
function imageloop(value) {
  var bigimage = document.querySelector("#bigimage");
  for (let i = start; i <= pic; i++) {
    if (value === i) {
      bigimage.src = images[i].url; // Update large image source.
      bigimage.setAttribute("value", i);
    }
  }
}

// Navigate between large images using arrows.
function arrow(value) {
  var bigimage = document.querySelector("#bigimage"); // Current large image.
  var smallimage = document.querySelectorAll(".image"); // All small images.

  var bigImageValue = parseInt(bigimage.getAttribute("value"));
  var smallImageFirstValue = parseInt(smallimage[0].getAttribute("value"));
  var smallImageLastValue = parseInt(
    smallimage[smallimage.length - 1].getAttribute("value")
  );

  if (value === "left") {
    bigImageValue -= 1; // Move left.
    if (bigImageValue < smallImageFirstValue) {
      bigImageValue = smallImageLastValue; // Loop back to last image.
    }
  } else {
    bigImageValue += 1; // Move right.
    if (bigImageValue > smallImageLastValue) {
      bigImageValue = smallImageFirstValue; // Loop back to first image.
    }
  }

  imageloop(bigImageValue); // Update large image.
}

// Hide the large image overlay.
function hide() {
  screenWrapper.style.display = "none"; // Hide overlay.
}
