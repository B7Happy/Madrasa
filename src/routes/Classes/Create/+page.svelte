<script lang="ts">
    import type { ClasseCreate } from '$lib/Class/Type';
    import { Input, Label, Helper, Button, Checkbox, A, Radio, Select } from 'flowbite-svelte';
    
    function goBack () {
        history.back();    
    }

    let classe : ClasseCreate = {
        classe: "",
        groupeId: null,
        professeursId: null
    };

    let allGrp = [
    { value: 1, name: 'GRP1' },
    { value: 2, name: 'GRP2' },
    { value: 3, name: 'GRP3' }
    ];
    export let data;


	function saveClasse(classe: ClasseCreate): void {
        const res = fetch('http://localhost:5272/api/Classes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classe)
        });	
	}
</script>

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