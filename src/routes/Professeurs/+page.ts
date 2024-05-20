
type Professeurs = {
    nom: string
    telMobile: string
    email: string
}

export async function load({ fetch }) {
    // `fetch` understands the relative path and saves the response
    // inside the HTML to be reused avoiding additional requests
    const response = await fetch('http://localhost:5272/api/Professeurs')
  
    // SvelteKit is going to generate the types
    const professeurs: Professeurs[] = await response.json()
  
    // this becomes available on the page as `data.posts`
    return { professeurs }
}