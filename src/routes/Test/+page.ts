import type { Eleves, Classes, } from '$lib/Class/Type';

export async function load({ fetch }) {
    const response = await fetch('Templates/ClasseComptage.docx');
    const content = await response.arrayBuffer();

    const classeData = await fetch('http://localhost:5272/api/Classes');
    const classeDataJson : Classes[] = await classeData.json();

    return { content, classeDataJson };
}