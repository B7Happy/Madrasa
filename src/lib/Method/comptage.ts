import type { Classes, ClassData, DocClasse, DocSumClasse } from "$lib/Class/Type";

export function classeDocData(inputJSON : Classes[]) {


    let allDocData: DocClasse[] = new Array();;

    inputJSON.forEach((classe) => {
        
        let docClasse: DocClasse = {
            classe: "",
            professeur: "",
            groupe: "",
            ttEleves: 0,
            ttGarcon: 0,
            ttFille: 0,
            ttAdh: 0,
            ttNonAdh: 0
        };

        let maleCount = 0;
        let femaleCount = 0;
        let adhCount = 0;
        let nonAdhCount = 0;
        
        docClasse.classe = classe.classe;
        docClasse.professeur = classe.professeurs.nom;
        docClasse.groupe = groupeName(classe.groupeId);
        docClasse.ttEleves = classe.eleves.length;
        classe.eleves.forEach(eleve => {
            if (eleve.sexe === "M") {
                maleCount++;
              } else if (eleve.sexe === "F") {
                femaleCount++;
            }
            
            if (eleve.maison?.adherent === true) {
                adhCount++;
              } else {
                nonAdhCount++;
              }
        });

        docClasse.ttGarcon = maleCount;
        docClasse.ttFille = femaleCount;
        docClasse.ttAdh = adhCount;
        docClasse.ttNonAdh = nonAdhCount;

        allDocData.push(docClasse);
    });
    console.log(allDocData);
    // Create the transformed JSON
    // const Data: ClassData = {
    //     docClasse : allDocData,
    // }
    let classeData: ClassData = {
        docClasse : allDocData
    }
    return allDocData;

}

export function classeDocSumData(inputJSON : Classes[]) {


    let allDocSumData: DocSumClasse[] = new Array();

    const ttNom = "TOTAL:";
    let ttElevesCount = 0;
    let ttMCount = 0;
    let ttFCount = 0;
    let ttadhCount = 0;
    let ttnonAdhCount = 0;

    const Grp1Nom = "GRP1:";
    let grp1ElevesCount = 0;
    let grp1MCount = 0;
    let grp1FCount = 0;
    let grp1adhCount = 0;
    let grp1nonAdhCount = 0;

    const Grp2Nom = "GRP2:";
    let grp2ElevesCount = 0;
    let grp2MCount = 0;
    let grp2FCount = 0;
    let grp2adhCount = 0;
    let grp2nonAdhCount = 0;

    const Grp3Nom = "GRP3:";
    let grp3ElevesCount = 0;
    let grp3MCount = 0;
    let grp3FCount = 0;
    let grp3adhCount = 0;
    let grp3nonAdhCount = 0;

    inputJSON.forEach((classe) => {

        if (classe.groupeId == 1) {
            classe.eleves.forEach(eleve => {
                ttElevesCount++;
                grp1ElevesCount++;
                if (eleve.sexe === "M") {
                    grp1MCount++;
                    ttMCount++;
                  } else if (eleve.sexe === "F") {
                    grp1FCount++;
                    ttFCount++;
                }
                
                if (eleve.maison?.adherent === true) {
                    grp1adhCount++;
                    ttadhCount++;
                  } else {
                    grp1nonAdhCount++;
                    ttnonAdhCount++;
                  }
            })
        }

        if (classe.groupeId == 2) {
            classe.eleves.forEach(eleve => {
                ttElevesCount++;
                grp2ElevesCount++;
                if (eleve.sexe === "M") {
                    grp2MCount++;
                    ttMCount++;
                  } else if (eleve.sexe === "F") {
                    grp2FCount++;
                    ttFCount++;
                }
                
                if (eleve.maison?.adherent === true) {
                    grp2adhCount++;
                    ttadhCount++;
                  } else {
                    grp2nonAdhCount++;
                    ttnonAdhCount++;
                  }
            })
        }

        if (classe.groupeId == 3) {
            classe.eleves.forEach(eleve => {
                ttElevesCount++;
                grp3ElevesCount++;
                if (eleve.sexe === "M") {
                    grp3MCount++;
                    ttMCount++;
                  } else if (eleve.sexe === "F") {
                    grp3FCount++;
                    ttFCount++;
                }
                
                if (eleve.maison?.adherent === true) {
                    grp3adhCount++;
                    ttadhCount++;
                  } else {
                    grp3nonAdhCount++;
                    ttnonAdhCount++;
                  }
            })
        }
    });
        
    let docSumClasseTT: DocSumClasse = {
        nom: ttNom,
        eleves: ttElevesCount,
        garcon: ttMCount,
        fille: ttFCount,
        adh: ttadhCount,
        nonAdh: ttnonAdhCount
    };

    let docSumClasse1: DocSumClasse = {
        nom: Grp1Nom,
        eleves: grp1ElevesCount,
        garcon: grp1MCount,
        fille: grp1FCount,
        adh: grp1adhCount,
        nonAdh: grp1nonAdhCount
    };

    let docSumClasse2: DocSumClasse = {
        nom: Grp2Nom,
        eleves: grp2ElevesCount,
        garcon: grp2MCount,
        fille: grp2FCount,
        adh: grp2adhCount,
        nonAdh: grp2nonAdhCount
    };

    let docSumClasse3: DocSumClasse = {
        nom: Grp3Nom,
        eleves: grp3ElevesCount,
        garcon: grp3MCount,
        fille: grp3FCount,
        adh: grp3adhCount,
        nonAdh: grp3nonAdhCount
    };

    allDocSumData.push(docSumClasseTT);
    allDocSumData.push(docSumClasse1);
    allDocSumData.push(docSumClasse2);
    allDocSumData.push(docSumClasse3);

    return allDocSumData;

}


function groupeName(groupeId: number) {
    let groupeName : string = "";
    switch (groupeId) {
        case 1:
            groupeName = "GRP1"
            break;
        case 2:
            groupeName = "GRP2"
            break;
        case 3:
            groupeName = "GRP3"
            break;
        default:
            break;
    }
    return groupeName;
}