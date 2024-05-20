import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ params }) {
    const resAllProfesseurs = await fetch(`${dev ? devApi : prodApi}Professeurs/GetAllProfesseurs`);
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { allProfesseurs }
}