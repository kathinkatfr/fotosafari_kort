document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;
  let infoboks;
  let position;

  //hent json
  let jsondata = await fetch("kort.json");
  let objekter = await jsondata.json();

  //1. load svg
  let mySvg = await fetch("map.svg");
  let svg = await mySvg.text();

  document.querySelector("#map").innerHTML = svg;

  //2. find infobokse
  /*  let info_1 = document.querySelector("#map #info-1");
  let info_2 = document.querySelector("#map #info-2");
  let info_3 = document.querySelector("#map #info-3");
  let info_4 = document.querySelector("#map #info-4"); */

  //skjul dem
  /* info_1.style.visibility = "hidden";
  info_2.style.visibility = "hidden";
  info_3.style.visibility = "hidden";
  info_4.style.visibility = "hidden"; */

  //3. skift farve ved klik + vis tekst
  document.querySelector("#map #points").addEventListener("click", function (event) {
    clicked(event);
  });

  //function clicked
  function clicked(object) {
    document.querySelector("#info").classList.remove("vis");
    document.querySelector("#info").style.visibility = "visible";
    objekter.forEach((objekt) => {
      if (infoboks != undefined) {
        infoboks.style.visibility = "hidden";
      }
      console.log(objekt);

      //a. find det klikkede element
      selected = object.target;

      //find elementets placering
      position = selected.getBoundingClientRect();
      console.log(position);
      document.querySelector("#info").style.top = position.bottom + "px";
      document.querySelector("#info").style.left = position.right + "px";

      //b. find det klikkede elements id
      selectedID = selected.getAttribute("id");

      //c. find det klikkede elements fillfarve
      color = selected.getAttribute("fill");

      //d. vis info
      if (selectedID == objekt.sted) {
        document.querySelector("#info p").textContent = objekt.tekst;
        document.querySelector("#info").classList.add("vis");
        document.querySelector("#info h2").textContent = objekt.h2;
        document.querySelector("#info img").src = "/img/" + objekt.billede + ".webp";

        document.querySelector("#info").addEventListener("click", function () {
          document.querySelector("#info").style.visibility = "hidden";

          document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
          infoboks.style.visibility = "hidden";
        });
      }
      /*  if (selectedID === "punkt1") {
        info_1.style.visibility = "visible";
        infoboks = info_1;
      }
      if (selectedID === "punkt2") {
        info_2.style.visibility = "visible";
        infoboks = info_2;
      }
      if (selectedID === "punkt3") {
        info_3.style.visibility = "visible";
        infoboks = info_3;
      }
      if (selectedID === "punkt4") {
        info_4.style.visibility = "visible";
        infoboks = info_4;
      } */
    });
    //4. hvis der tidligere har været klikket skal det forrige element skifte farve til original
    if (active != undefined) {
      active.setAttribute("fill", color);
    }

    //gør det klikkede til det aktive
    active = selected;

    //skift farve på det valgte
    if (color === "#b62300") {
      document.querySelector("#" + selectedID).setAttribute("fill", "#123456");
    }

    //reset farve og skjul tekst hvis valgt element allerede er aktivt
    else {
      document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
      document.querySelector("#info").style.visibility = "hidden";
      /*  infoboks.style.visibility = "hidden"; */
    }
  }
}
