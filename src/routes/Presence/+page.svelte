<script lang="ts">
    import { Select, Button } from 'flowbite-svelte';
    import { dev } from '$app/environment';
    import { devApi, prodApi } from '$lib/Method/helper';
	import type { Classes } from '$lib/Class/Type.js';
    let apiUrl = dev ? devApi : prodApi;
    let selectedClasse: number = 0;
    export let data;



	async function genererPresence(selectedClasse: any) {
		const resClasse = await fetch(`${apiUrl}Classes/${selectedClasse}`);
        const classeData : Classes = await resClasse.json();
        
        const resHoraire = await fetch(`${apiUrl}Horaire/ByGroupe/${classeData.groupeId}`);
        const horaireData = await resHoraire.json();
    }
</script>

  <div class="container bg-white mx-auto rounded-lg" >
    <h1 class="ml-4 pt-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Présence</h1>

    <div class="flex">  
        <span class="w-32">Classe:</span>
        <Select type="text" class="w-64" id="grp" placeholder="Classe" items={data.allClasses} bind:value={selectedClasse}  ></Select>
        <!-- <span>Groupe:</span> -->
        <!-- <Select type="text" id="grp" placeholder="Groupe" items={allGrp} bind:value={classe.groupeId}></Select> -->
        <!-- <span>Professeur:</span> -->
    </div>
    <div class="flex justify-end">
        <Button class="right-0 mt-4 mr-4 mb-6" color="blue" on:click={() => genererPresence(selectedClasse)}> Generer la presence</Button>
    </div>

    <div id="presence"></div>
    <!-- <table class="attendance-table">
      <thead>
        <tr>
          <th>#</th>
          <th>NOM</th>
          <th>PRÉNOM</th>
          {#each days as day}
            <th>{day}</th>
          {/each}
          <th>OBSERVATIONS</th>
        </tr>
      </thead>
      <tbody>
        {#each students as student, i}
          <tr>
            <td>{i + 1}</td>
            <td>{student.name}</td>
            <td>{student.prenom}</td>
            {#each days as day}
              <td></td>
            {/each}
            <td></td>
          </tr>
        {/each}
      </tbody>
    </table> -->
  </div>