import type { Horaire } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {
    const response = await fetch(`${dev ? devApi : prodApi}Horaraire`);
    const horaires: Horaire[] = await response.json();
    return { horaires }
}