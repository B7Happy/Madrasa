import type { Eleves } from '$lib/Class/Type';

export async function load({ params}) {
    const response = await fetch('http://localhost:5272/api/Eleves/' + params.slug);
    const resAllNumber = await fetch('http://localhost:5272/api/Maison/AllTelNumber');
    const resAllClasses = await fetch('http://localhost:5272/api/Classes/GetAllClasses');
    const resAllProfesseurs = await fetch('http://localhost:5272/api/Professeurs/GetAllProfesseurs');
    const eleves: Eleves = await response.json();
    const allDomicilNumber: { value: number, name: string }[] = await resAllNumber.json();
    const allClasses: { value: number, name: string }[] = await resAllClasses.json();
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { eleves, allDomicilNumber, allClasses, allProfesseurs }
}