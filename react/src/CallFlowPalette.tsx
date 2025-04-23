import {PaletteComponent} from '@jsplumbtoolkit/browser-ui-react';
import {NODE_TYPES} from "./node-types"

/**
 * Component supporting dragging new elements onto the canvas.
 */
export default function CallFlowPalette() {

    function dataGenerator (el:Element) {
        const type = el.getAttribute("data-jtk-type")
        const nodeType = NODE_TYPES.find(nt => nt.type === type)
        const base:any = Object.assign({ type }, Object.assign({}, nodeType?.payload || {}) )
        return base
    }

    return <PaletteComponent className="jtk-callflow-palette" dataGenerator={dataGenerator}>
        {NODE_TYPES.map(nt => <div data-jtk-type={nt.type} title="Drag to add new" className="jtk-callflow-palette-item" key={nt.type}>
            <div className="jtk-callflow-node-icon"/>
            {nt.label}
        </div>)}
    </PaletteComponent>
}

