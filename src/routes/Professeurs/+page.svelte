<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
    import type { Professeurs, ProfesseurCreate } from '$lib/Class/Type';
    import { Toast, FloatingLabelInput, Modal, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, P } from 'flowbite-svelte';
    import { CheckCircleSolid, CloseCircleSolid  } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
    const url = dev ? devApi : prodApi;
    export let data ;
    
    let createModal = false;
    let create = false;
    let editModal = false;
    let modifier = false;
    let deleteModal = false;

    let professeurEdit : Professeurs = {
		id: 0,
		nom: "",
		email: '',
		telMobile: null
	};

    let professeurCreate : ProfesseurCreate = {
		nom: '',
		email: '',
        telMobile: null 
	};

  let professeurDelete : Professeurs = {
    id: 0,
    nom: "",
    email: '',
    telMobile: null
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

    function createProfesseur(){
        modifier = false;
        create = true;
        const res = fetch(url + 'Professeurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(professeurCreate)
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


	function editProfesseurs(professeurs: Professeurs) {
		professeurs.id = professeurs.id;
        professeurs.nom = professeurs.nom;
        professeurs.email = professeurs.email;
        professeurs.telMobile = professeurs.telMobile;
        editModal = true;
	}


	function edit( ){
        create = false;
        modifier = true;
        const res = fetch(url + 'Professeurs', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(professeurEdit)
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

  function modalDelete(professeurs: Professeurs){
    professeurDelete.id = professeurs.id;
    professeurDelete.nom = professeurs.nom;
    professeurDelete.email = professeurs.email;
    professeurDelete.telMobile = professeurs.telMobile;
     deleteModal = true;

  }

    function deleteProfesseurs( professeur: Professeurs){
        create = false;
        modifier = true;
        const res = fetch(url + 'Professeurs', {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(professeur)
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

<Modal title="Creer un professeur" bind:open={createModal} autoclose>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurCreate.nom}>
        Nom
      </FloatingLabelInput>
      <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurCreate.email}>
        Email
      </FloatingLabelInput>
      <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurCreate.telMobile}>
        Telephone mobile
      </FloatingLabelInput>
    <svelte:fragment slot="footer">
      <Button color="blue" on:click={createProfesseur}>Enregistrer</Button>
      <Button color="alternative">Retour</Button>
    </svelte:fragment>
</Modal>

<Modal title="Supprimer le professeur" bind:open={deleteModal} autoclose>
  <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurDelete.nom} disabled>
      Nom
    </FloatingLabelInput>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurDelete.email} disabled>
      Email
    </FloatingLabelInput>
    <FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurDelete.telMobile} disabled>
      Telephone mobile
    </FloatingLabelInput>
  <svelte:fragment slot="footer">
    <Button color="red" on:click={() => deleteProfesseurs(professeurDelete)}>Suprimer</Button>
    <Button color="alternative">Retour</Button>
  </svelte:fragment>
</Modal>

<Modal title="Modifier" bind:open={editModal} autoclose>
    <div class="grid grid-cols-3 gap-4">
        <FloatingLabelInput style="outlined" id="disabled_outlined" name="disabled_outlined" type="text" bind:value={professeurEdit.id} disabled>
            Id
          </FloatingLabelInput>
        <FloatingLabelInput class="col-span-2" style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurEdit.nom}>
            Nom
          </FloatingLabelInput>
    </div>
    <div class="grid grid-cols-3 gap-4">
        <FloatingLabelInput style="outlined" id="disabled_outlined" name="disabled_outlined" type="text" bind:value={professeurEdit.email} >
            Email
          </FloatingLabelInput>
        <FloatingLabelInput class="col-span-2" style="outlined" id="floating_outlined" name="floating_outlined" type="text" bind:value={professeurEdit.telMobile}>
            Telephone mobile
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
        Le professeur a bien été creer.
    </Toast>
    {/if}
    {#if modifier}
    <Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        Le professeur a bien été modifier.
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
        Le professeur n'a pas été creer.
    </Toast>
    {/if}
    {#if modifier}
    <Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CloseCircleSolid  class="w-5 h-5" />
          <span class="sr-only">Error icon</span>
        </svelte:fragment>
        Le professeur n'a pas été modifier.
    </Toast>
    {/if}
    {/if}
</div>

<div class="container bg-white mx-auto rounded-lg" >
    <h1 class="ml-4 pt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Professeurs</h1>
    <div class="flex justify-end">
        <Button class="right-0 mt-4 mr-4 mb-6" on:click={() => (createModal = true)} color="blue"> + Professeur</Button>

    </div> 
<Table>
    <TableHead>
      <TableHeadCell>Nom</TableHeadCell>
      <TableHeadCell>Email</TableHeadCell>
      <TableHeadCell>Telephone mobile</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each data.professeurs as professeur}
        <TableBodyRow>
          <TableBodyCell>{professeur.nom}</TableBodyCell>
          <TableBodyCell>{professeur.email == null ? "" : professeur.email}</TableBodyCell>
          <TableBodyCell>{professeur.telMobile == null ? "" : professeur.telMobile}</TableBodyCell>
          <TableBodyCell>
            <Button on:click={() => editProfesseurs(professeur)} class="font-medium text-blue-600 hover:underline dark:text-blue-500">Modifier</Button>
            <Button on:click={() => modalDelete(professeur)} class="font-medium text-red-600 hover:underline dark:text-red-500">Suprimer</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>