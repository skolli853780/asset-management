sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	var oController;

	return Controller.extend("asset-management.controller.detail", {
		
		onInit: function() {
			
			oController = this;
			
			oController._router = oController.getOwnerComponent().getRouter();
			
			oController._router.getRoute("detail").attachMatched(function (oEvent) {
				
				if (oController.getView().getModel("detailModel").getProperty("/inventoryFound")) {
					oController.byId("formGET").setVisible(true);
					oController.byId("formPUT").setVisible(false);
				}
				else {
					oController.onCreate();
				}
								
				
			},this);
		
		},
		navBack: function(oEvent) {
			window.history.go(-1);
		},
		
		onScan: function(oEvent) {
			sap.ndc.BarcodeScanner.scan(
				function(mResult) {
					
					var InventoryCollection = oController.getView().getModel("inventoryModel").getData().InventoryCollection;
						
					var result = $.grep(InventoryCollection, function(e){ return e.Inventory === mResult.text; });
					
					if (result[0]) {
						oController.getView().getModel("detailModel").setData(result[0]);
						oController.byId("formGET").setVisible(true);
						oController.byId("formPUT").setVisible(false);	
						
					}
					else {
						oController.onCreate();
						sap.m.MessageToast.show("Inventory not found! \n Create New");
					}
					
				},
				function(Error) {
					alert("Scanning failed: " + Error);
				}
			);
		},
		
		onCreate: function() {
			oController.getView().getModel("detailModel").setData({
				"Inventory": "",
				"Make": "",
				"Model": "",
				"SerialNo": "",
				"Description": "",
				"Locator": "",
				"Status": "",
				"Condition": "",
				"Bulding": "",
				"Comment": "",
				"inventoryFound": false
			});
			oController.byId("formGET").setVisible(false);
			oController.byId("formPUT").setVisible(true).setTitle("Create Inventory");
		},
		
		onEdit: function() {
			oController.byId("formGET").setVisible(false);
			oController.byId("formPUT").setVisible(true).setTitle("Update Inventory");
		},
		
		onSave: function () {
			sap.m.MessageToast.show("Save will be implemented soon!");
			console.log(oController.getView().getModel("detailModel").getData());
		}
		

	});

});