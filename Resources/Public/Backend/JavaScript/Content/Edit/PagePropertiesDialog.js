Ext.ns("F3.TYPO3.Content.Edit");

/**
 * @class F3.TYPO3.Content.Edit.PagePropertiesDialog
 * @namespace F3.TYPO3.Content.Edit
 * @extends F3.TYPO3.UserInterface.ModuleDialog
 *
 * The dialog for editing page properties, e.g. title and navigation title
 */
F3.TYPO3.Content.Edit.PagePropertiesDialog = Ext.extend(F3.TYPO3.UserInterface.ModuleDialog, {
	height: 80,
	initComponent: function() {
		var context,
			config = {
				items: F3.TYPO3.UserInterface.Form.FormFactory.createForm('TYPO3:Page', 'pageProperties', {
					ref: 'form',
					getLoadIdentifier: function() {
						context = Ext.getCmp('F3.TYPO3.Content.FrontendEditor').getCurrentContext();
						return context;
					},
					getSubmitIdentifier: function() {
						return context;
					},
					onSubmitSuccess: this._onOkButtonClickActionSuccess
				})
			};
		Ext.apply(this, config);
		F3.TYPO3.Content.Edit.PagePropertiesDialog.superclass.initComponent.call(this);

		this.on('F3.TYPO3.UserInterface.ContentDialog.buttonClick', this._onOkButtonClickAction, this);
		F3.TYPO3.Core.Application.on('F3.TYPO3.Content.contentChanged', this._refreshFrontendEditor, this);
	},

	/**
	 * Action when clicking the dialog ok button
	 *
	 * @param {} button
	 * @return {void}
	 */
	_onOkButtonClickAction: function(button) {
		if (button.itemId == 'okButton') {
			this.form.doSubmitForm();
		}
	},

	/**
	 * Action when succes on button click action
	 * remove the dialog and refresh frontend editor
	 *
	 * @return {void}
	 */
	_onOkButtonClickActionSuccess: function() {
		this.ownerCt.moduleMenu.removeModuleDialog();
		F3.TYPO3.Core.Application.fireEvent('F3.TYPO3.Content.contentChanged', '###pageId###');
	},

	/**
	 * refresh the frontend editor
	 *
	 *  @return {void}
	 */
	_refreshFrontendEditor: function() {
		Ext.getCmp('F3.TYPO3.Content.FrontendEditor').reload();
	}
});
Ext.reg('F3.TYPO3.Content.Edit.PagePropertiesDialog', F3.TYPO3.Content.Edit.PagePropertiesDialog);