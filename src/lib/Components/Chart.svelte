<script lang="ts">
	import { fade } from "svelte/transition";
	import Chart from "chart.js/auto";
	import { transformJSON } from "$lib/Method/dashboard";
	let jsonData = transformJSON();
	
  
	let ctx: HTMLCanvasElement | undefined;
	let chart: Chart | undefined;
  
	let showAge = true;
	let showWeight = true;
	let showHeight = true;
	let chartType = 'doughnut';

	
  
	$: if (ctx) {
	  if (chart) {
		chart.destroy();
	  }
  
	  chart = new Chart(ctx, {
		type: chartType,
		data: {jsonData},
		options: {
		  animation: false,
		  scales: {
			y: {
			  beginAtZero: true,
			},
		  },
		},
	  });
	}
  </script>
  
<canvas bind:this={ctx} width="100" height="50" in:fade></canvas>