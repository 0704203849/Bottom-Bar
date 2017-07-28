import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as domConstruct from "dojo/dom-construct";
import * as dojoStyle from "dojo/dom-style";
import * as dojoClass from "dojo/dom-class";
import * as dom from "dojo/dom";
import * as dojohtml from "dojo/html";
import * as $ from "jquery";
// import * as JQuery from "BottomBar/lib/jquery-1.11.2";

import "./ui/BottomBar.css";

class BottomBar extends WidgetBase {

    // parameters configured in the modeler from the xml file.

    MicroflowToExecute1: string;
    MicroflowToExecute2: string;
    MicroflowToExecute3: string;
    MicroflowToExecute4: string;
    Usertext: string;

    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    // private handles: ;
    private contextObject: mendix.lib.MxObject;

    postCreate() {
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.resetSubscriptions();
        this.updateRendering();
        if (callback) {
            callback();
        }
    }

    htmldoc() {
        const bottomBar = domConstruct.create("div", {
            class: "widget-bottom-bar",
            id: "divv"
        }, this.domNode);

        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>" + this.Usertext + "</span>"
        }, bottomBar).addEventListener("click", () => {
            if (this.MicroflowToExecute1) {
                this.executeMicroflow(this.MicroflowToExecute1, this.contextObject.getGuid());
            }
        }, false);

        domConstruct.create("div", {
            class: "bar-item two",
            innerHTML: "<span>name</span>"
        }, bottomBar).addEventListener("click", () => {
            if (this.MicroflowToExecute2) {
                this.executeMicroflow(this.MicroflowToExecute2, this.contextObject.getGuid());
            }
        }, false);

        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>name</span>"
        }, bottomBar).addEventListener("click", () => {
            if (this.MicroflowToExecute3) {
                this.executeMicroflow(this.MicroflowToExecute3, this.contextObject.getGuid());
            }
        }, false);

        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>name</span>"
        }, bottomBar).addEventListener("click", () => {
            if (this.MicroflowToExecute4) {
                this.executeMicroflow(this.MicroflowToExecute4, this.contextObject.getGuid());
            }
        }, false);

        /*  $("widget-bottom-bar > .bar-item").click(function () {
              $(this).removeClass("widget-bottom-bar > .bar-item:active");
              $(this).addClass("widget-bottom-bar > .bar-item:active");
          });*/
    }

    private updateRendering() {
        if (this.contextObject) {
            dojoStyle.set(this.domNode, "hidden");
            this.htmldoc();
        } else {
            dojoStyle.set(this.domNode, "hidden");
        }
    }

    private resetSubscriptions() {
        this.unsubscribeAll();
        if (this.contextObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.contextObject.getGuid()
            });
        }
    }

    private executeMicroflow(microflow: string, guid: string, cb?: (obj: mendix.lib.MxObject) => void) {
        if (microflow && guid) {
            mx.ui.action(microflow, {
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                },
                callback: (objs: mendix.lib.MxObject) => {
                    if (cb && typeof cb === "function") {
                        cb(objs);
                    }
                },
                error: (error) => {
                    mx.ui.error("Error executing microflow " + microflow + " : " + error.message);
                }
            }, this);
        }
    }
}

dojoDeclare("BottomBar.widget.BottomBar", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(BottomBar));
