import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { jsPlumbToolkitModule} from "@jsplumbtoolkit/browser-ui-angular"

import { AppComponent } from './app.component';
import {CallFlowInspectorComponent} from "./inspector.component"
import {RequestNodeComponent} from "./components/request.node.component"
import {SetVariablesComponent} from "./components/set.variables.component"
import {ConditionsComponent} from "./components/conditions.component"
import {CallForwardingComponent} from "./components/call.forwarding.component"
import {KeypadEntryComponent} from "./components/keypad.entry.component"
import {SetValuesInspectorComponent} from "./set.values.inspector.component"
import {FormsModule} from "@angular/forms"
import {BaseCallFlowNodeComponent} from "./components/base.node.component"


@NgModule({
  declarations: [
    AppComponent,
    CallFlowInspectorComponent,

    BaseCallFlowNodeComponent,
    RequestNodeComponent,
    SetVariablesComponent,
    ConditionsComponent,
    CallForwardingComponent,
    KeypadEntryComponent,
    SetValuesInspectorComponent
  ],
  imports: [
    BrowserModule,
    jsPlumbToolkitModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
