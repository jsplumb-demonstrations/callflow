import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component} from "@angular/core"
import {ALL_KEYS} from "../../constants"

@Component({
  template:`<div class="jtk-callflow-node" data-jtk-target="true">
    <div class="jtk-callflow-label">
      <div class="jtk-callflow-node-icon"></div>
      {{label}}
    </div>
    <div class="jtk-callflow-keypad">
      
      @for(key of keys; track key) {
      <div class="jtk-callflow-keypad-key" [attr.data-jtk-port]="key">
        <span>{{key}}</span>
        <div class="jtk-callflow-connect" data-jtk-source="true"></div>
      </div>
      }
    </div>
  </div>`
})
export class KeypadEntryComponent extends BaseNodeComponent {

  label = "Keypad Entry"
  keys = ALL_KEYS
}
