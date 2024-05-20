import type { Classes } from '$lib/Class/Type';

export async function load({ fetch }) {
    const response = await fetch('http://localhost:5272/api/Classes');
    const classes: Classes[] = await response.json();
    return { classes }
}