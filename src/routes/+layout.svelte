<script lang="ts">
  // Utils
  import { onNavigate, disableScrollHandling } from '$app/navigation';
  import { browser } from '$app/environment';
  import { getFlash } from 'sveltekit-flash-message/client';
  import * as Fathom from 'fathom-client';

  // Stores
  import { page } from '$app/stores';

  // Components
  import SEO from '$components/SEO.svelte';
  import Navbar from '$components/Navbar.svelte';
  import { Toaster } from 'svelte-french-toast';
  import Flash from '$components/Flash.svelte';
  import ThemeSwitcher from '$components/ThemeSwitcher.svelte';

  // Styles
  import '../styles/app.css';
  import 'highlight.js/styles/nord.min.css';

  const flash = getFlash(page, {
    clearAfterMs: 5000
  });

  if (browser) {
    Fathom.load('TCGQXZSU');
  }

  // Disable scroll handling on same route navigation for theme switching
  onNavigate((navigation) => {
    const previousRoute = navigation.from?.url.pathname;
    const currentRoute = navigation.to?.url.pathname;

    if (previousRoute === currentRoute) {
      disableScrollHandling();
    }
  });
</script>

<SEO {...$page.data.metadata} url={$page.url.href} />

<Toaster />

<div class="flex min-h-screen flex-col">
  <Navbar />

  <main class="container mx-auto flex flex-1 flex-col flex-wrap py-4">
    <slot />

    <div class="fixed bottom-5 right-0">
      <ThemeSwitcher />
    </div>
  </main>
</div>

{#if $flash}
  <div class="fixed bottom-0 w-full overflow-hidden">
    <Flash type={$flash.type} message={$flash?.message} />
  </div>
{/if}

<noscript>
  <div class="fixed bottom-0 w-full overflow-hidden">
    <Flash type="error" message="JavaScript is required to use this website." />
  </div>
</noscript>
