define([
    'jquery',
    'uiRegistry',
    'Magento_Ui/js/form/element/ui-select'
], function ($, registry, Select) {
    'use strict';

    return Select.extend({
        defaults: {
            multiple: false,
            previousGroup: null,
            groupsConfig: {},
            valuesMap: {},
            indexesMap: {},
            updatePlaceholder: 'ns = ${ $.ns }, parentScope = ${ $.parentScope }'
        },

        /**
         * Initialize component.
         * @returns {Element}
         */
        initialize: function () {

            return this
                ._super()
                .initMapping()
                .updateComponents(this.initialValue, true);
        },

        /**
         * Create additional mappings.
         *
         * @returns {Element}
         */
        initMapping: function () {
            var self = this;
            _.each(this.groupsConfig, function (fields, group) {
                _.each(fields, function (index) {
                    if (!self.indexesMap[index]) {
                        self.indexesMap[index] = [];
                    }
                    self.indexesMap[index].push(group);
                });
            }, this);

            return this;
        },

        /**
         * Callback that fires when 'value' property is updated.
         *
         * @param {String} currentValue
         * @returns {*}
         */
        onUpdate: function (currentValue) {
            this.updateComponents(currentValue);

            return this._super();
        },

        /**
         * Show, hide or clear components based on the current type value.
         *
         * @param {String} currentValue
         * @param {Boolean} isInitialization
         * @returns {Element}
         */
        updateComponents: function (currentValue, isInitialization) {
            var self = this;

            _.each(this.indexesMap, function (groups, index) {
                var template = self.updatePlaceholder + ', index = ' + index,
                    visible = groups.indexOf(currentValue) !== -1,
                    component;

                    /*eslint-disable max-depth */
                    if (isInitialization) {
                        registry.async(template)(
                            function (currentComponent) {
                                currentComponent.visible(visible);
                            }
                        );
                    } else {
                        component = registry.get(template);

                        if (component) {
                            component.visible(visible);
                        }
                    }
            });

            return this;
        },

        /**
         * Set caption
         */
        // setCaption: function () {
        //     var length;

        //     var value = this.value() ? this.value().toString() : '';

        //     if (!_.isArray(value) && value) {
        //         length = 1;
        //     } else if (value != '') {
        //         length = value.length;
        //     } else {
        //         this.value([]);
        //         length = 0;
        //     }

        //     if (length > 1) {
        //         this.placeholder(length + ' ' + this.selectedPlaceholders.lotPlaceholders);
        //     } else if (length && this.getSelected().length) {
        //         this.placeholder(this.getSelected()[0].label);
        //     } else {
        //         this.placeholder(this.selectedPlaceholders.defaultPlaceholder);
        //     }

        //     return this.placeholder();
        // },

        /**
         * Parses options and merges the result with instance
         * Set defaults according to mode and levels configuration
         *
         * @param  {Object} config
         * @returns {Object} Chainable.
         */
        initConfig: function (config) {
            if (config['initialOptions']) {
                config['options'] = eval(config['initialOptions']);
            }

            this._super(config);
            return this;
        }
    });
});