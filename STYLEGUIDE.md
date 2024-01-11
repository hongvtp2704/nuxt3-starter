# [Vue3 + Typescript + Composition API] Style Guide

When we work as a team. It will be better if we have our style guide for the project to avoid errors, bikeshedding and anti-patterns.
I hope this handbook will help our team work more easily (  `easier to develop`, `easier to understand`, and `easier to maintain` )

This handbook based on https://vuejs.org/style-guide/ and I just filtered which one is suitable for our project. If you want to know more detail about this guide, you can visit the link above

**Note**: This handbook is just my objective opinion and I always appreciate all contribution

### Using `<script setup>`

```vue
<script setup lang="ts">
</script>
```

### Use detailed props and emits  definitions

In committed code, prop and emits definitions should always be as detailed as possible, specifying at least type(s).

````vue
// BAD // This is only OK when prototyping
const props = defineProps(['foo', 'bar'])
const emits = defineEmits(['change', update])

// GOOD
interface IProps {
  foo: string
  bar?: number
}
interface IEmits {
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()
````

### Prop name casing

Prop names should always use camelCase during declaration. When used inside in-DOM templates, props should be kebab-cased.

````vue
// BAD
const props = defineProps({
  'greeting-text': String
})

// for in-DOM templates
<welcome-message greetingText="hi"></welcome-message>
````

````vue
// GOOD
const props = defineProps({
  greetingText: String
})
// for in-DOM templates
<welcome-message greeting-text="hi"></welcome-message>
````

### Component order

**1: Import**

- `packags`
- `components`
- `type, hook`
- `styles`
- `assets`

**2: Interface** (the interface to the component)

- `inheritAttrs`
- `props`
- `emits`

**3: Lifecycle Events**
    - `beforeCreate`
    - `created`
    - `beforeMount`
    - `mounted`
    - `beforeUpdate`
    - `updated`
    - `activated`
    - `deactivated`
    - `beforeUnmount`
    - `unmounted`
    - `errorCaptured`
    - `renderTracked`
    - `renderTriggered`

**4: Component logic** (data ,methods, computed, watchers, etc.)

### Single-file component top-level element order

**[Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html) should always order `<script>`, `<template>`, and `<style>` tags consistently, with `<style>` last, because at least one of the other two is always necessary.**

````vue
// BAD
<!-- ComponentA.vue -->
<script>
/* ... */
</script>

<script>
/* ... */
</script>

<template>
  ...
</template>

<!-- ComponentB.vue -->
<template>
...
</template>

<style>
/* ... */
</style>

<style>
/* ... */
</style>
````

````vue
// GOOD
<!-- ComponentA.vue -->
<script>
/* ... */
</script>

<script>
/* ... */
</script>

<template>
  ...
</template>

<!-- ComponentB.vue -->
<template>
...
</template>

<style>
/* ... */
</style>

<style>
/* ... */
</style>
````

### Component name casing in templates

In most projects, component names should always be PascalCase in [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html) and string templates - but kebab-case in DOM templates. But in our project, we use kebab-case everywhere for easier to find component in the template

````vue
// IN OUR PROJECT
<!-- Everywhere -->
<my-component></my-component>
````

### Single-instance component names

**Components that should only ever have a single active instance should begin with the `The` prefix, to denote that there can be only one.**

This does not mean the component is only used in a single page, but it will only be used once *per page*. These components never accept any props, since they are specific to your app, not their context within your app. If you find the need to add props, it's a good indication that this is actually a reusable component that is only used once per page *for now*.

````vue
// BAD
components/
|- Heading.vue
|- MySidebar.vue
````

````vue
// GOOD
components/
|- TheHeading.vue
|- TheSidebar.vue
````

### Tightly coupled component names

**Child components that are tightly coupled with their parent should include the parent component name as a prefix.**

If a component only makes sense in the context of a single parent component, that relationship should be evident in its name. Since editors typically organize files alphabetically, this also keeps these related files next to each other.

````vue
// BAD
components/
|- TodoList.vue
|- TodoItem.vue
|- TodoButton.vue

components/
|- SearchSidebar.vue
|- NavigationForSearchSidebar.vue
````

```vue
// GOOD
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue

components/
|- SearchSidebar.vue
|- SearchSidebarNavigation.vue
```

### Order of words in component names

**Component names should start with the highest-level (often most general) words and end with descriptive modifying words.**

````vue
// BAD
components/
|- ClearSearchButton.vue
|- ExcludeFromSearchInput.vue
|- LaunchOnStartupCheckbox.vue
|- RunSearchButton.vue
|- SearchInput.vue
|- TermsCheckbox.vue
````

````vue
// GOOD
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
````

### Base component names

**Base components (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with a specific prefix, such as `Base`, `App`, or `V`.**

````shell
// BAD
components/
|- MyButton.vue
|- VueTable.vue
|- Icon.vue
````

````shell
// GOOD
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue

components/
|- VButton.vue
|- VTable.vue
|- VIcon.vue
````

### Self-closing components

**Components with no content should be self-closing in [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html), string templates, and [JSX](https://vuejs.org/guide/extras/render-function.html#jsx-tsx) - but never in DOM templates.**

Components that self-close communicate that they not only have no content, but are **meant** to have no content. It's the difference between a blank page in a book and one labeled "This page intentionally left blank." Your code is also cleaner without the unnecessary closing tag.

Unfortunately, HTML doesn't allow custom elements to be self-closing - only [official "void" elements](https://www.w3.org/TR/html/syntax.html#void-elements). That's why the strategy is only possible when Vue's template compiler can reach the template before the DOM, then serve the DOM spec-compliant HTML.

````vue
// BAD
<!-- In Single-File Components, string templates, and JSX -->
<my-component></my-component>

<!-- In DOM templates -->
<my-component />
````

````vue
// GOOD
<!-- In Single-File Components, string templates, and JSX -->
<my-component />

template
<!-- In DOM templates -->
<my-component></my-component>
````

### Full-word component names

**Component names should prefer full words over abbreviations.**

The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

```vue
// BAD
components/
|- SdSettings.vue
|- UProfOpts.vue
```

````vue
// GOOD
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
````

### Single-file component filename casing

**Filenames of [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html) should either be always PascalCase or always kebab-case.**

PascalCase works best with autocompletion in code editors, as it's consistent with how we reference components in JS(X) and templates, wherever possible. However, mixed case filenames can sometimes create issues on case-insensitive file systems, which is why kebab-case is also perfectly acceptable.

````vue
// BAD
components/
|- mycomponent.vue

components/
|- myComponent.vue
````

````vue
// GOOD
components/
|- MyComponent.vue

components/
|- my-component.vue
````

### Use multi-word component names

User component names should always be multi-word, except for root `App` components. This [prevents conflicts](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) with existing and future HTML elements, since all HTML elements are a single word.

````vue
// BAD
<item></item>

// GOOD
<todo-item></todo-item>
````

### Element attribute order

**The attributes of elements (including components) should be ordered consistently.**

This is the default order we recommend for component options. They're split into categories, so you'll know where to add custom attributes and directives.

1. **Definition** (provides the component options)
    - `is`
2. **List Rendering** (creates multiple variations of the same element)
    - `v-for`
3. **Conditionals** (whether the element is rendered/shown)
    - `v-if`
    - `v-else-if`
    - `v-else`
    - `v-show`
    - `v-cloak`
4. **Render Modifiers** (changes the way the element renders)
    - `v-pre`
    - `v-once`
5. **Global Awareness** (requires knowledge beyond the component)
    - `id`
6. **Unique Attributes** (attributes that require unique values)
    - `ref`
    - `key`
7. **Two-Way Binding** (combining binding and events)
    - `v-model`
8. **Other Attributes** (all unspecified bound & unbound attributes)
9. **Events** (component event listeners)
    - `v-on`
10. **Content** (overrides the content of the element)
    - `v-html`
    - `v-text`

### Use keyed `v-for`

`key` with `v-for` is *always* required on components, in order to maintain internal component state down the subtree. Even for elements though, it's a good practice to maintain predictable behavior, such as [object constancy](https://bost.ocks.org/mike/constancy/) in animations.

````shell
// BAD
<ul>
  <li v-for="todo in todos">
    {{ todo.text }}
  </li>
</ul>

//GOOD
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
````

### Avoid `v-if` with `v-for`

**Never use `v-if` on the same element as `v-for`.**

There are two common cases where this can be tempting:

- To filter items in a list (e.g. `v-for="user in users" v-if="user.isActive"`). In these cases, replace `users` with a new computed property that returns your filtered list (e.g. `activeUsers`).
- To avoid rendering a list if it should be hidden (e.g. `v-for="user in users" v-if="shouldShowUsers"`). In these cases, move the `v-if` to a container element (e.g. `ul`, `ol`).

````shell
// BAD
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>

//GOOD
<ul>
  <template v-for="user in users" :key="user.id">
    <li v-if="user.isActive">
      {{ user.name }}
    </li>
  </template>
</ul>

````

### Directive shorthands

**Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always or never.**

````vue
// BAD
<input
  v-bind:value="newTodoText"
  :placeholder="newTodoInstructions"
>

<input
  v-on:input="onInput"
  @focus="onFocus"
>

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
````

````vue
// GOOD
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions"
>

<input
  v-bind:value="newTodoText"
  v-bind:placeholder="newTodoInstructions"
>

<input
  @input="onInput"
  @focus="onFocus"
>

<input
  v-on:input="onInput"
  v-on:focus="onFocus"
>

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template v-slot:footer>
  <p>Here's some contact info</p>
</template>

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
````

### Simple expressions in templates

**Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.**

Complex expressions in your templates make them less declarative. We should strive to describe *what* should appear, not *how* we're computing that value. Computed properties and methods also allow the code to be reused.

````vue
// BAD
{{
  fullName.split(' ').map((word) => {
    return word[0].toUpperCase() + word.slice(1)
  }).join(' ')
}}
````

````vue
// GOOD
<!-- In a template -->
{{ normalizedFullName }}

// The complex expression has been moved to a computed property
const normalizedFullName = computed(() =>
  fullName.value
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
)
````

### Simple computed properties

**Complex computed properties should be split into as many simpler properties as possible.**

````vue
// BAD
const price = computed(() => {
  const basePrice = manufactureCost.value / (1 - profitMargin.value)
  return basePrice - basePrice * (discountPercent.value || 0)
})
````

````vue
// GOOD
const basePrice = computed(
  () => manufactureCost.value / (1 - profitMargin.value)
)

const discount = computed(
  () => basePrice.value * (discountPercent.value || 0)
)

const finalPrice = computed(() => basePrice.value - discount.value)
````

### Use component-scoped styling

For applications, styles in a top-level `App` component and in layout components may be global, but all other components should always be scoped.

This is only relevant for [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html). It does *not* require that the [`scoped` attribute](https://vue-loader.vuejs.org/en/features/scoped-css.html) be used. Scoping could be through [CSS modules](https://vue-loader.vuejs.org/en/features/css-modules), a class-based strategy such as [BEM](http://getbem.com/), or another library/convention.

**Component libraries, however, should prefer a class-based strategy instead of using the `scoped` attribute.**

This makes overriding internal styles easier, with human-readable class names that don't have too high specificity, but are still very unlikely to result in a conflict.

````vue
// BAD
<template>
  <button class="btn btn-close">
    ×
  </button>
</template>

<style>
.btn-close {
  background-color: red;
}
</style>
````

````vue
// GOOD
<template>
  <button class="button button-close">
    ×
  </button>
</template>

<!-- Using the `scoped` attribute -->
<template>
  <button :class="[$style.button, $style.buttonClose]">×</button>
</template>

<template>
  <button class="c-Button c-Button--close">×</button>
</template>

<!-- Using CSS modules -->
<style scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>

<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>

<!-- Using the BEM convention -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
````
