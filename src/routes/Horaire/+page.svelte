<script lang="ts">

	import type { Horaire } from '$lib/Class/Type.js';

    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import { Button, FloatingLabelInput, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
    const url = dev ? devApi : prodApi;
    export let data;

    function createHoraire() {
		if (browser) {
      goto('/Horaire/Create');
    }
	}

  let deleteModale = false;

  let horaireToDelete: Horaire = {
	  id: 0,
	  numJour: 0,
	  jour: "",
	  hDeb: "",
	  hFin: "",
	  duree: "",
	  groupeId: 0,
	  groupe: {
		  id: 0,
		  nom: ''
	  }
  };
  


	function deleteModel(horaire: Horaire): any {
		horaireToDelete = horaire;
    deleteModale = true;
	}

  function deleteHoraire(horaire: Horaire): any {
    const res = fetch(url + 'Horaire', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(horaire)
    }).then(res => {
      if (res.ok) {
        //goto('/Horaire');
      } else {
        console.log('Erreur');
      }
    });
  }

</script>

<Modal title="Supprimer l'horaire" bind:open={deleteModale} autoclose>
  Etes-vous sûr de vouloir supprimer l'horaire ?
  <svelte:fragment slot="footer">
    <Button color="red" on:click={() => deleteHoraire(horaireToDelete)}>Suprimer</Button>
    <Button color="alternative">Retour</Button>
  </svelte:fragment>
</Modal>
<div class="container bg-white mx-auto rounded-lg" >
    <h1 class="ml-4 pt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Horaire</h1>
    <div class="flex justify-end">
      <Button class="right-0 mt-4 mr-4 mb-6" on:click={createHoraire} color="blue"> + Horaire</Button>
    </div> 
<Table>
    <TableHead>
      <!-- <TableHeadCell>Id</TableHeadCell>
      <TableHeadCell>Num Jour</TableHeadCell> -->
      <TableHeadCell>Jour</TableHeadCell>
      <TableHeadCell>Heure debut</TableHeadCell>
      <TableHeadCell>Heure fin</TableHeadCell>
      <TableHeadCell>Durée</TableHeadCell>
      <TableHeadCell>Groupe</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.horaires as horaire}
        <TableBodyRow>
          <!-- <TableBodyCell>{horaire.id}</TableBodyCell>
          <TableBodyCell>{horaire.numJour}</TableBodyCell> -->
          <TableBodyCell>{horaire.jour}</TableBodyCell>
          <TableBodyCell>{horaire.hDeb}</TableBodyCell>
          <TableBodyCell>{horaire.hFin}</TableBodyCell>
          <TableBodyCell>{horaire.duree}</TableBodyCell>
          <TableBodyCell>{horaire.groupeId}</TableBodyCell>
          <TableBodyCell>
          <a href="/Horaire/Edit/{horaire.id}" class="text-blue-600 hover:text-blue-900">Modifier</a>
          <Button on:click={() => deleteModel(horaire)} class="text-red-600 hover:text-red-900">Supprimer</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>