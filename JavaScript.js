var pic = 15; // Total number of images in database.
var number = 12; // Only Display 12 images in webpage.
var start = 1, end = number;
var repeation = pic / number; // Total images divided by 12.

var main = document.querySelector(".main"); // Select main box for clear old appendChild.
var glassScreen = document.querySelector(".glassScreen"); // Select glass class for do operation.
var display = document.querySelector(".display"); // Select display class for display big image.
var displaybutton = document.querySelector(".display-button"); // Select display-button class for hide arrow button

function clearsmallimage(main) { // Clear firstchild of main class.
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    }
}

function clearbigimage(display) { // Clear firstchild of display class.
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    }
}

function displaySmallImage(start, end) {  // Display small images on webpage.
    for (i = start; i <= end; i++) {
        var div = document.createElement("div");
        div.className = "div-box" + [i];
        div.setAttribute("id", "division");
        document.querySelector(".main").appendChild(div);

        var img = document.createElement("img");
        img.value = i;
        img.src = "Images/" + [i] + ".JPG";
        img.setAttribute("class", "image");
        img.onclick = function () { imageclick(this.value) };
        document.querySelector(".div-box" + [i]).appendChild(img);
    }
}

displaySmallImage(start, end); // Display small images by default.

function numberButtonClick(text) {
    clearsmallimage(main);
    j = 1;

    for (i = 1; i <= text; i++) {
        start = j;
        j = j + number;
        end = number * text;
        if (end > pic) {
            end = pic;
        }
    }

    displaySmallImage(start, end); // Display small images.
}

for (i = 0; i <= repeation; i++) { // It is for display below number buttons to view number of images.
    var button = document.createElement("button");
    button.innerHTML = i + 1;
    button.className = "button";
    button.onclick = function () { numberButtonClick(this.innerHTML); }
    document.querySelector(".button-div").appendChild(button);
}

function imageclick(value) { // Click on small image to display particular image in big way.
    clearbigimage(display);

    glassScreen.style.display = "block";
    display.style.display = "block";
    displaybutton.style.display = "block";

    var displayimg = document.createElement("img");
    displayimg.value = value;
    displayimg.src = "Images/" + [value] + ".JPG";
    displayimg.alt = "Images/16.jpg";
    displayimg.setAttribute("class", "image");
    displayimg.setAttribute("id", "bigimage");
    document.querySelector(".display").appendChild(displayimg);
}

function arrow(value)
{
  var bigimage = document.querySelector("#bigimage"); // To slide images

  if(value === "left")
  {
    for(i = start ; i <= pic ; i++)
    {
      if(bigimage.value === start)
      {
        bigimage.value = pic;
      }
      if(bigimage.value === i)
      {
        bigimage.src = "Images/" + [bigimage.value - 1] + ".JPG";
      }
    }
    bigimage.value = bigimage.value - 1;
    console.log(bigimage.value);
  }
  else {
    for(i = start ; i <= pic ; i++)
    {
      if(bigimage.value === pic)
      {
        bigimage.value = 1;
      }
      if(bigimage.value === i)
      {
        bigimage.src = "Images/" + [bigimage.value + 1] + ".JPG";
      }
    }
    bigimage.value = bigimage.value + 1;
    console.log(bigimage.value);
  }
}

function hide() { // Hide big large box.
    glassScreen.style.display = "none";
    display.style.display = "none";
    displaybutton.style.display = "none";
}
