/* global AFRAME */

// Sky color-setting component: 
//   - listens for event 'sentiment-change'
//   - fades out the <a-sky> entity
//   - swaps the color (to color in state?)
//   - fades it back in

AFRAME.registerComponent('set-sky-color', {

	// properties we are translating to the schema:
	//  - event name to listen to
	//  - which entity to change (sky)
	//  - sky color (or image texture -- could have 5 images, one for each color)
	//  - animation fade duration

	schema: {
		on: { type: 'string' },
		target: { type: 'selector' },	// <a-sky>
		color: { type: 'string' },
		dur: { type: 'number', default: 300 }
	},

	// set up event listener to change the sky color while the color has faded to black
	init: function () {
		var data = this.data
		var el = this.el

		this.setupFadeAnimation()

		el.addEventListener(data.on, () => {
			data.target.emit('sky-color-fade')								// fade out sky color
			setTimeout(() => { 												// wait for fade to complete
				data.target.setAttribute('material', 'color', data.src) 	// set color
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
