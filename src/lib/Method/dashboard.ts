import type { Eleves } from "../Class/Type";
 
export function transformJSON(inputJSON : Eleves[]) {


    //const data = JSON.parse(inputJSON);
  
    // Count the number of males and females
    let maleCount = 0;
    let femaleCount = 0;
    inputJSON.forEach((item) => {
      if (item.sexe === "M") {
        maleCount++;
      } else if (item.sexe === "F") {
        femaleCount++;
      }
    });
  
    // Create the transformed JSON
    const transformedJSON = {
      labels: ["Garcon", "Fille"],
      datasets: [
        {
          data: [maleCount, femaleCount],
          backgroundColor: ["#89CFF0", "#de3a7b"],
          hoverBackgroundColor: ["#9bd0e8", "#db6996"],
        },
      ],
    };
  
    return transformedJSON;
}

export function makeGroupeJSON(inputJSON : Eleves[]) {

  // Count the number of males and females
  let groupe1Count = 0;
  let groupe2Count = 0;
  let groupe3Count = 0;
  inputJSON.forEach((item) => {
    if (item.classes?.groupeId === 1) {
      groupe1Count++;
    } else if (item.classes?.groupeId === 2) {
      groupe2Count++;
    } else if (item.classes?.groupeId === 3) {
      groupe3Count++;
    }
  });

  // Create the transformed JSON
  const transformedJSON = {
    labels: ["GRP1", "GRP2", "GRP3"],
    datasets: [
      {
        data: [groupe1Count, groupe2Count, groupe3Count],
        backgroundColor: ["#2b2d42", "#8d99ae","#edf2f4"],
        hoverBackgroundColor: ["#2b2d42", "#8d99ae","#edf2f4"],
      },
    ],
  };

  return transformedJSON;
}

export function makeCatJSON(inputJSON : Eleves[]) {

  // Count the number of males and females
  let adhCount = 0;
  let nonAdhCount = 0;
  inputJSON.forEach((item) => {
    if (item.maison?.adherent === true) {
      adhCount++;
    } else if (item.maison?.adherent === false) {
      nonAdhCount++;
    }
  });

  // Create the transformed JSON
  const transformedJSON = {
    labels: ["ADH", "/ADH"],
    datasets: [
      {
        data: [adhCount, nonAdhCount],
        backgroundColor: ["#42047e", "#f8acff"],
        hoverBackgroundColor: ["#7014f2", "#f8acff"],
      },
    ],
  };

  return transformedJSON;
}