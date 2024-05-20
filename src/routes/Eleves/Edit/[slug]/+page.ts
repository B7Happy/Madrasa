import type { Eleves } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ params }) {
    const response = await fetch(`${dev ? devApi : prodApi}Eleves/${params.slug}`);
    const resAllNumber = await fetch(`${dev ? devApi : prodApi}Maison/AllTelNumber`);
    const resAllClasses = await fetch(`${dev ? devApi : prodApi}Classes/GetAllClasses`);
    const resAllProfesseurs = await fetch(`${dev ? devApi : prodApi}Professeurs/GetAllProfesseurs`);
    const eleves: Eleves = await response.json();
    const allDomicilNumber: { value: number, name: string }[] = await resAllNumber.json();
    const allClasses: { value: number, name: string }[] = await resAllClasses.json();
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { eleves, allDomicilNumber, allClasses, allProfesseurs }
}