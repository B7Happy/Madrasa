import type { Classes } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';
export async function load({ params }) {
    const response = await fetch(`${dev ? devApi : prodApi}Classes/${params.slug}`);
    const resAllProfesseurs = await fetch(`${dev ? devApi : prodApi}Professeurs/GetAllProfesseurs`);
    const classe = await response.json();
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { classe, allProfesseurs }
}