# docs

## 0.0.7

### Patch Changes

- 6b8630c6: Github pages disclaimer

## 0.0.6

### Patch Changes

- 788c769d: # Hoisted scripts

  This change adds support for hoisted scripts, allowing you to bundle scripts together for a page and hoist them to the top (in the head):

  ```wromo
  <script hoist>
    // Anything goes here!
  </script>
  ```

## 0.0.5

## 0.0.5-next.0

### Patch Changes

- 78b5bde1: Adds support for Wromo.resolve

  `Wromo.resolve()` helps with creating URLs relative to the current Wromo file, allowing you to reference files within your `src/` folder.

  Wromo _does not_ resolve relative links within HTML, such as images:

  ```html
  <img src="../images/penguin.png" />
  ```

  The above will be sent to the browser as-is and the browser will resolve it relative to the current **page**. If you want it to be resolved relative to the .wromo file you are working in, use `Wromo.resolve`:

  ```wromo
  <img src={Wromo.resolve('../images/penguin.png')} />
  ```

## 0.0.4

### Patch Changes

- adc767c5: change Spanish translations for Getting Started page

## 0.0.3

### Patch Changes

- 70f0a09: Added remark-slug to default plugins
