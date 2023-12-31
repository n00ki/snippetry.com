<script lang="ts">
  // Utils
  import { type SnippetType } from '$lib/db/models/snippets';
  import { fade } from 'svelte/transition';

  // Components
  import * as Card from '$components/ui/card';

  export let snippet: SnippetType;
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
      <div class="overflow-hidden rounded-xl text-sm md:text-lg">
        {@html snippet?.html}
      </div>
    </Card.Content>
  </Card.Root>
</div>
