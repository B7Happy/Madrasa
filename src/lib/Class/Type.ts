export type Eleves = {
    id: number;
    sn: number;
    suspendu: boolean;
    nom: string;
    prenom: string;
    sexe: string | null;
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

export type ElevesCreate = {
    suspendu: boolean;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string;
    lieuNaissance: string;
    telMobile: string;
    email: string;
    maisonId: number | null;
    classesId: number | null;
}

export type ElevesCreate2 = {
    suspendu: boolean;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaissance: string;
    lieuNaissance: string;
    telMobile: string;
    email: string;
    maisonId: number | null;
    classesId: number | null;
    maison: MaisonCreate | null;
    parent: ParentCreate[] | null;
}

export type ElevesUpdate = {
    id: number;
    sn: number;
    suspendu: boolean;
    nom: string;
    prenom: string;
    sexe: string | null;
    dateNaissance: string | null;
    lieuNaissance: string | null;
    telMobile: string | null;
    email: string | null;
    maisonId: number | null;
    classesId: number | null;
    dateEntree: string;
}

export type ElevesSuspendu = {
    id: number;
    suspendu: boolean;
}

export type Parent = {
    id: number;
    type: string;
    nom: string;
    prenom: string;
    telMobile: number | null;
    email: string | null;
    maisonId: number;
}
export type ParentCreate = {
    type: string;
    nom: string;
    prenom: string;
    telMobile: number | null;
    email: string | null;
    
}



export type Classes = {
    id: number;
    classe: string;
    professeursId: number;
    professeurs: Professeurs;
    eleves: Eleves[];
    groupeId: number;
}

export type ClasseCreate = {
    classe: string;
    professeursId: number | null;
    groupeId: number | null;
}

export type ClasseDelete = {
    id: number;
    classe: string;
    professeursId: number | null;
    groupeId: number | null;
}

export type Professeurs = {
    id: number;
    nom: string;
    email: string;
    telMobile: number | null;
}

export type ProfesseurCreate = {
    nom: string;
    email: string;
    telMobile: number | null;
}



export type Maison = {
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

export type MaisonCreate = {
    adresse: string;
    complement: string | null;
    codePostal: number;
    ville: string;
    telDomicile: number | null;
    adherent: boolean;
    categorie: string;
}

export type MaisonUpdate = {
    id: number;
    adresse: string;
    complement: string;
    codePostal: number;
    ville: string;
    telDomicile: number;
    adherent: boolean;
    categorie: string;
}

export type Login = {
    userName: string;
    password: string;
}

export type User = {
    UserName: string;
    Email: string;
    Token: string;
}

export type DocClasse = {
    classe: string;
    professeur: string;
    groupe: string;
    ttEleves: number;
    ttGarcon: number;
    ttFille: number;
    ttAdh: number;
    ttNonAdh: number;
}

export type DocSumClasse = {
    nom: string;
    eleves: number;
    garcon: number;
    fille: number;
    adh: number;
    nonAdh: number;
}

export type ClassData = {
    docClasse: DocClasse[];
};

export type Groupe = {
    id: number;
    nom: string;
}

export type GroupeCreate = {
    nom: string;
}

export type Horaire = {
    id: number;
    numJour: number;
    jour: string;
    hDeb: string;
    hFin: string;
    duree: string;
    groupeId: number;
    groupe: Groupe;
}

export type HoraireCreate = {
    numJour: number;
    jour: string;
    hDeb: string;
    hFin: string;
    duree: string;
    groupeId: number | null;
}