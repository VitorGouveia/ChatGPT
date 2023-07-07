const useSignal = (defaultValue) => {
    const [state, setState] = useState(defaultValue)

    const set = (newValue) => setState(newValue)

    return {
        value: state,
        set
    } 
}

export default function App() {
    const count = useSignal(0)
    
    const increment = () => {
        count.set(count + 1);
    }

    return (
        <div>
            <button onClick={increment}>count:  {count.value}</button>
        </div>  
    )
}
