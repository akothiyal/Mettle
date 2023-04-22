function myFunction() {
      var popup = document.getElementById('myPopup');
      popup.classList.toggle('show'); //changes the class of the div to show
      document.getElementById("problem1funcplan_map").src = "mapactive.png"//changes the src of image
}

function hidedetils() {
  document.getElementById("func_desc").style.visibility = "hidden"
}

function openfunc() {
  window.open("/problem/1/tasks/role/functional/model", target = "_self");
}

// opens the page when the respective svg is clicked
function openfunceval() {
  window.open("/problem/1/tasks/role/functional/evaluate", target = "_self");
}
// opens the page when the respective svg is clicked
function openfuncplan() {
  window.open("/problem/1/tasks/role/functional/plan", target = "_self");
}

function openqual() {
  window.open("/problem/1/tasks/role/qualitative/model", target = "_self");
}

// opens the document problem1qualmodel in the same frame when the function is called
function openquant() {
  window.open("/problem/1/tasks/role/quantitative/model", target = "_self");
}

function openquant_eval() {
  window.open("/problem/1/tasks/role/quantitative/evaluate", target = "_self");
}

function openquant_plan() {
  window.open("/problem/1/tasks/role/quantitative/plan", target = "_self");
}

// opens the document problem1quantmodel in the same frame when the function is called
function opencalc() {
  window.open("/problem/1/tasks/role/calculation/calculation", target = "_self");
}
// opens the document problem1calc in the same frame when the function is called
function openeval() {
  window.open("/problem/1/tasks/role/evaluation/evaluation", target = "_self");
}

function openmap() {
  window.open("/problem/1/map", target = "_self");
}

function checkURL(urlString){
  console.log("in check");
  return urlString.replace("role","Driver");
}