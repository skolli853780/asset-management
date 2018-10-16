sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var oController;
	
	return Controller.extend("asset-management.controller.main", {
		onInit: function() {
			oController = this;
			jQuery.sap.require("sap.ndc.BarcodeScanner");
			
			oController._router = oController.getOwnerComponent().getRouter();
			
			// this.byId("scannerBox").addItem(new sap.ndc.BarcodeScannerButton({
			// 	scanSuccess: function (oEvent) {
			// 		alert(oEvent.getParameters().text);
					
			// 	}
			// }));
			
		},
		onPress: function(oEvent) {
			sap.ndc.BarcodeScanner.scan(
				function(mResult) {
					
					// oController.byId("barCode").setText(mResult.text);
					
					oController.getView().getModel("detailModel").setData({scanCode:mResult.text});
					
					oController._router.navTo("detail");
					
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
			
			
			
			var dialog = new sap.m.Dialog({
				title: 'Enter the Barcode',
				type: 'Message',
				content: [
					new sap.m.Input('submitDialogTextarea', {
						liveChange: function(oEvent) {
							var sText = oEvent.getParameter('value');
							var parent = oEvent.getSource().getParent();
 
							parent.getBeginButton().setEnabled(sText.length > 0);
						},
						width: '100%',
						placeholder: 'Barcode (required)'
					})
				],
				beginButton: new sap.m.Button({
					text: 'Submit',
					enabled: false,
					press: function () {
						var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
						oController.getView().getModel("detailModel").setData({scanCode:sText});
						
						dialog.close();
						oController._router.navTo("detail");
					}
				}),
				endButton: new sap.m.Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},

	});
});