<script lang="ts">
    import type { Eleves, ElevesUpdate, MaisonUpdate } from '$lib/Class/Type';
    import { Input, Label, Helper, Button, Checkbox, A, Radio, Select, Tabs, TabItem } from 'flowbite-svelte';
    import { UserCircleSolid, GridSolid, AddressBookSolid, ClipboardSolid, HomeSolid, BookOpenSolid } from 'flowbite-svelte-icons';
    import { fade } from "svelte/transition";
    import moment from 'moment';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
    export let data;

    const url = dev ? devApi : prodApi;
    let eleves : Eleves = data.eleves;

    eleves.dateEntree = formatDate(eleves.dateEntree);
    eleves.dateNaissance = formatDate(eleves.dateNaissance);

    function formatDate(dateString: string | null): string {
        let formattedDate = " ";  
        if(dateString != null){
            // Parse the date string using Moment.js
            const date = moment(dateString);
            // Format the date as dd-mm-yyyy
            formattedDate = date.format('yyyy-MM-DD');
        }
        return formattedDate;
    }  

    let allGrp = [
    { value: 1, name: 'GRP1' },
    { value: 2, name: 'GRP2' },
    { value: 3, name: 'GRP3' }
  ];



	function saveEleveData(eleveData: Eleves): void {
    console.log(eleveData);
    const jsonEleveData = JSON.stringify(eleveData);

    const eleveUpdatedData : ElevesUpdate = {
		id: eleveData.id,
		sn: eleveData.sn,
		suspendu: eleveData.suspendu,
		nom: eleveData.nom,
		prenom: eleveData.prenom,
		sexe: eleveData.sexe,
		dateNaissance: eleveData.dateNaissance,
		lieuNaissance: eleveData.lieuNaissance,
		telMobile: eleveData.telMobile,
		email: eleveData.email,
		maisonId: eleveData.maisonId,
		classesId: eleveData.classesId,
		dateEntree: eleveData.dateEntree
	  }

    
    const res = fetch(url + 'Eleves', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(eleveUpdatedData)
    })
    
    console.log(res);
	}

  function onChange(event: any) {
		eleves.sexe = event.currentTarget.value;
	}


	function saveDomicileData(eleves: Eleves): void {
    const maisonUpdatedData : MaisonUpdate = {
                id: eleves.maison ? eleves.maison.id : 1,
                adresse: eleves.maison ? eleves.maison.adresse : "",
                complement: eleves.maison?.complement ?? "",
                codePostal: eleves.maison ? eleves.maison.codePostal : 99999,
                ville: eleves.maison?.ville ?? "",
                telDomicile: eleves.maison?.telDomicile ?? 0,
                adherent: eleves.maison?.adherent ?? false,
                categorie: eleves.maison?.categorie ?? "",
	  };
    console.log(maisonUpdatedData);
    const res = fetch(url + 'Maison', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(maisonUpdatedData)
    });
    
    console.log(res);
  
}


	function saveParentData(eleves: Eleves): void {
    const parentUpdatedData = eleves.maison?.parent;
    console.log(parentUpdatedData);
    const res = fetch(url + 'Parent', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(parentUpdatedData)
    });		
	}

</script>

<div class="container bg-white rounded-lg mx-auto p-10">
<div>
 <h1 class=" text-4xl font-mono pb-10">
     Details Eleves
 </h1>

 <Tabs tabStyle="underline">
  <TabItem open>
    <div slot="title" class="flex items-center gap-2" >
      <UserCircleSolid size="md" />
      Identité
    </div>

      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <Label for="sn" class="mb-2">SN</Label>
            <Input type="number" id="sn" placeholder="Sn" bind:value={eleves.id} required disabled />
        </div>
        <div>
          <Label for="entre_date" class="mb-2">Entré(e) le</Label>
          <Input type="date" id="entre_date" bind:value={eleves.dateEntree} placeholder="Date" required />
        </div>
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
          <Label for="num_tel" class="mb-2">N° Domicile </Label>
          {#if eleves.maison}
            <Select class="mt-2" items={data.allDomicilNumber} bind:value={eleves.maisonId} />
          {/if}
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
      <div class="flex justify-end">
        <Button class="right-0 mt-4" on:click={() => saveEleveData(eleves)} color="blue">Enregistrer</Button>
      </div>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2" >
      <HomeSolid size="md" />
      Domicile
    </div>
    {#if eleves.maison}
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <Label for="adresse" class="mb-2">Adresse</Label>
        
          <Input type="text" id="adresse" placeholder="adresse" bind:value={eleves.maison.adresse} required />
        
      </div>
      <div>
        <Label for="complement" class="mb-2">Complément</Label>
        
          <Input type="text" id="complement" placeholder="complement adresse" bind:value={eleves.maison.complement} />
        
      </div>
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <div>
        <Label for="cp" class="mb-2">Code Postal</Label>
        <Input type="number" id="cp" placeholder="code postal" bind:value={eleves.maison.codePostal} required />
      </div>
      <div>
        <Label for="ville" class="mb-2">Ville</Label>
        <Input type="text" id="ville" placeholder="ville" bind:value={eleves.maison.ville} required/>
      </div>
      <div>
        <Label for="numdom" class="mb-2">N° Domicile</Label>
        <Input type="text" id="numdom" placeholder="Numero de domicile" bind:value={eleves.maison.telDomicile} required/>
      </div>
      <div>
        <Label for="adh" class="mb-2">Adherent</Label>
        <Checkbox class="mt-2" id="adh" bind:checked={eleves.maison.adherent} />
      </div>
    </div>
    {/if}
    <div class="flex justify-end">
      <Button class="right-0 mt-4" on:click={() => saveDomicileData(eleves)} color="blue">Enregistrer</Button>
    </div>
  </TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <AddressBookSolid size="md" />
      Parents
    </div>
     {#if eleves.maison?.parent}
    {#each eleves.maison.parent  as parent, i}
      {#if parent.type === 'Père'}
      <div class="text-lg font-semibold underline underline-offset-4">Père :</div> 
    <div class="grid gap-6 mt-6 mb-6 md:grid-cols-4">
    
      <div>
        <Label for="pereNom" class="mb-2">Nom</Label>
        <Input type="text" id="pereNom" placeholder="Nom" bind:value={eleves.maison.parent[i].nom} required />
      </div>
      <div>
        <Label for="perePrenom" class="mb-2">Prenom</Label>
        <Input type="text" id="perePrenom" placeholder="Prenom" bind:value={eleves.maison.parent[i].prenom} required/>
      </div>
      <div>
        <Label for="perenum" class="mb-2">N° Mobile</Label>
        <Input type="text" id="perenum" placeholder="Numero de telephone" bind:value={eleves.maison.parent[i].telMobile} required/>
      </div>
      <div>
        <Label for="pereMail" class="mb-2">Email</Label>
        <Input type="text" class="mt-2" id="pereMail" bind:value={eleves.maison.parent[i].email} placeholder="Email" />
      </div>
    </div>
    {:else if parent.type === 'Mère'}
    <h4 class="text-lg font-semibold underline underline-offset-4">Mère :</h4>
    <div class="grid gap-6 mt-6 mb-6 md:grid-cols-4">
    
      <div>
        <Label for="mereNom" class="mb-2">Nom</Label>
        <Input type="text" id="pereNom" placeholder="Nom" bind:value={eleves.maison.parent[i].nom} required />
      </div>
      <div>
        <Label for="merePrenom" class="mb-2">Prenom</Label>
        <Input type="text" id="perePrenom" placeholder="Prenom" bind:value={eleves.maison.parent[i].prenom} required/>
      </div>
      <div>
        <Label for="merenum" class="mb-2">N° Mobile</Label>
        <Input type="text" id="perenum" placeholder="Numero de telephone" bind:value={eleves.maison.parent[i].telMobile} required/>
      </div>
      <div>
        <Label for="mereMail" class="mb-2">Email</Label>
        <Input type="text" class="mt-2" id="mereMail" bind:value={eleves.maison.parent[i].email}  placeholder="Email" />
      </div>
    </div>
    {:else if parent.type === 'Tuteur'}
    <h4 class="text-lg font-semibold underline underline-offset-4">Contact à prevenir en cas d'urgence :</h4>
    <div class="grid gap-6 mt-6 mb-6 md:grid-cols-4">
    
      <div>
        <Label for="mereNom" class="mb-2">Nom</Label>
        <Input type="text" id="pereNom" placeholder="Nom" bind:value={eleves.maison.parent[i].nom} required />
      </div>
      <div>
        <Label for="merePrenom" class="mb-2">Prenom</Label>
        <Input type="text" id="perePrenom" placeholder="Prenom" bind:value={eleves.maison.parent[i].prenom} required/>
      </div>
      <div>
        <Label for="merenum" class="mb-2">N° Mobile</Label>
        <Input type="text" id="perenum" placeholder="Numero de telephone" bind:value={eleves.maison.parent[i].telMobile} required/>
      </div>
      <div>
        <Label for="mereMail" class="mb-2">Email</Label>
        <Input type="text" class="mt-2" id="mereMail" bind:value={eleves.maison.parent[i].email}  placeholder="Email" />
      </div>
    </div>
    {/if}
    {/each}
    {/if}
    <div class="flex justify-end">
      <Button class="right-0 mt-4" on:click={() => saveParentData(eleves)} color="blue">Enregistrer</Button>
    </div>
</TabItem>
  <TabItem>
    <div slot="title" class="flex items-center gap-2">
      <BookOpenSolid size="md" />
      Classe
    </div>
    {#if eleves.classes}
    <div class="grid gap-6 mb-6 md:grid-cols-4">
      <div>
        <Label for="classeClasse" class="mb-2">Classe</Label>
        <Select type="text" id="classeClasse" placeholder="Classe" items={data.allClasses} bind:value={eleves.classes.id} disabled />
      </div>
      <div>
        <Label for="merePrenom" class="mb-2">Groupe</Label>
        <Select type="text" id="perePrenom" placeholder="Groupe" items={allGrp} bind:value={eleves.classes.groupeId} disabled/>
      </div>
      <div>
        <Label for="Professeur" class="mb-2">Professeur</Label>
        <Select type="text" id="Professeur" placeholder="Professeur" items={data.allProfesseurs} bind:value={eleves.classes.professeurs.id} disabled/>   
      </div>
      <div>
        <Label for="mereMail" class="mb-2">NB élèves</Label>
        <Input type="number" class="mt-2" id="mereMail" value={eleves.classes.eleves.length +1} disabled />    
      </div>
    </div>
    {/if}
    <!-- <div class="flex justify-end">
      <Button class="right-0 mt-4" on:click={() => saveClasseData(eleves)} color="blue">Enregistrer</Button>
    </div> -->
  </TabItem>
</Tabs>
</div>
</div>