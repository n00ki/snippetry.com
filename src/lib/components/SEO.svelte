<script lang="ts">
  import { PUBLIC_BASE_URL } from '$env/static/public';

  const metaWide =
    'https://res.cloudinary.com/nshemesh/image/upload/v1703964213/snippetry/meta_wide.png';
  const metaSquare =
    'https://res.cloudinary.com/nshemesh/image/upload/v1703964215/snippetry/meta_square.png';

  export let title: string;
  export let description: string;
  export let url: string;

  $: title = title ? `Snippetry | ${title}` : 'Snippetry';
  $: description = description ?? 'Life. Coded.';
  $: url = url ?? PUBLIC_BASE_URL;
</script>

<svelte:head>
  <!-- Primary tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="image" content={metaWide} />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={metaSquare} />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={url} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={metaWide} />
</svelte:head>
