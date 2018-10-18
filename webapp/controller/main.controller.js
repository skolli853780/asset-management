sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var oController;
	
	return Controller.extend("asset-management.controller.main", {
		onInit: function() {
			oController = this;
			
			
			oController._router = oController.getOwnerComponent().getRouter();
			
			// this.byId("scannerBox").addItem(new sap.ndc.BarcodeScannerButton({
			// 	scanSuccess: function (oEvent) {
			// 		alert(oEvent.getParameters().text);
					
			// 	}
			// }));
			
		},
		onScan: function(oEvent) {
			sap.ndc.BarcodeScanner.scan(
				function(mResult) {
					
					var InventoryCollection = oController.getView().getModel("inventoryModel").getData().InventoryCollection;
						
					var result = $.grep(InventoryCollection, function(e){ return e.Inventory === mResult.text; });
					
					if (result[0]) {
						oController.getView().getModel("detailModel").setData(result[0]);
							
						oController._router.navTo("detail");
					}
					else {
						oController._router.navTo("detail");
						sap.m.MessageToast.show("Inventory not found! \n Create New");
					}
					
					// alert("We got a bar code\n" +
					// 	"Result: " + mResult.text + "\n" +
					// 	"Format: " + mResult.format + "\n" +
					// 	"Cancelled: " + mResult.cancelled);
				},
				function(Error) {
					alert("Scanning failed: " + Error);
				}
			);
		},
		onManualEntry: function () {
			
			oController._router.navTo("detail");
			
			// var codeInput = new sap.m.Input({
			// 			liveChange: function(oEvent) {
			// 				var sText = oEvent.getParameter("value");
			// 				var parent = oEvent.getSource().getParent();
 
			// 				parent.getBeginButton().setEnabled(sText.length > 0);
			// 			},
			// 			width: "100%",
			// 			placeholder: "Barcode (required)"
			// 		});
			
			
			
			// var dialog = new sap.m.Dialog({
			// 	title: "Enter the Barcode",
			// 	type: "Message",
			// 	content: [codeInput],
			// 	beginButton: new sap.m.Button({
			// 		text: "Submit",
			// 		enabled: false,
			// 		press: function () {
						
			// 			var InventoryCollection = oController.getView().getModel("inventoryModel").getData().InventoryCollection;
						
			// 			var result = $.grep(InventoryCollection, function(e){ return e.Inventory === codeInput.getValue(); });
						
			// 			if (result[0]) {
			// 				oController.getView().getModel("detailModel").setData(result[0]);
			// 				dialog.close();
			// 				oController._router.navTo("detail");
			// 			}
			// 			else {
			// 				oController._router.navTo("detail");
			// 				sap.m.MessageToast.show("Inventory not found! \n Create New");
			// 			}
						
			// 		}
			// 	}),
			// 	endButton: new sap.m.Button({
			// 		text: "Cancel",
			// 		press: function () {
			// 			dialog.close();
			// 		}
			// 	}),
			// 	afterClose: function() {
			// 		dialog.destroy();
			// 	}
			// });
 
			// dialog.open();
		},

	});
});