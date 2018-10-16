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
				
				
								
				
			},this);
		
		},
		navBack: function(oEvent) {
			window.history.go(-1);
		}
		

	});

});