<script lang="ts">
  import { language, content } from '$lib/stores/snippet';
  import { Editor } from '@tiptap/core';
  import { common, createLowlight } from 'lowlight';
  import Document from '@tiptap/extension-document';
  import Text from '@tiptap/extension-text';
  import Paragraph from '@tiptap/extension-paragraph';
  import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import Button from '$components/ui/button/button.svelte';
  import { editor_ready } from '$lib/stores/ready';

  let editor: Editor;
  const lowlight = createLowlight(common);

  const languages = [
    'JavaScript',
    'TypeScript',
    'Go',
    'Ruby',
    'PHP',
    'Rust',
    'Python',
    'Java',
    'CSS',
    'YAML'
  ];

  $language = 'JavaScript';

  function snippet_editor(editorElement: HTMLElement) {
    editor = new Editor({
      element: editorElement,
      extensions: [
        Document,
        Text,
        Paragraph,
        CodeBlockLowlight.configure({
          lowlight,
          defaultLanguage: $language
        })
      ],
      editorProps: {
        attributes: {
          id: 'editor',
          class: 'min-h-[200px] focus:outline-none'
        }
      },
      content: $content.html,
      onCreate: () => {
        editor.commands.setCodeBlock({ language: $language.toLowerCase() });
        editor.commands.focus('start');
        $editor_ready = true;
      },
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
        editor.isActive('codeBlock') || editor.commands.setCodeBlock();
        $content = {
          text: editor.getText(),
          html: editor.getHTML()
        };
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        editor.chain().focus().insertContent('  ').run();
      }
    });

    return {
      destroy() {
        editor.destroy();
      }
    };
  }

  function update_language(lang: string) {
    $language = lang;
    editor.chain().focus().setCodeBlock({ language: $language.toLowerCase() }).run();
    console.log(`Language changed to ${$language}`);
    document?.getElementById('editor')?.focus();
  }

  export function reset_editor() {
    $content = { text: '', html: '' };
    editor = editor;
    editor.chain().focus().clearContent().run();
    editor.commands.setCodeBlock({ language: $language.toLowerCase() });
    editor.commands.setContent($content.html);
    editor.commands.focus('end');
  }
</script>

<div class="relative bg-editor p-4 font-sans text-editor-foreground shadow">
  <div class="absolute right-2 top-2 z-50">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="default" class="font-sans">
          {$language}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {#each languages as lang}
            <DropdownMenu.Item on:click={() => update_language(lang)}>{lang}</DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>

  <div use:snippet_editor />
</div>
