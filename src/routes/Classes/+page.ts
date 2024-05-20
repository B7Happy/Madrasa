import type { Classes } from '$lib/Class/Type';
import { dev } from '$app/environment';
import { devApi, prodApi } from '$lib/Method/helper';

export async function load({ fetch }) {
    const response = await fetch(`${dev ? devApi : prodApi}Classes`);
    const classes: Classes[] = await response.json();
    return { classes }
}