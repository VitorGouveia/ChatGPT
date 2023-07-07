const createResource = (fetcher, ...args) => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: null,
  })

  useEffect(() => {
    async function main() {
      try {
        const response = await fetcher(...args)

        setState({
          loading: false,
          error: false,
          data: response,
        })
      } catch (error) {
        setState({
          loading: false,
          error: error.message || true,
          data: null,
        })
      }
    }

    main()
  }, [])

  return state
}

const For = ({ each, children }) => {
  return each.map((item) => children(item))
}

async function getUsers() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }]
}

const Match = ({ children, when }) => {
  return when ? children : null
}

export default function App() {
  const resource = createResource(getUsers)

  return (
    <Switch fallback={<p>no state matched.</p>}>
      <Match when={resource.loading}>
        <p>loading...</p>
      </Match>

      <Match when={resource.error}>
        <p>errored...</p>
      </Match>

      <Match when={resource.data}>
        <For each={resource.data}>
          {(user) => (
            <div>
              <p>{user.id}</p>
            </div>
          )}
        </For>
      </Match>
    </Switch>
  )
}
