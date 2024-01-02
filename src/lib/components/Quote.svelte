<script lang="ts">
  // Utils
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Stores
  import { quote } from '$lib/stores/quote';
  import { quote_ready } from '$lib/stores/ready';

  // Components
  import { Button } from '$components/ui/button';

  // Icons
  import { DoubleArrowDown } from 'radix-icons-svelte';

  onMount(async () => {
    await get_random_quote();
    $quote_ready = true;
  });

  async function get_random_quote() {
    const res = await fetch('https://api.quotable.io/quotes/random').then((res) => res.json());
    $quote.author = res[0]?.author ?? '';
    $quote.content = res[0]?.content ?? '';
    document?.getElementById('editor')?.focus();
  }
</script>

<div class="w-full" transition:fade>
  <div class="flex flex-col flex-wrap items-center justify-center gap-4">
    <div class="max-w-4xl text-center">
      <h1 class="text-md mb-2 font-medium md:text-xl">{$quote.content}</h1>
      <h2 class="md:text-md text-md font-sans">{$quote.author}</h2>
    </div>
    <div
      class="md:text-md inline-flex flex-wrap items-center justify-center whitespace-pre text-sm leading-7"
    >
      Choose a programming language and transform it into code <DoubleArrowDown /> or <Button
        on:click={get_random_quote}
        variant="outline">generate a new quote</Button
      >
    </div>
  </div>
</div>
