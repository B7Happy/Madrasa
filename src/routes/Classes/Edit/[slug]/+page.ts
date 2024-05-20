import type { Classes } from '$lib/Class/Type';

export async function load({ params}) {
    const response = await fetch('http://localhost:5272/api/Classes/' + params.slug);
    const resAllProfesseurs = await fetch('http://localhost:5272/api/Professeurs/GetAllProfesseurs');
    const classe = await response.json();
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { classe, allProfesseurs }
}