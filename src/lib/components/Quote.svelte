<script lang="ts">
  // Utils
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  // Stores
  import { quote } from '$lib/stores/quote';
  import { isQuoteReady } from '$lib/stores/status';

  // Components
  import { Button } from '$components/ui/button';

  // Icons
  import { DoubleArrowDown } from 'radix-icons-svelte';

  onMount(async () => {
    await getRandomQuote();
    $isQuoteReady = true;
  });

  async function getRandomQuote() {
    const res = await fetch('https://api.quotable.io/quotes/random').then((res) => res.json());
    $quote.author = res[0]?.author ?? '';
    $quote.content = res[0]?.content ?? '';
    document?.getElementById('editor')?.focus();
  }
</script>

<div class="w-full" transition:fade>
  <div class="flex flex-col items-center justify-center gap-4">
    <div class="max-w-4xl text-center">
      <h1 class="mb-2 font-medium text-md md:text-xl">{$quote.content}</h1>
      <h2 class="font-sans md:text-md text-md">{$quote.author}</h2>
    </div>
    <div
      class="inline-flex flex-wrap items-center justify-center text-sm leading-7 whitespace-pre over md:text-md"
    >
      Transform it into code <DoubleArrowDown /> or <Button
        on:click={getRandomQuote}
        variant="outline"
        class="cursor-pointer">generate a new quote</Button
      >
    </div>
  </div>
</div>
