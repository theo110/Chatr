import { Link} from 'react-router-dom'
import { useState } from 'react'

function Form(props) {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <main className='form'>
            <input type="text" onChange={e => { setName(e.target.value) }} />
            <input type="text" onChange={e => { setRoom(e.target.value) }} />
            <Link onClick={e => (!name || !room ? e.preventDefault() : null)} to={`./chat?name=${name}&room=${room}`}>
                <button className="button" type="submit">
                    Sign In
                </button>
            </Link>
        </main>
    )
}

export default Form;