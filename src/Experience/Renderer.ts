import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import * as THREE from "three"
import Camera from "./Camera"

export default class Renderer {
   experience: Experience
   canvas: HTMLCanvasElement
   sizes: Sizes
   scene: THREE.Scene
   camera: Camera
   instance?: THREE.WebGLRenderer

   constructor(experience: Experience){
      this.experience = experience
      this.canvas = this.experience.canvas
      this.sizes = this.experience.sizes
      this.scene = this.experience.scene
      this.camera = this.experience.camera
      this.instance = new THREE.WebGLRenderer({
         canvas: this.canvas,
         antialias: true
      })
      this.instance.setClearColor("purple")
      this.instance?.setSize(this.sizes.width, this.sizes.height)
      this.instance?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   
   }

   resize(){
      this.instance?.setSize(this.sizes.width, this.sizes.height)
      this.instance?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   }

   update(){
      this.instance?.render(this.scene, this.camera.instance!)
   }
}
