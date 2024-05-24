import type { Classes } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {
    const response = await fetch(`${dev ? devApi : prodApi}Classes/GetAllClasses`);
    const allClasses: { value: number, name: string }[] = await response.json();
    return { allClasses }
}