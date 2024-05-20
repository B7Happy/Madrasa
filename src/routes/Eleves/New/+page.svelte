<script lang="ts">
    import type { ElevesCreate, ElevesCreate2, MaisonCreate, ParentCreate } from '$lib/Class/Type';
    import { Input, Toggle , Label, Button, Checkbox, Select } from 'flowbite-svelte';
    let newMaison = false;
    let eleves : ElevesCreate2 = {
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuNaissance: "",
      telMobile: "",
      email: "",
      sexe: "M",
      suspendu: false,
      maisonId: 0,
      classesId: 0,
      parent: [],
      maison: null
    };
    let maison : MaisonCreate = {
		adresse: "",
		complement: "",
		codePostal: 0,
		ville: "",
		telDomicile: 0,
		adherent: false,
		categorie: "B"
	  };
    let pere : ParentCreate = {
		nom: "",
		prenom: "",
		telMobile: 0,
		email: "",
		type: "Père"
	  };  
    let mere : ParentCreate = {
          nom: "",
          prenom: "",
          telMobile: null,
          email: null,
          type: "Mère"
    };  
    export let data;
    function onChange(event: any) {
		  eleves.sexe = event.currentTarget.value;
	  }


    async function saveEleveData() {
      const parent = [pere, mere];
      eleves.parent = parent;
      eleves.maison = maison;
      console.log(eleves);
      console.log(JSON.stringify(eleves));
      let response = await fetch('http://localhost:5272/api/Eleves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eleves)
      });
      if (response.ok) {
        alert("Eleve ajouté avec succès");
      } else {
        alert("Erreur lors de l'ajout de l'eleve");
      }
    }
  
</script>

<div class="container bg-white rounded-lg mx-auto p-10">
  <div>
   <h1 class=" text-4xl font-mono pb-10">
       Nouveaux Eleves
   </h1>

      <!-- <div class="flex items-center gap-2" >
        <UserCircleSolid size="md" />
        Eleves
      </div> -->
  
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label for="nom" class="mb-2">Nom</Label>
            <Input type="text" id="nom" placeholder="Nom" bind:value={eleves.nom} required />
          </div>
          <div>
            <Label for="prenom" class="mb-2">Prenom</Label>
            <Input type="text" id="prenom" placeholder="Prenom" bind:value={eleves.prenom}  required />
          </div>
          <div>
            <Label for="date_birth" class="mb-2">Né(e) le</Label>
            <Input type="date" id="date_birth" bind:value={eleves.dateNaissance}  required />
          </div>
          <div>
            <Label for="visitors" class="mb-2">Sexe</Label>
            <input checked={eleves.sexe === "M"}  on:change={onChange} type="radio" name="sexe" value="M" /> M
            <input checked={eleves.sexe === "F"} class="ml-5" on:change={onChange} type="radio" name="sexe" value="F" /> F
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <Label for="birth_place" class="mb-2">Né(e) à</Label>
            <Input type="text" id="birth_place" placeholder="Lieu de naissance" bind:value={eleves.lieuNaissance}  required />
          </div>
          <div>
            <Label for="num_tel" class="mb-2">N° Telephone</Label>
            <Input type="tel" id="num_tel" placeholder="Numero de Telephone" bind:value={eleves.telMobile}  required />
          </div>
          <div>
            <Label for="email" class="mb-2">Email</Label>
            <Input type="email" id="email" placeholder="email" bind:value={eleves.email}  required />
          </div>
          <div>
            <Label for="num_dom" class="mb-2">N° Domicile </Label>
            <Select class="mt-2" items={data.allDomicilNumber} bind:value={eleves.maisonId} />
          </div>
          <div>
            <Label for="num_tel" class="mb-2">Classe</Label>
            <Select class="mt-2" items={data.allClasses} bind:value={eleves.classesId} />
          </div>
          <div>
            <Label for="adh" class="mb-2">Suspendu</Label>
            <Checkbox class="mt-2" id="adh" bind:checked={eleves.suspendu} />
            
          </div>
        </div>

        
        <Toggle class="mt-2" bind:checked={newMaison} color="blue">Rajouter un nouveau foyer</Toggle>
        
        {#if newMaison}
      <div class="flex items-center gap-2 mt-5" >
        
        Nouveaux Domicile
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <Label for="adresse" class="mb-2">Adresse</Label>
          <Input type="text" id="adresse" placeholder="adresse" bind:value={maison.adresse} required />         
        </div>
        <div>
          <Label for="complement" class="mb-2">Complément</Label>
          <Input type="text" id="complement" placeholder="complement adresse" bind:value={maison.complement} /> 
        </div>
        <div>
          <Label for="ville" class="mb-2">Ville</Label>
          <Input type="text" id="ville" placeholder="ville" bind:value={maison.ville} required/>
        </div>
      </div>
      <div class="grid gap-6 mb-6 md:grid-cols-4">
        <div>
          <Label for="cp" class="mb-2">Code Postal</Label>
          <Input type="number" id="cp" placeholder="code postal" bind:value={maison.codePostal} required />
        </div>
        <div>
          <Label for="numdom" class="mb-2">N° Domicile</Label>
          <Input type="text" id="numdom" placeholder="Numero de domicile" bind:value={maison.telDomicile} />
        </div>
        <div>
          <Label for="adh" class="mb-2">Adherent</Label>
          <Checkbox class="mt-2" id="adh" bind:checked={maison.adherent} />
        </div>
        <div>
          <Label for="cat" class="mb-2">Catégorie</Label>
          <Input class="mt-2" id="cat" bind:value={maison.categorie} />
        </div>
      </div>
      <div class="flex items-center gap-2">
  
        Parents
      </div>

        <div class="text-lg font-semibold underline underline-offset-4">Père :</div> 
      <div class="grid gap-6 mt-6 mb-6 md:grid-cols-4">
      
        <div>
          <Label for="pereNom" class="mb-2">Nom</Label>
          <Input type="text" id="pereNom" placeholder="Nom" bind:value={pere.nom} required />
        </div>
        <div>
          <Label for="perePrenom" class="mb-2">Prenom</Label>
          <Input type="text" id="perePrenom" placeholder="Prenom" bind:value={pere.prenom} required/>
        </div>
        <div>
          <Label for="perenum" class="mb-2">N° Mobile</Label>
          <Input type="text" id="perenum" placeholder="Numero de telephone" bind:value={pere.telMobile} required/>
        </div>
        <div>
          <Label for="pereMail" class="mb-2">Email</Label>
          <Input type="text" class="mt-2" id="pereMail" bind:value={pere.email} placeholder="Email" />
        </div>
      </div>
      
      <h4 class="text-lg font-semibold underline underline-offset-4">Mère :</h4>
      <div class="grid gap-6 mt-6 mb-6 md:grid-cols-4">
      
        <div>
          <Label for="mereNom" class="mb-2">Nom</Label>
          <Input type="text" id="pereNom" placeholder="Nom" bind:value={mere.nom} required />
        </div>
        <div>
          <Label for="merePrenom" class="mb-2">Prenom</Label>
          <Input type="text" id="perePrenom" placeholder="Prenom" bind:value={mere.prenom} required/>
        </div>
        <div>
          <Label for="merenum" class="mb-2">N° Mobile</Label>
          <Input type="text" id="perenum" placeholder="Numero de telephone" bind:value={mere.telMobile} required/>
        </div>
        <div>
          <Label for="mereMail" class="mb-2">Email</Label>
          <Input type="text" class="mt-2" id="mereMail" bind:value={mere.email}  placeholder="Email" />
        </div>
      </div>
      {/if}
      <div class="flex justify-end">
        <Button class="right-0 mt-4" on:click={saveEleveData} color="blue">Enregistrer</Button>
      </div> 
    </div>
  </div>