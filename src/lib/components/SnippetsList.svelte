<script lang="ts">
  // Utils
  import { type SnippetType } from '$lib/db/models/snippets';
  import { enhance } from '$app/forms';

  // Stores
  import { page } from '$app/stores';

  // Components
  import Snippet from '$components/Snippet.svelte';
  import { Button } from '$components/ui/button';

  export let snippets: SnippetType[];
</script>

<div id="snippets-wrapper" class="my-4 flex flex-col gap-2">
  {#if snippets}
    {#each snippets as snippet}
      <Snippet {snippet} />

      {#if $page.url.pathname === '/admin'}
        <div class="flex w-full justify-evenly overflow-hidden rounded-md">
          <form action="admin?/approve" method="POST" class="flex-1" use:enhance>
            <input type="hidden" name="id" value={snippet.id} />
            <Button type="submit" class="w-full rounded-none bg-emerald-700 hover:bg-emerald-600"
              >Approve</Button
            >
          </form>
          <form action="admin?/reject" method="POST" class="flex-1" use:enhance>
            <input type="hidden" name="id" value={snippet.id} />
            <Button type="submit" variant="destructive" class="w-full rounded-none">Reject</Button>
          </form>
        </div>
      {/if}
    {/each}
  {/if}
</div>
