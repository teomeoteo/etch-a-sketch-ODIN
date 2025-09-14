// grab the body and create a container div for the grid

// add a button that will prompt the user to input how big the grid should be, it should remove the current grid and display the new one

// the grid input can be no larger than 100 thats 100x100 sized grid max

// for the hover state of the divs it should randomize the background color for each and progressively darken the squares that are hovered, on 20 squares it should becompletely black, do this with setting a background overlay black and then just increasing its opacity slowly progressively. The background overlay can be done with ::before it should create a pseudo element that stretches the entire div

var body = document.querySelector("body");

// 1. Add container div

var container = document.createElement("div");
container.style.cssText = "width: 962px; height: 962px; background-color: black";
container.className = "main-container";
body.appendChild(container);

// 2. Define Create Grid function and prompt

function getRandomColor() {
  const r = Math.floor(Math.random() * 256); // 0-255
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}


let cellsHoveredTotal = 10;
function createGrid(size) {
  container.innerHTML = "";
  let containerDivs = document.createElement("div");
  containerDivs.className = "div-container";
  containerDivs.style.cssText = `width: 960px; height: 960px; border: 1px solid black;`; // create the perfect fit for the grid
  containerDivs.addEventListener('mouseover', (e) => {
    let target = e.target;
    if (target.classList.contains("gridDiv")) {
      if (cellsHoveredTotal >= 0) {
        target.style.background = getRandomColor();
        target.style.opacity = cellsHoveredTotal / 10;
        cellsHoveredTotal--;
      }

      else if (cellsHoveredTotal < 0) {
        target.style.background = getRandomColor();
        target.style.opacity = Math.abs(cellsHoveredTotal) / 10;
        cellsHoveredTotal--;
      }

      if (cellsHoveredTotal < -10) {
        cellsHoveredTotal = 10; //repeat
      }
    }
  })
  container.appendChild(containerDivs);
  let divs = [];
  for (let i = 0; i < size; i++) {
    let currentDiv = document.createElement("div");
    currentDiv.className = "gridDiv"
    let divSize = 960 / Math.sqrt(size);
    currentDiv.style.cssText = `width: ${divSize}px; height: ${divSize}px;  background-color: white`; // have them fit inside correctly.
    divs.push(currentDiv);
  }

  divs.forEach(a => containerDivs.appendChild(a));
}

function promptCreate() {
  let cellsPerSide = prompt("Enter number of cells per side (range: 1-100)");
  if (cellsPerSide > 0 && cellsPerSide <= 100) {
    let numberOfCells = cellsPerSide * cellsPerSide; // this isnt in pixels, this is the number of divs and the divs have their own surface area
    createGrid(numberOfCells);
    cellsHoveredTotal = 10;
  }

  else {
    alert("Please Choose a valid range");
  }

}

// 3. Add button

var button = document.createElement("button");
button.addEventListener('click', promptCreate);
button.style.cssText = "width: 200px; height: 50px; font-size: 20px;";
button.textContent = "Create New Grid";
body.prepend(button);