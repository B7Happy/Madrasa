import type { Horaire } from '$lib/Class/Type';

export async function load({ params}) {
    const response = await fetch('http://localhost:5272/api/Horaire/' + params.slug);
    const horaire : Horaire = await response.json();
    return horaire;
}