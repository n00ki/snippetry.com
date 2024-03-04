<script lang="ts">
  // Utils
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';
  import { inview } from 'svelte-inview';

  // Stores
  import { isEditorReady, isQuoteReady } from '$lib/stores/status.js';
  import { language, content } from '$lib/stores/snippet.js';
  import { quote } from '$lib/stores/quote';
  import { getHighlighter } from 'shiki';

  // Components
  import Quote from '$components/Quote.svelte';
  import Editor from '$components/Editor.svelte';
  import SnippetsList from '$components/SnippetsList.svelte';
  import { Button } from '$components/ui/button';

  // Icons
  import { Reload } from 'radix-icons-svelte';

  export let data;
  let editorComponent: Editor;
  let snippetsListComponent: SnippetsList;

  let snippets = data?.snippets;
  let snippetsCount = 10;
  let shouldLoadMore: boolean = true;

  onMount(async () => {
    $content = { text: '', html: '' };
  });

  const getNextSnippets = async () => {
    const nextSnippets = await fetch(`/api/snippets?skip=${snippetsCount}`).then((res) =>
      res.json()
    );
    snippets = [...snippets, ...nextSnippets];
    snippetsCount += 10;

    if (nextSnippets.length === 0) {
      shouldLoadMore = false;
    }
  };
</script>

{#if !$isQuoteReady || !$isEditorReady}
  <div class="grid h-96 content-center justify-center">
    <Reload class="h-10 w-10 animate-spin" />
  </div>
{/if}

<div
  class="w-full {$isEditorReady && $isQuoteReady
    ? 'opacity-100'
    : 'opacity-0'} transition-opacity duration-300 ease-in-out"
>
  <div id="quote-wrapper" class="my-2">
    <Quote />
  </div>
  <div id="editor-wrapper" class="mx-auto max-w-4xl">
    <div class="my-4 min-h-[200px] overflow-hidden rounded-xl">
      <Editor bind:this={editorComponent} />
      <form
        method="POST"
        action="?/add"
        use:enhance={() => {
          return async ({ result, update }) => {
            if (result?.type === 'redirect') {
              editorComponent.resetEditorContent();
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

    <SnippetsList {snippets} bind:this={snippetsListComponent} />

    {#if shouldLoadMore}
      <footer use:inview on:inview_enter={getNextSnippets} class="flex w-full justify-center py-2">
        <Reload class="mr-2 h-4 w-4 animate-spin" />
      </footer>
    {/if}
  </div>
</div>
