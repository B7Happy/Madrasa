<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
    import type { Groupe, GroupeCreate } from '$lib/Class/Type';
    import { Toast, FloatingLabelInput, Modal, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { CheckCircleSolid, CloseCircleSolid  } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    export let data ;
    let createModal = false;
    let create = false;
    let editModal = false;
    let modifier = false;

    let groupeEdit : Groupe = {
        id: 0,
        nom: ""
    };

    let groupeCreate : GroupeCreate = {
        nom: ""
    };

	function addNewGroupe() {
		if (browser) {
            goto('/Groupe/Create');
        }
    }

    let open = false;
    let fail = false;
    let sucess = false;
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

    function createGroupe(){
        modifier = false;
        create = true;
        const res = fetch('http://localhost:5272/api/Groupe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupeCreate)
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


	function editGroupe(groupe: Groupe) {
		groupeEdit.id = groupe.id;
        groupeEdit.nom = groupe.nom;
        editModal = true;
	}


	function edit(){
        create = false;
        modifier = true;
        const res = fetch('http://localhost:5272/api/Groupe', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupeEdit)
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

<Modal title="Create groupe" bind:open={createModal} autoclose>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={groupeCreate.nom}>
        Groupe
      </FloatingLabelInput>
    <svelte:fragment slot="footer">
      <Button color="blue" on:click={createGroupe}>Enregistrer</Button>
      <Button color="alternative">Retour</Button>
    </svelte:fragment>
</Modal>

<Modal title="Edit groupe" bind:open={editModal} autoclose>
    <div class="grid grid-cols-3 gap-4">
        <FloatingLabelInput style="outlined" id="disabled_outlined" name="disabled_outlined" type="text" bind:value={groupeEdit.id} disabled>
            Id
          </FloatingLabelInput>
        <FloatingLabelInput class="col-span-2" style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={groupeEdit.nom}>
            Groupe
          </FloatingLabelInput>
    </div>
    <svelte:fragment slot="footer">
      <Button color="blue" on:click={edit}>Enregistrer</Button>
      <Button color="alternative">Retour</Button>
    </svelte:fragment>
</Modal>

  <div class="flex justify-end">
    {#if sucess}
    {#if create}
    <Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        Le groupe a bien été creer.
    </Toast>
    {/if}
    {#if modifier}
    <Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        Le groupe a bien été modifier.
    </Toast>
    {/if}
    {/if}
    {#if fail}
    {#if create}
    <Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CloseCircleSolid  class="w-5 h-5" />
          <span class="sr-only">Error icon</span>
        </svelte:fragment>
        Le groupe n'a pas été creer.
    </Toast>
    {/if}
    {#if modifier}
    <Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CloseCircleSolid  class="w-5 h-5" />
          <span class="sr-only">Error icon</span>
        </svelte:fragment>
        Le groupe n'a pas été modifier.
    </Toast>
    {/if}
    {/if}
</div>

<div class="container bg-white mx-auto rounded-lg" >
    <h1 class="ml-4 pt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Groupes</h1>
    <div class="flex justify-end">
      <Button class="right-0 mt-4 mr-4 mb-6" on:click={() => (createModal = true)} color="blue"> + Nouvelle groupe</Button>
    </div> 
<Table>
    <TableHead>
      <TableHeadCell>Id</TableHeadCell>
      <TableHeadCell>Groupe</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.groupes as groupe}
        <TableBodyRow>
          <TableBodyCell>{groupe.id}</TableBodyCell>
          <TableBodyCell>{groupe.nom}</TableBodyCell>
          <TableBodyCell>
            <Button on:click={() => editGroupe(groupe)} class="font-medium text-blue-600 hover:underline dark:text-blue-500">Modifier</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>