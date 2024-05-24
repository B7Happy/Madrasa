<script lang="ts">
    import { browser } from '$app/environment';
    import moment from 'moment';
    export let data;
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables';
    import { AddressBookSolid, CalendarWeekSolid, UserAddSolid, UserEditSolid, UserRemoveSolid } from 'flowbite-svelte-icons';
    import { Button, FloatingLabelInput, Modal } from 'flowbite-svelte';
    import { goto } from '$app/navigation';
	import type { Eleves, ElevesSuspendu } from '$lib/Class/Type.js';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
    const url = dev ? devApi : prodApi;

    const handler = new DataHandler(data.eleves, { 
        rowsPerPage: 10,
        i18n: {
            search: 'Rechercher...',
            show: 'Afficher',
            entries: 'lignes',
            filter: 'Filtrer',
            rowCount: 'Lignes {start} à {end} sur {total}',
            noRows: 'Aucun résultat',
            previous: 'Précédent',
            next: 'Suivant'
        }
    });
    const rows = handler.getRows();

    function formatDate(dateString: string | null): string {
        let formattedDate = " ";  
        if(dateString != null){
            // Parse the date string using Moment.js
            const date = moment(dateString);
            // Format the date as dd-mm-yyyy
            formattedDate = date.format('DD-MM-YYYY');
        }
        return formattedDate;
    }
    
    function addNewEleve(){
        if (browser) {
            goto('/Eleves/New');
        }
    }

    let modalDelete = false;
    let eleveToSusprendre : ElevesSuspendu = {
		id: 0,
		suspendu: false
	};

	function deleteModel(row: any): void {
		modalDelete = true;
        eleveToSusprendre.id = row.id;
        eleveToSusprendre.suspendu = true;
	}


	function suspendreEleve(eleveToSusprendre: ElevesSuspendu): void {
        fetch(url + 'Eleves/Suspendre', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eleveToSusprendre)
        }).then(response => {
            if (response.ok) {
                modalDelete = false;
                location.reload();
            }
        });
    
		
	}


	function editEleve(row: any) {
		goto(`/Eleves/Edit/${row.id}`);
	}
</script>

<Modal title="Suspendre l'eleve" bind:open={modalDelete} autoclose>
    Etes-vous sûr de vouloir suspendre cet élève ?
    <svelte:fragment slot="footer">
      <Button color="red" on:click={() => suspendreEleve(eleveToSusprendre)}>Suspendre</Button>
      <Button color="alternative">Retour</Button>
    </svelte:fragment>
</Modal>
<div class="mx-20 px-4 bg-white">
    <h1 class="text-xl pt-4 ml-4">List des élèves</h1>
    <div class="flex justify-end mb-4">
        <Button class="right-0 mt-4 " on:click={addNewEleve} color="blue"><UserAddSolid size="sm" class="mr-2" />   Rajouter un eleve</Button>
    </div>
    <Datatable {handler}>
        <table>
            <thead>
                <tr>
                    <Th {handler} orderBy="id">SN</Th>
                    <Th {handler} orderBy="nom">Nom</Th>
                    <Th {handler} orderBy="prenom">Prénom</Th>
                    <Th {handler} orderBy="sexe">Sexe</Th>
                    <Th {handler} orderBy="age">Age</Th>
                    <Th {handler} orderBy="dateNaissance">Date de Naissance</Th>
                    <Th {handler} orderBy="classes">Classe</Th>
                    <Th {handler} orderBy="maison">Adh.</Th>
                    <Th {handler} orderBy="maison">Maison</Th>
                    <Th {handler} orderBy="maison">Père</Th>
                    <Th {handler} orderBy="maison">Mère</Th>
                    <Th {handler} orderBy="dateEntree">Date d'entrée</Th>
                    <Th {handler} orderBy="maison">Ville</Th>
                    <Th {handler} orderBy="maison">Action</Th>
                </tr>
            </thead>
            <tbody>
                {#each $rows as row}
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.nom}</td>
                        <td>{row.prenom}</td>
                        <td>{row.sexe}</td>
                        <td>{row.age}</td>
                        <td>{formatDate(row.dateNaissance)}</td>
                        <td>{row.classes?.classe}</td>
                        
                            {#if row.maison?.adherent === true}
                            <td>Oui</td>
                            {:else}
                            <td>Non</td>
                            {/if}
                        {#if row.maison?.telDomicile != null}
                        <td>0{row.maison?.telDomicile}</td>
                        {:else}
                        <td> </td>
                        {/if}
                        
                        {#if row.maison?.parent != null && row.maison?.parent.length >= 1}
                        {#each row.maison.parent as parent}
                            {#if parent.type === 'Père'}
                                {#if parent.telMobile != null}
                                <td>0{parent.telMobile}</td>
                                {:else}
                                <td> </td>
                                {/if}
                            {:else if parent.type === 'Mère'}
                                {#if parent.telMobile != null}
                                <td>0{parent.telMobile}</td>
                                {:else}
                                <td> </td>
                                {/if}
                            {/if}
                        {/each}
                        {:else}
                        <td></td>
                        <td></td>
                        {/if}
                        <td>{formatDate(row.dateEntree)}</td>
                        <td>{row.maison?.ville}</td>
                        <td><Button on:click={() => editEleve(row)}> <UserEditSolid color="black" size="sm" /></Button>
                        <Button  on:click={() => deleteModel(row)}><UserRemoveSolid color="black" size="sm" /></Button>
                        </td>

                    </tr>
                {/each}
            </tbody>
        </table>
    </Datatable>
</div>

<style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>