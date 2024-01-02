<script lang="ts">
  // Utils
  import { Editor } from '@tiptap/core';
  import Document from '@tiptap/extension-document';
  import Text from '@tiptap/extension-text';
  import Paragraph from '@tiptap/extension-paragraph';
  import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
  import { common, createLowlight } from 'lowlight';

  // Components
  import * as DropdownMenu from '$components/ui/dropdown-menu';
  import Button from '$components/ui/button/button.svelte';

  // Stores
  import { isEditorReady } from '$lib/stores/status';
  import { language, content } from '$lib/stores/snippet';

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

  function snippetEditor(editorElement: HTMLElement) {
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
        $isEditorReady = true;
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

  function updateLanguage(lang: string) {
    $language = lang;
    editor.chain().focus().setCodeBlock({ language: $language.toLowerCase() }).run();
    console.log(`Language changed to ${$language}`);
    document?.getElementById('editor')?.focus();
  }

  export function resetEditorContent() {
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
            <DropdownMenu.Item on:click={() => updateLanguage(lang)}>{lang}</DropdownMenu.Item>
          {/each}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>

  <div use:snippetEditor />
</div>
