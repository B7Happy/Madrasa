export async function load({ params}) {
    const resAllProfesseurs = await fetch('http://localhost:5272/api/Professeurs/GetAllProfesseurs');
    const allProfesseurs: { value: number, name: string }[] = await resAllProfesseurs.json();
    return { allProfesseurs }
}