import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from "three"
import Camera from "./Camera"

export default class Experience {
   canvas: HTMLCanvasElement
   sizes: Sizes
   time: Time
   scene: THREE.Scene
   camera: Camera

   constructor(canvas:HTMLCanvasElement){
      this.canvas = canvas
      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.camera = new Camera(this)
   }
}