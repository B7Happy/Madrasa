import type { Horaire } from '$lib/Class/Type';

export async function load({ fetch }) {
    const response = await fetch('http://localhost:5272/api/Horaire');
    const horaires: Horaire[] = await response.json();
    return { horaires }
}