<script lang="ts">
    import type { ClasseDelete, Classes } from '$lib/Class/Type';
    import { Button, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch, Modal, FloatingLabelInput, Toast } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
	  import { browser } from '$app/environment';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
	import { CloseCircleSolid } from 'flowbite-svelte-icons';
	import { slide } from 'svelte/transition';
    const url = dev ? devApi : prodApi;
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

  let deleteModal = false;
	function deleteModel(classe: Classes): void {
    classeDelete = classe;
		deleteModal = true;
    
	}


  let fail = false;
  let sucess = false;
  let open = false;
  let counter = 4;

  function triggerSucess() {
    open = true;
    sucess = true;
    counter = 4;
    timeout();
    }

    function triggerFail() {
    open = true;
    fail = true;
    counter = 4;
    timeout();
    }

    function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    open = false;
    }

    let classeDelete : Classes = {
		id: 0,
		classe: "",
		groupeId: 0,
		professeursId: 0,
		professeurs: {
			id: 0,
			nom: '',
			email: '',
			telMobile: null
		},
		eleves: []
	};

  let classDelete : ClasseDelete = {
    id: 0,
    classe: "",
    groupeId: 0,
    professeursId: 0
  };


	function deleteClasse(classeDelete: Classes): void {
		//deleteModal = true;
    classDelete.id = classeDelete.id;
    classDelete.classe = classeDelete.classe;
    classDelete.groupeId = classeDelete.groupeId;
    classDelete.professeursId = classeDelete.professeursId;

    const res = fetch(url + 'Classes', {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classDelete)
        });

        res.then((response) => {
            if (response.ok) {
                triggerSucess();
                location.reload();
            } else {
                triggerFail();
            }
        });
	}
</script>
<Modal title="Supprimer le professeur" bind:open={deleteModal} autoclose>
  <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={classeDelete.classe} disabled>
      Classe
    </FloatingLabelInput>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={classeDelete.professeurs.nom} disabled>
      Professeur
    </FloatingLabelInput>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={classeDelete.groupeId} disabled>
      Groupe
    </FloatingLabelInput>
  <svelte:fragment slot="footer">
    <Button color="red" on:click={() => deleteClasse(classeDelete)}>Suprimer</Button>
    <Button color="alternative">Retour</Button>
  </svelte:fragment>
</Modal>
{#if sucess}
<Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
    <svelte:fragment slot="icon">
      <CloseCircleSolid  class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    </svelte:fragment>
    Le groupe n'a pas été creer.
</Toast>
{/if}
{#if fail}
<Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
    <svelte:fragment slot="icon">
      <CloseCircleSolid  class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    </svelte:fragment>
    Le groupe n'a pas été modifier.
</Toast>
{/if}
<div class="container bg-white mx-auto rounded-lg" >
  <div class="flex justify-end">
    <Button class="right-0 mt-4 mr-4" on:click={addNewClasse} color="blue"> + Nouvelle classe</Button>
  </div> 
    <TableSearch placeholder="Rechercher par classe" hoverable={true} bind:inputValue={searchTerm}>
 
      <TableHead>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Classe</TableHeadCell>
          <TableHeadCell>Groupe</TableHeadCell>
          <TableHeadCell>Professeur</TableHeadCell>
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
                <Button on:click={() => deleteModel(classe)} class="font-medium text-red-600 hover:underline dark:text-red-500">Supprimer</Button>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </TableSearch>
</div>
