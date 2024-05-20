
type Professeurs = {
    nom: string
    telMobile: string
    email: string
}
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {

    const response = await fetch(`${dev ? devApi : prodApi}Professeurs`)
    const professeurs: Professeurs[] = await response.json()
    return { professeurs }
}