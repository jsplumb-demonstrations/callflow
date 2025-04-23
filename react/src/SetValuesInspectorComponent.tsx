import {useRef, useState} from "react"
import {CallFlowVariable} from "./definitions"

import { uuid } from "@jsplumbtoolkit/browser-ui"

export default function SetValuesInspectorComponent({obj, save, cancel}) {

    const [variables, setVariables] = useState(obj.data.variables.map(v => Object.assign({}, v)))

    const newVariableName = useRef(null)
    const newVariableValue = useRef(null)

    function addVariable(e) {
        if (newVariableName.current.value.length > 0 && newVariableValue.current.value.length > 0) {
            const v = variables.slice()
            v.push({name: newVariableName.current.value, value: newVariableValue.current.value, id:uuid()})
            setVariables(v)
            newVariableName.current.value= ""
            newVariableValue.current.value = ""
        }
    }

    function deleteVariable(id:string) {
        const v = variables.filter((v:CallFlowVariable) => v.id !== id)
        setVariables(v)
    }

    function setName(id:string, el:any) {
        const v = variables.map(v => {
            return {
                id:v.id,
                name:v.id === id ? el.value : v.name,
                value:v.value
            }
        })

        setVariables(v)
    }

    function setValue(id:string, el:any) {
        const v = variables.map(v => {
            return {
                id:v.id,
                value:v.id === id ? el.value : v.value,
                name:v.name
            }
        })
        setVariables(v)
    }

    function commit() {
        save(variables)
    }

    return <><table>
        <thead>
        <tr><th>Name</th><th>Value</th><th/></tr>
        </thead>
        <tbody>
        {variables.map(variable => <tr key={variable.id}>
                <td><input defaultValue={variable.name} type="text" onBlur={(e) => setName(variable.id, e.target)}/></td>
                <td><input defaultValue={variable.value} type="text" onBlur={(e) => setValue(variable.id, e.target)}/></td>
                <td><button onClick={() => deleteVariable(variable.id)}>✖</button></td>
        </tr>)}

        <tr>
            <td colSpan="2"><hr style={{color:"whitesmoke"}}/></td>
        </tr>

        <tr>
        <td><input placeholder="new variable name" type="text" ref={newVariableName}/></td>
        <td><input placeholder="new variable value" type="text" ref={newVariableValue}/></td>
        <td><button onClick={(e) => addVariable(e)}>+</button></td>
        </tr>

        </tbody>
    </table>
            <div className="jtk-callflow-set-variables-buttons">
                <button onClick={() => commit()}>Save</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </>
}
