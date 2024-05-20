import type { Groupe } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {
    const response = await fetch(`${dev ? devApi : prodApi}Groupe`);
    const groupes: Groupe[] = await response.json();
    return { groupes };
}