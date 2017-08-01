import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as domConstruct from "dojo/dom-construct";
import * as dojoStyle from "dojo/dom-style";
import * as dojoClass from "dojo/dom-class";
import * as dom from "dojo/dom";
import * as dojohtml from "dojo/html";

import "./ui/BottomBar.css";

interface BottomBarItem {
    displayText: string;
    iconClass: string;
    displayPage: string;
    displayPageMicroflow: string;
    displayWithMicroflow: boolean;
}

class BottomBar extends WidgetBase {

    // parameters configured in the modeler from the xml file.
    itemGroup: BottomBarItem[];

    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    private contextObject: mendix.lib.MxObject;
    private mxObject: mendix.lib.MxObject;

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
            class: "widget-bottom-bar"
        }, this.domNode);
        this.itemGroup.forEach((barItem: BottomBarItem) => this.createBarItem(bottomBar, barItem));
    }

    private createBarItem(bottomBar: HTMLElement, barItem: BottomBarItem) {
        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: "<span>" + barItem.displayText + "</span>" + "<i class =" + barItem.iconClass + "></i>"
        }, bottomBar).addEventListener("click", () => {
            if (barItem.displayWithMicroflow) {
                this.executeMicroflow(barItem.displayPageMicroflow, this.contextObject.getGuid());
            }
            this.PageToNavigate(barItem.displayPage, this.mxObject);
        }, false);

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

    private PageToNavigate(Openpage: string, mxObject: mendix.lib.MxObject) {
        const context = this.mxcontext;
        if (Openpage) {
            window.mx.ui.openForm(Openpage, {
                context,
                error: error => window.mx.ui.error(`Error while opening page ${Openpage}: ${error.message}`)
            });
        }
    }

    private executeMicroflow(microflow: string, guid: string, cb?: (obj: mendix.lib.MxObject) => void) {
        if (microflow && guid) {
            mx.ui.action(microflow, {
                params: {
                    applyto: "selection",
                    guids: [guid]
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

// tslint:disable : only-arrow-functions
dojoDeclare("BottomBar.widget.BottomBar", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(BottomBar));
