/* global AFRAME */

// Component that listens to an event, fades out an entity, swaps the color, and fades it back in

AFRAME.registerComponent('set-sky-color', {
	schema: {
		on: { type: 'string' },									// event name to listen to
		target: { type: 'selector' },						// entity to change the color of (sky)
		src: { type: 'string' },								// color to fade into
		dur: { type: 'number', default: 300 }		// animation fade duration
	},

	init: function () {
		var data = this.data
		var el = this.el

		this.setupFadeAnimation()

		el.addEventListener(data.on, () => {
			data.target.emit('sky-color-fade')		// fade out sky color
			setTimeout(() => { 										// wait for fade to complete
				data.target.setAttribute('color', 'src', data.src) 	// set color
			}, data.dur)
		})
	},

  // setup fade-in and fade-out
	setupFadeAnimation: () => {
		var data = this.data
		var targetEl = this.data.target
		
		// Only set up once
		if (targetEl.dataset.setImageFadeSetup) { return }
		targetEl.dataset.setImageFadeSetup = true

		// Create animation
		targetEl.setAttribute('animation_fade', {
			property: 'material.color',
			startEvents: 'sky-color-fade',
			dir: 'alternate',
			dur: data.dur,
			from: '#FFF',
			to: '#000'
		})
	}
})

// based on: https://github.com/aframevr/360-image-gallery-boilerplate/blob/master/components/set-image.js
