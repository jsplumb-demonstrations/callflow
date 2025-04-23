import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from "@angular/core"
import {Node, uuid} from '@jsplumbtoolkit/browser-ui'
import {
  jsPlumbService
} from "@jsplumbtoolkit/browser-ui-angular"
import {CallFlowVariable} from "../definitions"

@Component({
  selector:"app-set-values",
  template:`<ng-container><table>
    <thead>
    <tr><th>Name</th><th>Value</th><th></th></tr>
    </thead>
    <tbody>
    @for(variable of variables;track variable.id) {
        <tr>
            <td><input [value]="variable.name" (blur)="setName(variable.id, $event.target)"></td>
            <td><input [value]="variable.value" (blur)="setValue(variable.id, $event.target)"></td>
            <td><button (click)="deleteVariable(variable.id)">✖</button></td>
        </tr>
    }
    <tr>
      <td><input placeholder="new variable name" type="text" [(ngModel)]="newVariableName"></td>
      <td><input placeholder="new variable value" type="text" [(ngModel)]="newVariableValue"></td>
      <td><button (click)="addVariable()">+</button></td>
    </tr>
    
    </tbody>
  </table>
    <div class="jtk-callflow-set-variables-buttons">
        <button (click)="update()">Save</button>
      <button (click)="cancel.emit()">Cancel</button>
    </div>
  </ng-container>
  `
})
export class SetValuesInspectorComponent implements OnInit {

  $jsplumb = inject(jsPlumbService)
  cdr = inject(ChangeDetectorRef)

  @Input() obj:Node
  @Output() cancel = new EventEmitter()
  @Output() save = new EventEmitter<Array<CallFlowVariable>>()

  newVariableName:string = ""
  newVariableValue:string = ""

  variables:Array<CallFlowVariable>

  ngOnInit() {
    this.variables = this.obj.data.variables.map((v:CallFlowVariable) => Object.assign({}, v))
  }

  update() {
    this.save.emit(this.variables)
  }

  addVariable() {
    if (this.newVariableName.length > 0 && this.newVariableValue.length > 0) {
      const v = this.variables.slice()
      v.push({name: this.newVariableName, value: this.newVariableValue, id:uuid()})
      this.newVariableName = ""
      this.newVariableValue = ""

    }
  }

  deleteVariable(id:string) {
    const idx = this.variables.findIndex((v:CallFlowVariable) => v.id === id)
    if (idx !== -1) {
      this.variables.splice(idx, 1)
      this.cdr.detectChanges()
    }
  }

  setName(id:string, el:any) {
    const v = this.variables.find((v:CallFlowVariable) => v.id === id)
    if (v != null) {
      v.name = el.value
      this.cdr.detectChanges()
    }
  }

  setValue(id:string, el:any) {
    const v = this.variables.find((v:CallFlowVariable) => v.id === id)
    if (v != null) {
      v.value = el.value
      this.cdr.detectChanges()
    }
  }
}
