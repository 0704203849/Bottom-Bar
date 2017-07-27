import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as domConstruct from "dojo/dom-construct";
import * as dojoStyle from "dojo/dom-style";
import * as dojoClass from "dojo/dom-class";
import * as dom from "dojo/dom";
import * as dojohtml from "dojo/html";

import "./ui/BottomBar.css";

class BottomBar extends WidgetBase {

    //parameters configured in the modeler from the xml file.
    page1: string;
    page2: string;
    page3: string;

    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    //private handles: ;
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
            innerHTML: "<span>name</span>"
        }, bottomBar);

        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>name</span>"
        }, bottomBar);

        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>name</span>"
        }, bottomBar);
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
}

dojoDeclare("BottomBar.widget.BottomBar", [WidgetBase], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(BottomBar));