<script lang="ts">
    import { browser } from '$app/environment';
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
  
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    // @ts-ignore
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    export let data;
    fcRoot(FusionCharts, Charts, FusionTheme);

let dataEleves = data.eleves;
type GenderCount = {
  label: string;
  value: number;
}
function countGenders(data: any[]): GenderCount[] {
  const counts: { [gender: string]: number } = {};

  // Count occurrences of each gender
  dataEleves.forEach(entry => {
    const gender = entry.sexe;
    counts[gender] = (counts[gender] || 0) + 1;
  });

  // Format result as GenderCount array
  return Object.entries(counts).map(([gender, count]) => ({
    label: gender,
    value: count
  }));

  
}

const genderCounts: GenderCount[] = countGenders(dataEleves);
    // @ts-ignore
    let chartObj: { slicePlotItem: (arg0: any, arg1: boolean) => void; },
      chartConfig = {
        type: 'doughnut2d',
        width: '600',
        height: '400',
        renderAt: 'chart-container',
        genderCounts 
      };
  
    // @ts-ignore
    const sliceDataPlot = (indices, sliceOut = true) => {
        // @ts-ignore
      indices.forEach(index => {
          // @ts-ignore
        chartObj.slicePlotItem(index, sliceOut);
      });
    };
  </script>



<div class="container mx-auto px-4 bg-white">
    <h1 class="text-xl">Mon dashboard</h1>

    <SvelteFC {...chartConfig} bind:chart={chartObj} />
    <SvelteFC {...chartConfig} bind:chart={chartObj} />
    </div>
