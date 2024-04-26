<script lang="ts">
// @ts-nocheck
    import FusionCharts from 'fusioncharts';
    import Charts from 'fusioncharts/fusioncharts.charts';
  
    import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
    // @ts-ignore
    import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
    const data = fetch('http://localhost:5272/api/Eleves/CurrentEleves');
    data.json();
  
    fcRoot(FusionCharts, Charts, FusionTheme);


type GenderCount = {
  label: string;
  value: number;
}
function countGenders(data: any[]): GenderCount[] {
  const counts: { [gender: string]: number } = {};

  // Count occurrences of each gender
  data.forEach(entry => {
    const gender = entry.sexe;
    counts[gender] = (counts[gender] || 0) + 1;
  });

  // Format result as GenderCount array
  return Object.entries(counts).map(([gender, count]) => ({
    label: gender,
    value: count
  }));

  
}

const genderCounts: GenderCount[] = countGenders(data);
    // @ts-ignore
    let chartObj,
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
