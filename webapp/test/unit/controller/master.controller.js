/*global QUnit*/

sap.ui.define([
	"lovdatafioriapp/controller/master.controller"
], function (Controller) {
	"use strict";

	QUnit.module("master Controller");

	QUnit.test("I should test the master controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
