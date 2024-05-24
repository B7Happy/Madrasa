import type { Professeurs } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {

    const response = await fetch(`${dev ? devApi : prodApi}Professeurs`)
    const professeurs: Professeurs[] = await response.json()
    return { professeurs }
}