import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component} from "@angular/core"

@Component({
  template:`<div class="jtk-callflow-node" data-jtk-target="true">
    <div class="jtk-callflow-label">
      <div class="jtk-callflow-node-icon"></div>
      {{label}}
    </div>
    @if(obj['number'] != null) {
      <div class="jtk-callflow-node-text">
        {{obj.number}}
      </div>
    }  
    <div class="jtk-callflow-condition" data-jtk-port="success">
      Success
      <div class="jtk-callflow-connect" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-condition" data-jtk-port="no-answer">
      No Answer
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-condition" data-jtk-port="busy">
      Busy
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-condition" data-jtk-port="decline">
      Decline
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-condition" data-jtk-port="error">
      Error
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
  </div>`
})
export class CallForwardingComponent extends BaseNodeComponent {

  label = "Forward to Phone"
}
