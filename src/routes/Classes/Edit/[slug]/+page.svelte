<script lang="ts">
    import type { Classes } from '$lib/Class/Type';
    import { Toast, Input, Label, Helper, Button, Checkbox, A, Radio, Select } from 'flowbite-svelte';
    import { CheckCircleSolid, ExclamationCircleSolid, FireOutline, CloseCircleSolid } from 'flowbite-svelte-icons';
    import { slide } from 'svelte/transition';
    export let data;

    let classe : Classes = data.classe;
    let open = false;
    let fail = false;
    let sucess = false;
    let counter = 6;

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

    let allGrp = [
    { value: 1, name: 'GRP1' },
    { value: 2, name: 'GRP2' },
    { value: 3, name: 'GRP3' }
  ];


	function saveClasse(classe: Classes): void {
        const res = fetch('http://localhost:5272/api/Classes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classe)
        });

        res.then((response) => {
            if (response.ok) {
                triggerSucess()
            } else {

            }
        });
	}

    function goBack () {
        history.back();    
    }
</script>
<div class="flex justify-end">
    {#if sucess}
    <Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        La classe a bien été modifier.
    </Toast>
    {/if}
    {#if fail}
    <Toast color="green" class="mr-4 mb-6" dismissable={false} transition={slide} bind:open>
        <svelte:fragment slot="icon">
          <CheckCircleSolid class="w-5 h-5" />
          <span class="sr-only">Check icon</span>
        </svelte:fragment>
        La classe a bien été modifier.
    </Toast>
    {/if}
</div>

<div class="container bg-white rounded-lg mx-auto p-10">

<h1 class="text-2xl font-bold">Modifier la classe</h1>

    <div class="grid gap-6 mt-10 mb-6 md:grid-cols-3">
        <div>
            <Label for="nom" class="mb-2">Nom</Label>
            <Input type="text" id="nom" placeholder="Nom" bind:value={classe.classe} />
        </div>
        <div>
            <Label for="grp" class="mb-2">Groupe</Label>
            <Select type="text" id="grp" placeholder="Groupe" items={allGrp} bind:value={classe.groupeId} />
        </div>
        <div>
            <Label for="professeur" class="mb-2">Professeur</Label>
            <Select type="text" id="professeur" placeholder="Professeur" items={data.allProfesseurs} bind:value={classe.professeursId} />
        </div>
    </div>
    <div class="flex justify-end">
        <Button class="right-0 mt-4 mr-4" color="light" on:click={goBack}>Retour</Button>
        <Button class="right-0 mt-4" on:click={() => saveClasse(classe)} color="blue">Enregistrer</Button>
    </div>
</div>