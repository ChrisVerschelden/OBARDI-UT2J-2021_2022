var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
  if (mousedownID == -1)  //Prevent multimple loops!
    mousedownID = setInterval(whilemousedown, 10 /*execute every 100ms*/);
}
function mouseup(event) {
  if (mousedownID != -1) {  //Only stop if exists
    clearInterval(mousedownID);
    mousedownID = -1;
  }
}

function whilemousedown() {
  updateLegend();
}

window.addEventListener("wheel", function (e) {
  updateLegend();
});

//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);

var search = document.getElementById('searchBar');
search.addEventListener("keydown", function (e) {
  if (e.code === 'Enter')
    centerOn();
});