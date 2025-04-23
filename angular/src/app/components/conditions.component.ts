import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component} from "@angular/core"

@Component({
  template:`<div class="jtk-callflow-node" data-jtk-target="true">
    <div class="jtk-callflow-label">
      <div class="jtk-callflow-node-icon"></div>
      {{label}}
      <div class="jtk-callflow-add-condition" (click)="addCondition()">+</div>
    </div>
    @for(v of obj.conditions; track v) {
    <div class="jtk-callflow-condition" [attr.data-jtk-port]="v.id">
      <span (click)="editCondition(v.id)" [title]="v.value">{{v.value}}</span>
      <div class="jtk-callflow-connect" data-jtk-source="true"></div>
      @if(v.value !== 'Else') {
        <div class="jtk-edge-delete" (click)="removeCondition(v.id)"></div>
      }
    </div>
    }
  </div>`
})
export class ConditionsComponent extends BaseNodeComponent {

  label = "Conditions"

  editCondition(id:string) {
    const port = this.getNode().getPort(id)
    if (port != null) {
      this.toolkit.setSelection(port)
    }
  }

  removeCondition(id:string) {
    const port = this.getNode().getPort(id)
    this.toolkit.removePort(port)

  }

  addCondition() {
    const order = this.obj.conditions.length,
      id = `${order}`

    this.toolkit.addNewPort(this.getNode(), "condition", {
      id,
      order,
      value:"New Condition"
    })

    setTimeout(() => this.toolkit.setSelection(this.getNode().getPort(id)) )
  }
}
