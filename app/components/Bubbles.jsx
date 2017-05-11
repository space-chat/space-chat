import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class Bubbles extends Component {
    constructor() {
        super()

        this.scene = new THREE.Scene()
        // this.textureCube = new THREE.CubeTextureLoader()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ antialias: false })
        this.geometry = new THREE.SphereBufferGeometry(0.1, 32, 16)
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.state = {
            spheres: [],
            mouseX: 0,
            mouseY: 0,
        }
    }

    makeSpheres() {
        for (var i = 0; i < 500; i++) {
            this.mesh.position.x = Math.random() * 10 - 5;
            this.mesh.position.y = Math.random() * 10 - 5;
            this.mesh.position.z = Math.random() * 10 - 5;
            this.mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
            this.scene.add(mesh);
            this.spheres.push(mesh);
        }
    }

    init() {
        document.body.appendChild(renderer.domElement)
        this.camera.position.z = 5;
        this.camera.focalLength = 3;
        // this.textureCube.load(urls)
        // this.scene.background = textureCube
    }

    render() {
        return (
            <div>hello</div>
        )
    }


}