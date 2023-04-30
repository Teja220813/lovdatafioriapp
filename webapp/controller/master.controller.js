sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/m/MessageToast","sap/m/ColumnListItem",
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast,ColumnListItem,Input) {
        "use strict";

        return Controller.extend("lovdatafioriapp.controller.master", {
            onInit: function () {
                this._oTable1 = this.byId("table1");
                this._oTable = this.byId("table0");
               
                this._createReadOnlyTemplates();
                this._createReadOnlyTemplates1();
                this.rebindTable(this.oReadOnlyTemplate, "Navigation");
                this.oEditableTemplate = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{mainModel>Id}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>Name}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>Active}",
                            change: [this.onInputChange, this]
                        }), new Input({
                            value: "{mainModel>Description}",
                            change: [this.onInputChange, this]
                        }),  new Input({
                            value: "{mainModel>Category}",
                            change: [this.onInputChange, this]
                        })
                    ]
                });
                this.rebindTable1(this.oReadOnlyTemplate1, "Navigation");
                this.oEditableTemplate1 = new ColumnListItem({
                    cells: [
                        new Input({
                            value: "{mainModel>Id}",
                            change: [this.onInputChange1, this]
                        }), new Input({
                            value: "{mainModel>Isocode}",
                            change: [this.onInputChange1, this]
                        }),
                        new Input({
                            value: "{mainModel>LovType}",
                            change: [this.onInputChange1, this]
                        }), new Input({
                            value: "{mainModel>Active}",
                            change: [this.onInputChange1, this]
                        }), new Input({
                            value: "{mainModel>Description}",
                            change: [this.onInputChange1, this]
                        }) 
                    ]
                });
                

      },
      
      onOpenAddDialog: function () {
          this.getView().byId("OpenDialog").open();
       },
       onOpenAddDialog1: function () {
        this.getView().byId("OpenDialog1").open();
     },
       onCancelDialog: function (oEvent) {
          oEvent.getSource().getParent().close();
       },
       onCancelDialog1: function (oEvent) {
        oEvent.getSource().getParent().close();
     },
       
       onCreate: function () {
         
         
              const oList = this._oTable;
                  const oBinding = oList.getBinding("items");
                  var active = false;
                  if(this.byId("idActive").getValue()==="true"){
                    active = true;
                  }else if(this.byId("idActive").getValue()==="true"){
                    active = false;
                  }
                  const oContext = oBinding.create({
                      "Name": this.byId("idName").getValue(),
                      "Active": active,
                      "Description": this.byId("iddescription").getValue(),
                      "Category": this.byId("idcategory").getValue(),
                      "LovValue":[{
                        "Isocode" : "ZML",
                        "Active" : active,
                        "Description" :"CCPL trade sales",
                        "SystemId" : 0,
                       "Datatype" : "Upload required LovType"
                      }]     
                  });
                  oContext.created()
                  .then(()=>{
                    debugger;
                          // that._focusItem(oList, oContext);
                          this.getView().byId("OpenDialog").close();
                  });

          

      },
      onCreate1: function () {
         
         
        const oList1 = this._oTable1;
            const oBinding1 = oList1.getBinding("items");
            
            const oContext1 = oBinding1.Create({
                "Isocode": this.byId("idIsocode").getValue(),
                "Active": this.byId("idActive1").getState(),
                "Description": this.byId("iddescription1").getValue(),
                "LovType": this.byId("idname").getValue(),
                
                     
            });
            oContext1.created()
            .then(()=>{
              debugger;
                    // that._focusItem(oList1, oContext1);
                    this.getView().byId("OpenDialog1").close();
            });

    

},
      

    


      onEditMode: function(){
          this.byId("editModeButton").setVisible(true);
          this.byId("saveButton").setVisible(true);
          this.byId("deleteButton").setVisible(true);
          this.rebindTable(this.oEditableTemplate, "Edit");
     },
     onEditMode1: function(){
        this.byId("editModeButton1").setVisible(true);
        this.byId("saveButton1").setVisible(true);
        this.byId("deleteButton1").setVisible(true);
        this.rebindTable1(this.oEditableTemplate1, "Edit");
   },
     

     onDelete: function(){

      var oSelected = this.byId("table0").getSelectedItem();
      if(oSelected){
          var oLOvType = oSelected.getBindingContext("mainModel").getObject().Id;
      
          oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
              MessageToast.show(oLOvType + " SuccessFully Deleted");
          }.bind(this), function (oError) {
              MessageToast.show("Deletion Error: ",oError);
          });
      } else {
          MessageToast.show("Please Select a Row to Delete");
      }
      
  },
  onDelete1: function(){

    var oSelected1 = this.byId("table1").getSelectedItem();
    if(oSelected1){
        var oLOvValue = oSelected1.getBindingContext("mainModel").getObject().Id;
    
        oSelected1.getBindingContext("mainModel").delete("$auto").then(function () {
            MessageToast.show(oLOvValue + " SuccessFully Deleted");
        }.bind(this), function (oError) {
            MessageToast.show("Deletion Error: ",oError);
        });
    } else {
        MessageToast.show("Please Select a Row to Delete");
    }
    
},
  
  rebindTable: function(oTemplate, sKeyboardMode) {
    this._oTable.bindItems({
        path: "mainModel>/LovType",
        template: oTemplate,
        templateShareable: true
    }).setKeyboardMode(sKeyboardMode);
},
rebindTable1: function(oTemplate1, sKeyboardMode1) {
    
    this._oTable1.bindItems({
        path: "mainModel>/LovValue",
        template: oTemplate1,
        templateShareable: true
    }).setKeyboardMode(sKeyboardMode1);
    
},

onInputChange: function(){
    this.refreshModel("mainModel");

},
onInputChange1: function(){
    this.refreshModel1("mainModel");

},


refreshModel: function (sModelName, sGroup){
    return new Promise((resolve,reject)=>{
        this.makeChangesAndSubmit.call(this,resolve,reject,
        sModelName,sGroup);
    });
    
},
refreshModel1: function (sModelName1, sGroup1){
    return new Promise((resolve1,reject1)=>{
        this.makeChangesAndSubmit1.call(this,resolve1,reject1,
        sModelName1,sGroup1);
    });
    
},

makeChangesAndSubmit: function (resolve, reject, sModelName,sGroup){
    const that = this;
    sModelName = "mainModel";
    sGroup = "$auto";
    if (that.getView().getModel(sModelName).hasPendingChanges(sGroup)) {
        that.getView().getModel(sModelName).submitBatch(sGroup).then(oSuccess =>{
            that.makeChangesAndSubmit(resolve,reject, sModelName,sGroup);
            MessageToast.show("Record updated Successfully");
        },reject)
        .catch(function errorHandler(err) {
            MessageToast.show("Something Went Wrong ",err.message); // 'Oops!'
          });
    } else {
        that.getView().getModel(sModelName).refresh(sGroup);
        resolve();
    }
},
makeChangesAndSubmit1: function (resolve1, reject1, sModelName1,sGroup1){
    const that = this;
    sModelName1 = "mainModel";
    sGroup1 = "$auto";
    if (that.getView().getModel(sModelName1).hasPendingChanges(sGroup1)) {
        that.getView().getModel(sModelName1).submitBatch(sGroup1).then(oSuccess =>{
            that.makeChangesAndSubmit(resolve,reject, sModelName,sGroup);
            MessageToast.show("Record updated Successfully");
        },reject1)
        .catch(function errorHandler(err) {
            MessageToast.show("Something Went Wrong ",err.message); // 'Oops!'
          });
    } else {
        that.getView().getModel(sModelName1).refresh(sGroup1);
        resolve1();
    }
},
onSave: function(){
    this.getView().byId("editModeButton").setVisible(true);
    this.getView().byId("saveButton").setVisible(false);
    this._oTable.setMode(sap.m.ListMode.None);
    this.rebindTable(this.oReadOnlyTemplate, "Navigation");
    
},
onSave1: function(){
    this.getView().byId("editModeButton1").setVisible(true);
    this.getView().byId("saveButton1").setVisible(false);
    this._oTable1.setMode(sap.m.ListMode.None);
    this.rebindTable1(this.oReadOnlyTemplate1, "Navigation");
    
},
_createReadOnlyTemplates: function () {
    this.oReadOnlyTemplate = new sap.m.ColumnListItem({
    cells: [
        new sap.m.Text({
            text: "{mainModel>Id}"
        }),
        new sap.m.Text({
            text: "{mainModel>Name}"
        }),
        new sap.m.Text({
            text: "{mainModel>Active}"
        }),
        new sap.m.Text({
            text: "{mainModel>Description}"
        }),
        new sap.m.Text({
            text: "{mainModel>Category}"
        })
    ]
});
},
_createReadOnlyTemplates1: function () {
    this.oReadOnlyTemplate1 = new sap.m.ColumnListItem({
    cells: [
        new sap.m.Text({
            text: "{mainModel>Id}"
        }),
        new sap.m.Text({
            text: "{mainModel>Isocode}"
        }),new sap.m.Text({
            text: "{mainModel>LovType}"
        }),
        new sap.m.Text({
            text: "{mainModel>Active}"
        }),
        new sap.m.Text({
            text: "{mainModel>Description}"
        })
        
    ]
});
},



  });
});
