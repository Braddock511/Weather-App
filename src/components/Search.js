import React from "react"

const Form = props => {
    return (
        <form onSubmit={props.submit}>
            <input type="text" value={props.value} placeholder="Enter city" onChange={props.change}/>
            <button type="submit">Search city</button>
            <button onClick={props.your_city}>Your city</button>
        </form>
    )
}

export default Form