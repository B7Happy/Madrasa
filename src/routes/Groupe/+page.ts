import type { Groupe } from '$lib/Class/Type';

export async function load({ fetch }) {
    const response = await fetch('http://localhost:5272/api/Groupe');
    const groupes: Groupe[] = await response.json();
    return { groupes };
}