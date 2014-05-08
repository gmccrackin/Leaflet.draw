// Color is depended on Jquery and Spectrum.js
// Spectrum was picked for the community support and features with pallets, alpha, touch and multi instance
// This is included for demo only. You should grab the latest version
// of it here: https://github.com/bgrins/spectrum
// Specrum is dependent on jquery but that's cool :P

L.EditToolbar.Styleable = L.Handler.extend({
	statics: {
		TYPE: 'styleable'
	},

	includes: L.Mixin.Events,

	initialize: function (map, options) {
		L.Handler.prototype.initialize.call(this, map);

		L.Util.setOptions(this, options);

		// Save the type so super can fire, need to do this as cannot do this.TYPE :(
		this.type = L.EditToolbar.Styleable.TYPE;

		this.setStyle('4'); // Set default styles for all tools on load
		
		// Create Range 
		this._inputRange = L.DomUtil.create('input', 'leaflet-draw-layer-edit-styleable');
		this._inputRange.setAttribute("type", "range");
		this._inputRange.setAttribute("min", "1");
		this._inputRange.setAttribute("max", "10");
		
		var styleable = this;
		// Set stroke size for all drawing tools
		this._inputRange.addEventListener('change', function() {
			styleable.setStyle(this.value); 
		});

	},

    // addHooks: function() {
    //     L.EditToolbar.prototype.addHooks.call(this);
    //     // Creates a mini tool box for changing stroke width.
    // },

    // removeHooks: function() {
    //     L.EditToolbar.prototype.removeHooks.call(this);
    // },

	enable: function (e) {
		if (this._enabled) {
            this.disable();
            return;
        };
		//this.fire('enabled', {handler: this.type});
        var target = e.target;
        target.appendChild(this._inputRange);
        this._enabled == true;
	},

	disable: function () {
		if (!this._enabled) return;

		//this.fire('disabled', {handler: this.type});

		var target = e.target;
		target.removeChild(this._inputRange);
	},

    revertLayers: function() {
    },


	setStyle: function (weight) {
		// Use global var of toolbar that gets set on L.Control.Draw initialization
		L.toolbar.setDrawingOptions({ 
			polyline: { shapeOptions: { weight: weight } },
			polygon: { shapeOptions: { weight: weight } },
			rectangle: { shapeOptions: { weight: weight } },
			circle: { shapeOptions: { weight: weight } }
		});
	},
});
