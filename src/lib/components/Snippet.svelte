<script lang="ts">
  // Utils
  import { type SnippetType } from '$lib/db/models/snippets';
  import { onMount } from 'svelte';
  import { codeToHtml } from 'shiki';
  import { fade } from 'svelte/transition';

  // Components
  import * as Card from '$components/ui/card';

  export let snippet: SnippetType;
  let highlightedSnippet: string;

  onMount(async () => {
    highlightedSnippet = await codeToHtml(snippet?.text, {
      lang: snippet?.language || 'javascript',
      themes: {
        light: 'ayu-dark',
        dark: 'poimandres'
      }
    });
  });
</script>

<div transition:fade>
  <Card.Root>
    <Card.Header>
      <div class="flex w-full flex-nowrap">
        <div class="flex-1">
          <Card.Title>{snippet?.quote_author}</Card.Title>
          <Card.Description>{snippet?.quote_content}</Card.Description>
        </div>
      </div>
    </Card.Header>
    <Card.Content>
      <div class="bg-editor scrollbar overflow-auto rounded-lg p-4 text-sm">
        {@html highlightedSnippet}
      </div>
    </Card.Content>
  </Card.Root>
</div>

<style>
  /* WebKit-based browser scrollbar styles */
  ::-webkit-scrollbar {
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #cfcfcf;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #cfcfc4;
  }

  .scrollbar {
    scrollbar-color: #cfcfcf transparent;
    scrollbar-width: thin;
  }

  .scrollbar:hover {
    scrollbar-color: #cfcfc4 transparent;
  }
</style>
