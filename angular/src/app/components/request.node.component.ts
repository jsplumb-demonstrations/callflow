import {BaseNodeComponent} from "@jsplumbtoolkit/browser-ui-angular"
import {Component} from "@angular/core"

@Component({
  template:`<div class="jtk-callflow-node" data-jtk-target="true">
    <div class="jtk-callflow-label">
      <div class="jtk-callflow-node-icon"></div>
      {{label}}
    </div>
    <div class="jtk-callflow-request-url">
      {{obj.url}}
    </div>
    <div class="jtk-callflow-request-port" data-jtk-port="condition">
      <span>condition</span>
      <div class="jtk-callflow-connect" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-request-port" data-jtk-port="else">
      <span>Else</span>
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
    <div class="jtk-callflow-request-port" data-jtk-port="failure">
      <span>Failure</span>
      <div class="jtk-callflow-connect jtk-callflow-fail-path" data-jtk-source="true"></div>
    </div>
  </div>
  `
})
export class RequestNodeComponent extends BaseNodeComponent {

  label = "Request"
}
