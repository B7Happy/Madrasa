type Eleves = {
    id: number;
    sn: number;
    suspendu: boolean;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string | null;
    age: number | null;
    lieuNaissance: string | null;
    telMobile: string | null;
    email: string | null;
    maisonId: number | null;
    maison: Maison | null;
    classesId: number | null;
    classes: Classes | null;
    dateEntree: string;
}

interface Parent {
    id: number;
    type: string;
    nom: string;
    prenom: string;
    telMobile: number | null;
    email: string | null;
    maisonId: number;
}

interface Classes {
    id: number;
    classe: string;
    professeursId: number;
    groupeId: number;
}

interface Maison {
    id: number;
    adresse: string;
    complement: string | null;
    codePostal: number;
    ville: string;
    telDomicile: number | null;
    adherent: boolean;
    categorie: string;
    eleves: any[] | null;
    parent: Parent[] | null;
}



export async function load({ fetch }) {
    const response = await fetch('http://localhost:5272/api/Eleves/CurrentEleves');
    const eleves: Eleves[] = await response.json();
    return { eleves }
}