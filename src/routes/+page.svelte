<script lang="ts">
  // Utils
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { inview } from 'svelte-inview';

  // Stores
  import { editor_ready, quote_ready } from '$lib/stores/ready';
  import { language, content } from '$lib/stores/snippet.js';
  import { quote } from '$lib/stores/quote';

  // Components
  import Quote from '$components/Quote.svelte';
  import Editor from '$components/Editor.svelte';
  import SnippetsList from '$components/SnippetsList.svelte';
  import { Button } from '$components/ui/button';

  // Icons
  import { Reload } from 'radix-icons-svelte';

  export let data;
  let editor_component: Editor;
  let snippets_list_component: SnippetsList;

  let snippets = data?.snippets;
  let snippets_count = 10;
  let should_load_more: boolean = true;

  onMount(() => {
    $content = { text: '', html: '' };
  });

  const get_next_snippets = async () => {
    if (snippets.length <= 10) return;
    const next_snippets = await fetch(`/api/snippets?skip=${snippets_count}`).then((res) =>
      res.json()
    );
    snippets = [...snippets, ...next_snippets];
    snippets_count += 10;
    snippets_list_component.highlight_new_snippets();

    if (next_snippets.length === 0) {
      should_load_more = false;
    }
  };
</script>

{#if !$quote_ready || !$editor_ready}
  <div class="grid h-96 content-center justify-center">
    <Reload class="h-10 w-10 animate-spin" />
  </div>
{/if}

<div
  class="w-full {$editor_ready && $quote_ready
    ? 'opacity-100'
    : 'opacity-0'} transition-opacity duration-300 ease-in-out"
>
  <div id="quote-wrapper" class="my-2">
    <Quote />
  </div>
  <div id="editor-wrapper" class="mx-auto max-w-4xl">
    <div class="my-4 min-h-[200px] overflow-hidden rounded-xl">
      <Editor bind:this={editor_component} />
      <form
        method="POST"
        action="?/add"
        use:enhance={() => {
          return async ({ result, update }) => {
            if (result?.type === 'redirect') {
              editor_component.reset_editor();
            }
            update();
          };
        }}
      >
        <input type="hidden" name="text" value={$content.text} />
        <input type="hidden" name="html" value={$content.html} />
        <input type="hidden" name="language" value={$language} />
        <input type="hidden" name="quote_author" value={$quote.author} />
        <input type="hidden" name="quote_content" value={$quote.content} />
        <Button type="submit" class="w-full rounded-t-none border-t-0">SUBMIT</Button>
      </form>
    </div>

    <SnippetsList {snippets} bind:this={snippets_list_component} />

    {#if should_load_more}
      <footer
        use:inview
        on:inview_enter={get_next_snippets}
        class="flex w-full justify-center py-2"
      >
        <Reload class="mr-2 h-4 w-4 animate-spin" />
      </footer>
    {/if}
  </div>
</div>
