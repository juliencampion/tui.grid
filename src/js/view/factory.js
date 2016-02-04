/**
 * @fileoverview View factory
 * @author NHN Ent. FE Development Team
 */
'use strict';

var ContainerView = require('./container');
var ToolbarView = require('./layout/toolbar');
var ToolbarControlPanelView = require('./layout/toolbar/controlPanel');
var ToolbarPaginationView = require('./layout/toolbar/pagination');
var ToolbarResizeHandlerView = require('./layout/toolbar/resizeHandler');
var StateLayerView = require('./stateLayer');
var ClipboardView = require('./clipboard');
var LsideFrameView = require('./layout/frame-lside');
var RsideFrameView = require('./layout/frame-rside');
var HeaderView = require('./layout/header');
var HeaderResizeHandlerView = require('./layout/resizeHandler');
var BodyView = require('./layout/body');
var BodyTableView = require('./layout/bodyTable');
var RowListView = require('./rowList');
var SelectionLayerView = require('./selectionLayer');

/**
 * View Factory
 * @module viewFactory
 */
var ViewFactory = tui.util.defineClass({
    init: function(options) {
        this.modelManager = options.modelManager;
        this.painterManager = options.painterManager;
    },

    /**
     * Creates container view and returns it.
     * @param {Object} options - Options set by user
     * @returns {module:view/container} - New container view instance
     */
    createContainer: function(options) {
        return new ContainerView({
            el: options.el,
            singleClickEdit: options.singleClickEdit,
            dataModel: this.modelManager.dataModel,
            dimensionModel: this.modelManager.dimensionModel,
            focusModel: this.modelManager.focusModel,
            gridId: this.modelManager.gridId,
            viewFactory: this
        });
    },

    /**
     * Creates toolbar view and returns it.
     * @returns {module:view/toolbar} - New toolbar view instance
     */
    createToolbar: function() {
        return new ToolbarView({
            toolbarModel: this.modelManager.toolbarModel,
            dimensionModel: this.modelManager.dimensionModel,
            viewFactory: this
        });
    },

    /**
     * Creates toolbar control panel view and returns it.
     * @returns {module:view/toolbar/controlPanel} - New control panel vew insatnce
     */
    createToolbarControlPanel: function() {
        return new ToolbarControlPanelView({
            gridId: this.modelManager.gridId,
            toolbarModel: this.modelManager.toolbarModel
        });
    },

    /**
     * Creates toolbar pagination view and returns it.
     * @returns {module:view/toolbar/pagination} - New pagination view instance
     */
    createToolbarPagination: function() {
        return new ToolbarPaginationView({
            toolbarModel: this.modelManager.toolbarModel
        });
    },

    /**
     * Creates toolbar resize handler view and returns it.
     * @returns {module:view/toolbar/resizeHandler} - New resize hander view instance
     */
    createToolbarResizeHandler: function() {
        return new ToolbarResizeHandlerView({
            dimensionModel: this.modelManager.dimensionModel
        });
    },

    /**
     * Creates state layer view and returns it.
     * @returns {module:view/stateLayer} - New state layer view instance
     */
    createStateLayer: function() {
        return new StateLayerView({
            dimensionModel: this.modelManager.dimensionModel,
            renderModel: this.modelManager.renderModel
        });
    },

    /**
     * Creates clipboard view and returns it.
     * @returns {module:view/clipboard} - New clipboard view instance
     */
    createClipboard: function() {
        return new ClipboardView({
            columnModel: this.modelManager.columnModel,
            dataModel: this.modelManager.dataModel,
            dimensionModel: this.modelManager.dimensionModel,
            selectionModel: this.modelManager.selectionModel,
            focusModel: this.modelManager.focusModel,
            renderModel: this.modelManager.renderModel,
            painterManager: this.modelManager.painterManager
        });
    },

    /**
     * Creates frame view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/layout/frame} New frame view instance
     */
    createFrame: function(whichSide) {
        var Constructor = whichSide === 'L' ? LsideFrameView : RsideFrameView;

        return new Constructor({
            dimensionModel: this.modelManager.dimensionModel,
            renderModel: this.modelManager.renderModel,
            viewFactory: this
        });
    },

    /**
     * Creates header view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/layout/header} New header view instance
     */
    createHeader: function(whichSide) {
        return new HeaderView({
            whichSide: whichSide,
            renderModel: this.modelManager.renderModel,
            dimensionModel: this.modelManager.dimensionModel,
            selectionModel: this.modelManager.selectionModel,
            dataModel: this.modelManager.dataModel,
            columnModel: this.modelManager.columnModel,
            viewFactory: this
        });
    },

    /**
     * Creates resize handler of header view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/layout/header} New resize handler view instance
     */
    createHeaderResizeHandler: function(whichSide) {
        return new HeaderResizeHandlerView({
            whichSide: whichSide,
            dimensionModel: this.modelManager.dimensionModel,
            columnModel: this.modelManager.columnModel
        });
    },

    /**
     * Creates body view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/layout/body} New body view instance
     */
    createBody: function(whichSide) {
        return new BodyView({
            whichSide: whichSide,
            renderModel: this.modelManager.renderModel,
            dimensionModel: this.modelManager.dimensionModel,
            dataModel: this.modelManager.dataModel,
            columnModel: this.modelManager.columnModel,
            selectionModel: this.modelManager.selectionModel,
            focusModel: this.modelManager.focusModel,
            viewFactory: this
        });
    },

    /**
     * Creates body-table view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/layout/bodyTable} New body-table view instance
     */
    createBodyTable: function(whichSide) {
        return new BodyTableView({
            whichSide: whichSide,
            dimensionModel: this.modelManager.dimensionModel,
            renderModel: this.modelManager.renderModel,
            columnModel: this.modelManager.columnModel,
            painterManager: this.painterManager,
            viewFactory: this
        });
    },

    /**
     * Creates row list view and returns it.
     * @param  {Object} options - Options
     * @param  {jQuery} options.el - jquery object wrapping tbody html element
     * @param  {String} options.whichSide - 'L'(left) or 'R'(right)
     * @param  {module:view/layout/bodyTable} options.bodyTableView - body table view
     * @returns {module:view/rowList} New row list view instance
     */
    createRowList: function(options) {
        return new RowListView({
            el: options.el,
            whichSide: options.whichSide,
            bodyTableView: options.bodyTableView,
            dataModel: this.modelManager.dataModel,
            columnModel: this.modelManager.columnModel,
            dimensionModel: this.modelManager.dimensionModel,
            renderModel: this.modelManager.renderModel,
            focusModel: this.modelManager.focusModel,
            painterManager: this.painterManager
        });
    },

    /**
     * Creates selection view and returns it.
     * @param  {String} whichSide - 'L'(left) or 'R'(right)
     * @returns {module:view/selection} New selection view instance
     */
    createSelectionLayer: function(whichSide) {
        return new SelectionLayerView({
            whichSide: whichSide,
            selectionModel: this.modelManager.selectionModel,
            dimensionModel: this.modelManager.dimensionModel,
            columnModel: this.modelManager.columnModel
        });
    }
});

module.exports = ViewFactory;