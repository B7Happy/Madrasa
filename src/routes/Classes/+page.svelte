<script lang="ts">
    import type { Classes } from '$lib/Class/Type';
    import { Button, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
	  import { browser } from '$app/environment';
    export let data;
    function Grp(id: number){
       let grp = ""; 
        switch(id) { 
        case 1: { 
            grp = "GRP1"; 
            break; 
        } 
        case 2: { 
            grp = "GRP2"; 
            break; 
        } 
            case 3: { 
                grp = "GRP3"; 
                break; 
            }
        default: { 
            grp = "GRP"  
            break; 
        } 
    }
        return grp;
} 
let searchTerm = '';
$: filteredItems = data.classes.filter((item) => item.classe.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);



	function addNewClasse() {
		if (browser) {
      goto('/Classes/Create');
    }
	}
</script>
<div class="container bg-white mx-auto rounded-lg" >
  <div class="flex justify-end">
    <Button class="right-0 mt-4 mr-4" on:click={addNewClasse} color="blue"> + Nouvelle classe</Button>
  </div> 
    <TableSearch placeholder="Rechercher par classe" hoverable={true} bind:inputValue={searchTerm}>
 
      <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Classe</TableHeadCell>
          <TableHeadCell>Professeur</TableHeadCell>
          <TableHeadCell>Groupe</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
          {#each filteredItems as classe}
            <TableBodyRow>
              <TableBodyCell>{classe.id}</TableBodyCell>
              <TableBodyCell>{classe.classe}</TableBodyCell>
              <TableBodyCell>{Grp(classe.groupeId)}</TableBodyCell>
              <TableBodyCell>{classe.professeurs.nom}</TableBodyCell>
              <TableBodyCell>
                <a href="Classes/Edit/{classe.id}" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Modifier</a>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
</div>
