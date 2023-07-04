import React, { ReactNode, useEffect, useState } from "react"

function useResource<TFunction extends (...params: any[]) => Promise<any>>(fetcher: TFunction, ...params: Parameters<TFunction>) {
  const [resource, setResource] = useState<{ loading: boolean; error: unknown | false; data: null | Awaited<ReturnType<TFunction>> }>({
    loading: true,
    error: false,
    data: null
  })
  
  useEffect(() => {
    async function main() {
      try  {
        const result = await fetcher(...params)
  
        setResource(res => ({
          error: false,
          loading: false,
          data: result
        }))
      } catch(error) {
        setResource(() => ({
          error: error,
          loading: false,
          data: null
        }))
      }
    }

    main()
  }, [])
  
  return [resource]
}

async function getUser(userId: string) {
  console.log("called")
  await new Promise(resolve => setTimeout(resolve, 1_000))
  
  return {
    id: userId
  }
}

function Switch({ fallback, children }) {
  let matchFound = false;
  let fallbackComponent = null;

  React.Children.forEach(children, (child) => {
    if (!matchFound && child.props.when) {
      matchFound = true;
      fallbackComponent = null;
    } else if (child.props.fallback) {
      fallbackComponent = child;
    }
  });

  if (matchFound) {
    return renderChildren(children);
  } else if (fallbackComponent) {
    return renderChildren(fallbackComponent.props.children);
  } else {
    return null;
  }
}

function Match({ when, children }) {
  return when ? renderChildren(children) : null;
}

function renderChildren(children) {
  return Array.isArray(children) ? children : [children];
}



function useSignal<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  const handler = {
    get: function(target, prop) {
      if (prop === 'set') {
        return function(newValue) {
          setValue(newValue)

          return target.value;
        };
      }

      return target[prop];
    }
  };
  
  const myVar = new Proxy({ value: value }, handler);

  return myVar
}

export default function Component() {
  const [resource] = useResource(getUser, "my-user-id")
  const count = useSignal(0)
  console.log(count)
  return (
    <Switch fallback={<p>nothing matched</p>}>
      <Match when={resource.loading}>
        <p>loading...</p>
      </Match>

      <Match when={resource.error}>
        <p>errored...</p>
      </Match>

      <Match when={resource.data}>
        <p>{resource.data?.id}</p>
        <button onClick={() => count.set(count.value + 1)}>{count.value}</button>
      </Match>
    </Switch>
  )
}
