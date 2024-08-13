<script lang="ts">
  // Utils
  import { fly } from 'svelte/transition';

  // Components
  import * as Alert from '$components/ui/alert';

  // Icons
  import { CheckCircled, ExclamationTriangle, CrossCircled } from 'radix-icons-svelte';

  export let type: 'success' | 'error' | 'warning';
  const title: string = type === 'success' ? 'Success!' : type === 'error' ? 'Whoops...' : 'Warning!';
  export let message: string;
</script>

<div class="flash" transition:fly={{ y: 100, delay: 100 }}>
  <Alert.Root variant={type === 'error' ? 'destructive' : 'default'} class="m-0 rounded-none">
    {#if type === 'success'}
      <CheckCircled class="h-6 w-6" />
    {:else if type === 'error'}
      <CrossCircled class="h-6 w-6" />
    {:else if type === 'warning'}
      <ExclamationTriangle class="h-6 w-6" />
    {/if}
    <Alert.Title>{title}</Alert.Title>
    <Alert.Description>{message}</Alert.Description>
  </Alert.Root>
</div>
