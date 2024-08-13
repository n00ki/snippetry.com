<script lang="ts">
  // Utils
  import { type SnippetType } from '$models/snippet';

  // Components
  import Snippet from '$components/Snippet.svelte';

  export let snippets: SnippetType[];
</script>

<div id="snippets-wrapper" class="my-4 flex flex-col gap-2">
  {#if snippets}
    {#each snippets as snippet}
      <Snippet {snippet} />
    {/each}
  {/if}
</div>
