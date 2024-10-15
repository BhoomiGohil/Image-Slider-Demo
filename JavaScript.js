// Collect all images from the HTML.
var dbimg = document.querySelectorAll(".dbimg");

// Store the total number of images in the database.
var pic = dbimg.length;

// Set the number of images to display on the webpage.
var number = 12;

// Define the range for the first set of images to display.
var start = 1,
  end = number;

// Calculate how many sets of 12 images are possible.
var repetition = pic / number;

// Select the imageContainer container for displaying small images.
var imageContainer = document.querySelector(".imageContainer");

// Select the display container for showing large images.
var display = document.querySelector(".display");

// Select the overlay element for displaying large images.
var glassScreen = document.querySelector(".glassScreen");

// Select the arrow button container for hiding/showing arrow buttons.
var displaybutton = document.querySelector(".display-button");

// Function to clear all child elements from the 'imageContainer' container.
function clearsmallimage(imageContainer) {
  while (imageContainer.hasChildNodes()) {
    imageContainer.removeChild(imageContainer.firstChild);
  }
}

// Function to clear all child elements from the 'display' container.
function clearbigimage(display) {
  while (display.hasChildNodes()) {
    display.removeChild(display.firstChild);
  }
}

// Function to display a range of small images on the webpage.
function displaySmallImage(start, end) {
  for (i = start; i <= end; i++) {
    // Create a new div container for each image.
    var div = document.createElement("div");
    div.className = "div-box" + [i];
    div.setAttribute("id", "division");
    document.querySelector(".imageContainer").appendChild(div);

    // Create an image element and set its properties.
    var img = document.createElement("img");
    img.value = i;

    // Set the source of the image based on the corresponding dbimg.
    if (img.value === i) {
      img.src = dbimg[i - 1].src;
    }

    img.setAttribute("class", "image");

    // Set an onclick event to display the image in larger view when clicked.
    img.onclick = function () {
      imageclick(this.value);
    };

    // Append the image to the corresponding div container.
    document.querySelector(".div-box" + [i]).appendChild(img);
  }
}

// Display the first set of images by default.
displaySmallImage(start, end);

// Function to handle clicks on number buttons to display specific sets of images.
function numberButtonClick(text) {
  clearsmallimage(imageContainer); // Clear old images.

  j = 1; // Start index for the new set of images.

  for (i = 1; i <= text; i++) {
    start = j;
    j = j + number;
    end = number * text;

    // Ensure 'end' does not exceed the total number of images.
    if (end > pic) {
      end = pic;
    }
  }

  // Display the new set of images.
  displaySmallImage(start, end);
}

// Create buttons to navigate between different sets of images.
for (i = 0; i <= repetition; i++) {
  var button = document.createElement("button");
  button.innerHTML = i + 1; // Button label.
  button.className = "button";

  // Set an onclick event to display the corresponding set of images.
  button.onclick = function () {
    numberButtonClick(this.innerHTML);
  };

  // Append the button to the button container.
  document.querySelector(".button-div").appendChild(button);
}

// Function to display a clicked image in larger view.
function imageclick(value) {
  clearbigimage(display); // Clear any previously displayed large image.

  // Show the overlay and the display elements.
  glassScreen.style.display = "block";
  display.style.display = "block";
  displaybutton.style.display = "block";

  // Create an image element for the large view and set its properties.
  var displayimg = document.createElement("img");
  displayimg.value = value;
  displayimg.src = dbimg[value - 1].src;
  displayimg.alt = "Images/16.jpg"; // Alt text for the image.
  displayimg.setAttribute("class", "image");
  displayimg.setAttribute("id", "bigimage");

  // Append the large image to the display container.
  document.querySelector(".display").appendChild(displayimg);
}

// Function to handle left and right arrow navigation on large images.
function arrow(value) {
  var bigimage = document.querySelector("#bigimage"); // Select the current large image.

  if (value === "left") {
    bigimage.value = bigimage.value - 1; // Move to the previous image.
    if (bigimage.value === 0) {
      bigimage.value = pic; // Loop back to the last image if at the start.
    }
    imageloop(bigimage.value); // Update the displayed image.
  } else {
    bigimage.value = bigimage.value + 1; // Move to the next image.
    if (bigimage.value === pic + 1) {
      bigimage.value = start; // Loop back to the first image if at the end.
    }
    imageloop(bigimage.value); // Update the displayed image.
  }
}

// Function to update the large image based on the current value.
function imageloop(value) {
  for (i = start; i <= pic; i++) {
    if (value === i) {
      bigimage.src = dbimg[i - 1].src; // Set the source of the large image.
    }
  }
}

// Function to hide the large image display and overlay.
function hide() {
  glassScreen.style.display = "none";
  display.style.display = "none";
  displaybutton.style.display = "none";
}
