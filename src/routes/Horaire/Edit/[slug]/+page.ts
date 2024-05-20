import type { Horaire } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ params }) {
    const response = await fetch(`${dev ? devApi : prodApi}Horaire/${params.slug}`);
    const horaire : Horaire = await response.json();
    return horaire;
}