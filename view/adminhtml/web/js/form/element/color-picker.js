define([
	'jquery',
    './abstract',
    'Magezon_Core/js/jquery.minicolors'
], function ($, Abstract) {
    'use strict';

    return Abstract.extend({

        defaults: {
            elementTmpl: 'Magezon_UiBuilder/form/element/color'
        },

        onElementRender: function () {
    		this.loadColorPicker();
        },

        afterLoadData: function () {
            this.loadColorPicker();
        },

        beforeLoadData: function () {
            this.destroyColorPicker();
        },

        loadColorPicker: function () {
            $('#' + this.uid).minicolors({
                theme: 'bootstrap',
                keywords: 'transparent, initial, inherit'
            });
        },

        destroyColorPicker: function () {
            $('#' + this.uid).minicolors('destroy');
        }
    });
});