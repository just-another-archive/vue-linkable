# vue-linkable
## what
a simple mixin to enable sugar that makes properties almost mutable

## why
There are some cases where you want the property to be synced with the outside of your component, so you'd use `:prop.sync` sugar. this requires the consumer of your component always to do it, because you externalize your value outside of your component ; but sometimes you wish that the component would work on its own, with default values and internal state, more easily. This mixin makes this particular usecase a oneliner.

### How
The mixin creates proxy data properties that you should use in your component instead of the property itself ; for linking with the property and the outside world, 2 watchers are automatically created as well : one to update from property to proxy, one to notify proxy update following the data.sync protocol from Vue.js.

### Use
1. download the package `npm i -s vue-linkable`
2. implement as following :

    ```
    import linkable from 'vue-linkable'

    export const MyComponent {
      mixins: [linkable('page')],

      props: {
        page: {
          type: Number,
          default: 0,
        }
      },

      template: '
      <div class="component">
        <div>current page: {{ page$ }}</div>
        <button @click="page$--">decrease page</button>
        <button @click="page$++">increase page</button>
      </div>
      ',
    }
    ```

3. then use both attached or detached transparently :

```
import { MyComponent } from './mycomponent';

export default App {
  components: { MyComponent },

  data() {
    return {
      page: 2,
    },
  },

  template: `<div>
    <div>app pagination: {{ page }}</div>
    <div>detached pagination:</div>
    <my-component></my-component>
    <div>attached pagination:</div>
    <my-component :page.sync="page"></my-component>
  </div>`
}
```
