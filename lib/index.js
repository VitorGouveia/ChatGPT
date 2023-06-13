const render = async (html, target) => {
  target.appendChild(await html)
}

const suspend = (promise, appendTo, suspendElement) => {
  promise.then((resolved) => {
    appendTo.appendChild(resolved)
    suspendElement.remove()
  })
}

const html = async (type, props, ...children) => {
  /** @type {HTMLElement} */
  const element = document.createElement(type)

  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })

  if (env === "SERVER") {
    await Promise.all(
      children.map(async (child) => {
        const returned = await child
        return element.append(returned)
      })
    )

    return element
  }

  children.forEach((child) => {
    if (child.toString() === "[object Promise]") {
      // return await child;
      const div = document.createElement("div")

      div.innerText = "suspending..."

      suspend(child, element, div)

      element.append(div)
      return
    }

    element.append(child)
  })

  return element
}

const getPokemon = () =>
  fetch("https://pokeapi.co/api/v2/pokemon/ditto").then((response) =>
    response.json()
  )

function useSignal(defaultValue) {
  let value = defaultValue

  return {
    get value() {
      return value
    },
    set: (newValue) => {
      value = newValue
    },
  }
}

const Renderer = async () => {
  const { id } = await getPokemon()

  return html("h1", { id: "suspend-promise" }, `ditto's id is: ${id}`)
}

const App = () => {
  return html("div", { id: "my-id" }, "fluxo comum de renderização", Renderer())
}

const destroy = () => {
  document.querySelector("#root").innerHTML = ""
}

// await render(App(), document.querySelector("#root"))
async function simulate_server() {
  destroy()

  setTimeout(async () => {
    env = "SERVER"
    alert(
      "[BLOCKING] Simulates rendering on the server, where all promises are resolved and then the server component is returned to the client with 0kB JS."
    )
    await render(App(), document.querySelector("#root"))
  })
}

async function simulate_client() {
  destroy()

  setTimeout(async () => {
    env = "CLIENT"
    alert(
      "[NON-BLOCKING] Simulates rendering on the client, where the JS is downloaded, executed and the promises are resolved on the client (with loading spinners :/))."
    )
    await render(App(), document.querySelector("#root"))
  })
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("#simulate_server")
    .addEventListener("click", simulate_server)

  document
    .querySelector("#simulate_client")
    .addEventListener("click", simulate_client)
})
