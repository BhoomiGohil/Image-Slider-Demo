var pic = 15 , number = 12 ;
var start = 1, end = 12 ;
var repeation = pic / number ;

var main = document.querySelector(".main");
var glassScreen = document.querySelector(".glassScreen");
var display = document.querySelector(".display");

function clearsmallimage(main) {
    while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
    }
}

function clearbigimage(display) {
    while(display.hasChildNodes()){
      display.removeChild(display.firstChild);
    }
}

function displaySmallImage(start , end)
{
    for (i = start; i <= end; i++) {
        var div = document.createElement("div");
        div.className = "div-box" + [i];
        div.setAttribute("id", "division");
        document.querySelector(".main").appendChild(div);

        var img = document.createElement("img");
        img.value = i;
        img.src = "Images/" + [i] + ".JPG" ;
        img.setAttribute("class", "image");
        img.onclick = function(){ imageclick(this.value) };
        document.querySelector(".div-box" + [i]).appendChild(img);
    }
}

displaySmallImage(start , end);

function numberButtonClick(text)
{
    clearsmallimage(main);
    j = 1;

    for(i = 1 ; i <= text ; i++)
    {
      start = j ;
      j = j + 12;
      end = number * text;
      if(end > pic)
      {
        end = pic;
      }
    }

    displaySmallImage(start , end);
}

function imageclick(value)
{
  clearbigimage(display);

  glassScreen.style.display = "block";
  display.style.display = "block";

  var displayimg = document.createElement("img");
  displayimg.src = "Images/" + [value] + ".JPG";
  displayimg.alt = "Images/16.jpg";
  displayimg.setAttribute("class","image");
  displayimg.setAttribute("id","bigimage");
  document.querySelector(".display").appendChild(displayimg);
}

for (i = 0; i <= repeation; i++) {
    var button = document.createElement("button");
    button.innerHTML = i + 1;
    button.className = "button";
    button.onclick = function () { numberButtonClick(this.innerHTML); }
    document.querySelector(".button-div").appendChild(button);
}

function hide()
{
  glassScreen.style.display = "none";
  display.style.display = "none";
}
