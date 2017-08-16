import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as domConstruct from "dojo/dom-construct";
import * as dojoStyle from "dojo/dom-style";

import "./ui/BottomBar.css";

type WidgetAction = "doNothing" | "showPage" | "callMicroflow";                            /*enumeration */

interface BottomBarItem {
    displayText: string;
    iconClass: string;
    displayPage: string;
    displayPageMicroflow: string;
    WidgetActions: WidgetAction;
}

class BottomBar extends WidgetBase {                                                              /*inheritance */

    itemGroup: BottomBarItem[];

    private mxObject: mendix.lib.MxObject;

    postCreate() {
        
    }

    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.mxObject = object;
        this.resetSubscriptions();
        this.updateRendering();
        if (callback) {
            callback();
        }
    }

    private updateRendering() {
        if (this.mxObject) {
            dojoStyle.set(this.domNode, "display");
            this.createBar();   
        }
    }

    createBar() {
        const bottomBar = domConstruct.create("div", {
            class: "widget-bottom-bar"
        }, this.domNode);
        this.itemGroup.forEach(barItem => this.createBarItem(bottomBar, barItem));
    }

    private createBarItem(bottomBar: HTMLElement, barItem: BottomBarItem) {
        let errorMessage = "";
         if(!barItem.displayText && !barItem.iconClass){
            errorMessage = "tab cannot be empty";
            domConstruct.create("div", {
                class: "showerror",
                innerHTML: `<div> ${errorMessage}</div>`
            }, this.domNode);
        } 
        else{
        domConstruct.create("div", {
            class: "bar-item",
            innerHTML: `<span class = "content">
                            <span class="glyphicon ${barItem.iconClass}"></span>
                            <p><span>${barItem.displayText}</span>
                        </span>`
        }, bottomBar).addEventListener("click", () => {
            this.executeAction(barItem.displayPage, barItem.displayPageMicroflow, barItem.WidgetActions);
        }, false);
        }
    }

    private executeAction(Page: string, microflow: string, WidgetActions: WidgetAction) {
        if (microflow && WidgetActions === "callMicroflow") {
            window.mx.ui.action(microflow, {
                context: this.mxcontext
            });
        } else if (Page && WidgetActions === "showPage") {
            window.mx.ui.openForm(Page, {
                context: this.mxcontext
            });
        }
    }

    private resetSubscriptions() {                                                         
        this.unsubscribeAll();
        if (this.mxObject) {
            this.subscribe({
                callback: () => this.updateRendering(),
                guid: this.mxObject.getGuid()
            });
        }
    }

    /*uninitialize(): boolean {

        return true;
    }*/
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
