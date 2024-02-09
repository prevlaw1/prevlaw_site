<template>
    <div class="prose">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
/* Fallback vertical rhythm */
.prose { 
    --space: 16px; 
    --prose-vertical-space: 16px;
    --prose-caption-font-style: italic;
    --prose-figure-vertical-space: 32px;
    --prose-list-indent: 32px;
    --prose-gap: 16px;
    --heading-color: hsla(0, 0%, 10%, 0.8);
    --font-color: var(--base-color-80);
  }
  
  .prose :deep(* + *) {
    margin-top: var(--prose-vertical-space);
  }
  
  .prose :deep(h1),
  .prose :deep(h2),
  .prose :deep(h3),
  .prose :deep(h4),
  .prose :deep(h5),
  .prose :deep(h6) { 
    font-family: var(--body-font); 
    color: var(--heading-color);
  }
  
  
  .prose :deep(h1) {
    font-size: 1.75em;
  }
  .prose :deep(h2) {
    font-size: 1.5em;
  }
  .prose :deep(h3) {
    font-size: 1.25em;
  }
  .prose :deep(h4) {
    font-size: 1.125em;
  }
  .prose :deep(h5) {
    font-size: 1em;
  }
  .prose :deep(h6) {
    font-size: 0.875em;
  }

  .prose :deep(a) {
    font-weight: 600;
    color: #0054A8;
    * {
      color: #0054A8;
    }
  }
  
  /* Styles for .brow */
  .prose :deep(.brow) {
    text-transform: uppercase;
    font-weight: bold;
    color: var(--secondary-color);
  }
  
  .prose :deep(blockquote) {
    font-size: 1.4em;
    border-left: 4px solid var(--secondary-color);
    padding-left: 16px;
    font-style: italic;
  }
  
  .prose :deep(cite) {
    font-style: italic;
    font-size: 1rem;
  }
  
  /* Font Size for Headings */
  .prose :deep(h1 ~ .brow) { font-size: 1.5em; }
  .prose :deep(h2 ~ .brow) { font-size: 1.15em; }
  .prose :deep(h3 ~ .brow) { font-size: 1em; }
  .prose :deep(h4 ~ .brow) { font-size: .8em; }
  .prose :deep(h5 ~ .brow) { font-size: .6em; }
  
  
  /* Spacing for headings */
  .prose :deep(h1),
  .prose :deep(h2),
  .prose :deep(h3),
  .prose :deep(h4),
  .prose :deep(h5) { margin-top:32px; }
  
  /* Spacing for headings with brow */
  .prose :deep(.brow + h2),
  .prose :deep(.brow + h3),
  .prose :deep(.brow + h4),
  .prose :deep(.brow + h5) { margin-top: 0; }
  
  
  .prose :deep(.brow),  /* Spacing for .brow */   
  .prose :deep(figure), /* Spacing for figure */
  .prose :deep(blockquote), /* Spacing for blockquote */
  .prose :deep(blockquote + *),  /* Spacing for blockquote */
  .prose :deep(hr), /* Spacing for other horizontal ruler */
  .prose :deep(hr + *) { margin-top: var(--prose-vertical-space); }
  

  .prose :deep(ul),
  .prose :deep(ol) {
    padding-left: var(--prose-list-indent);
  }

  .prose :deep(table) {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
     .prose :deep(th) {
        text-align: center;
        background-color: hsl(210, 100%, 63%);
        font-weight: 700;
        color: hsl(210, 100%, 23%);
        padding: 16px;
    }
    .prose :deep(td) {
        font-size: 0,875em;
        color: var(--base-color-90);
        text-align: center;
        padding: 16px;
        border-bottom: 1px solid hsl(0 0% 73%);
    }
</style>