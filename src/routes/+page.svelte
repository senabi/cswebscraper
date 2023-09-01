<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
  //const isEnabled = !schedule.data.includes('No habilitado');
  console.log(data);
  const isEnabled = !data.data.includes('No habilitado');
  const generatedAt = new Date(data.generatedAt).toLocaleString();
  const requestTime = data.requestTime;
  const ip = data.ip;
</script>

<div class="container">
	{#if isEnabled}
    <p>ENABLED</p>
  {:else}
    <p>DISABLED</p>
  {/if}
	generated at {generatedAt}
  <br />
  request time {requestTime}ms
  <br />
  ip {ip}
</div>
