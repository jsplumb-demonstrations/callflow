import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component, OnInit} from "@angular/core"
import {getNodeLabel} from "../../node-types"

@Component({
  templateUrl:'./base.node.component.html'
})
export class BaseCallFlowNodeComponent extends BaseNodeComponent implements OnInit {

  label!:string

  ngOnInit(): void {
    super.ngOnInit()
    this.label = getNodeLabel(this.obj.type)
  }

  editNode() {
    this.toolkit.setSelection(this.getNode())
  }

}
