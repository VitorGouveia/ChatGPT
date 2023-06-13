# Revo
React but you can await inside components.
> And prerender too.

```js
// Create an async component
const Component = async () => {
  const { name } = await useProfile()
  
  return (
    <Suspense fallback="loading...">
      <span>{name}</span>
    </Suspense>
  )
}

const App = () => {
  /* Just call async components wherever you want! */
  return (
    <div>
      <p>hello</p>

      {/* will trigger suspense until promise resolves */}
      <Component renderingMode="client" />

      {/* will block until promise resolves */}
      <Component renderingMode="server" />
    </div>
  )
}
```