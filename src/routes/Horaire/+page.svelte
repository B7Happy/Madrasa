<script lang="ts">
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    
    import { Toast, FloatingLabelInput, Modal, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    
    export let data;

    function createHoraire() {
		if (browser) {
      goto('/Horaire/Create');
    }
	}
</script>

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
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>