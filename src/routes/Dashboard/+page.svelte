<script lang="ts">
	import { fade } from "svelte/transition";
	import Chart from "chart.js/auto";
	import { transformJSON, makeGroupeJSON, makeCatJSON } from "$lib/Method/dashboard";
	export let data;
  
	let ctx: HTMLCanvasElement | undefined;
	let ctx2: HTMLCanvasElement | undefined;
	let ctx3: HTMLCanvasElement | undefined;
	let chart: Chart | undefined;
	let groupeChart:  Chart | undefined;
	let categorieChart:  Chart | undefined;
	let jsonData = transformJSON(data.eleves);
	let groupeJsonData = makeGroupeJSON(data.eleves);
	let catJsonData = makeCatJSON(data.eleves);

	$: if (ctx) {  
	  chart = new Chart(ctx, {
		type: "doughnut",
		data: jsonData,
		options: {
		  animation: false,
		  plugins: {
            title: {
                display: true,
                text: 'Enfants (M/F)'
            }
        },
		},
	  });
	}

	$: if (ctx2) {  
		groupeChart = new Chart(ctx2, {
		type: "doughnut",
		data: groupeJsonData,
		options: {
		  animation: false,
		  plugins: {
            title: {
                display: true,
                text: 'Enfants (Groupe)'
            }
        },
		},
	  });
	}

	$: if (ctx2) {  
		categorieChart = new Chart(ctx3, {
		type: "doughnut",
		data: catJsonData,
		options: {
		  animation: false,
		  plugins: {
            title: {
                display: true,
                text: 'Enfants (Cat.)'
            }
        },
		},
	  });
	}

  </script>

<div class="container bg-white mx-auto">
<h1 class="text-4xl font-mono pt-5 ml-5">Dashboard</h1>
<div class="flex mx-auto pt-10 pb-20">
 
	<div class="canvas-container">
		<canvas bind:this={ctx} width="100" height="50" in:fade></canvas>
	</div>
	<div class="canvas-container">
	  <canvas bind:this={ctx2} width="100" height="50" in:fade></canvas>
  </div>
  <div class="canvas-container">
	<canvas bind:this={ctx3} width="100" height="50" in:fade></canvas>
</div>
</div>
</div>


  
  <style>
	.canvas-container {
	  width: 500px;
	}
  </style>