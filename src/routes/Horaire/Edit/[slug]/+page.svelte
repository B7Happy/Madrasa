<script lang="ts">
    import type { Horaire } from '$lib/Class/Type';   
    export let data;
    import { Input, Label, Toast, Button, Checkbox, A, Radio, Select } from 'flowbite-svelte';
    import { CheckCircleSolid, CloseCircleSolid } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';

    let horaire : Horaire = data;

    function goBack () {
        history.back();    
    }

    let allGrp = [
    { value: 1, name: 'GRP1' },
    { value: 2, name: 'GRP2' },
    { value: 3, name: 'GRP3' }
    ];

    let jours = [
    { value: 1, name: 'Lundi' },
    { value: 2, name: 'Mardi' },
    { value: 3, name: 'Mercredi' },
    { value: 4, name: 'Jeudi' },
    { value: 5, name: 'Vendredi' },
    { value: 6, name: 'Samedi' },
    { value: 7, name: 'Dimanche' }
    ];

    let open = false;
    let fail = false;
    let sucess = false;
    let counter = 4;

    function triggerSucess() {
    sucess = true;
    open = true; 
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


	function saveHoraire(horaire: Horaire) {
        const foundJour = jours.find(j => j.value === horaire.numJour);
        horaire.jour = foundJour ? foundJour.name : "";
        const res = fetch('http://localhost:5272/api/Horaire', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(horaire)
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

<div class="flex justify-end">

{#if sucess}
<Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
    <svelte:fragment slot="icon">
      <CheckCircleSolid class="w-5 h-5" />
      <span class="sr-only">Check icon</span>
    </svelte:fragment>
    L'horaire a bien été modifier.
</Toast>
{/if}
{#if fail}
<Toast color="red" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
    <svelte:fragment slot="icon">
      <CloseCircleSolid  class="w-5 h-5" />
      <span class="sr-only">Error icon</span>
    </svelte:fragment>
    L'horaire n'a pas été modifier.
</Toast>
{/if}
</div>

<div class="container bg-white rounded-lg mx-auto p-10">

    
    <h1 class="text-2xl font-bold">Creer une plage horaire </h1>
    
        <div class="grid gap-6 mt-10 mb-6 md:grid-cols-4">
            <div>
                <Label for="jour" class="mb-2">Jour</Label>
                <Select type="text" id="jour" placeholder="Jour" items={jours}  bind:value={horaire.numJour} />
            </div>
            <div>
                <Label for="hDeb" class="mb-2">Heure de debut</Label>
                <Input type="text" id="hDeb" placeholder="Heure de debut"  bind:value={horaire.hDeb} />
            </div>
            <div>
                <Label for="hFin" class="mb-2">Heure de fin</Label>
                <Input type="text" id="hFin" placeholder="Heure de fin" bind:value={horaire.hFin} />
            </div>
            <div>
                <Label for="Groupe" class="mb-2">Groupe</Label>
                <Select type="text" id="Groupe" placeholder="Groupe" items={allGrp} bind:value={horaire.groupeId} />
            </div>
        </div>
        <div class="flex justify-end">
            <Button class="right-0 mt-4 mr-4" color="light" on:click={goBack}>Retour</Button>
            <Button class="right-0 mt-4" on:click={() => saveHoraire(horaire)} color="blue">Enregistrer</Button>
        </div>
    </div>