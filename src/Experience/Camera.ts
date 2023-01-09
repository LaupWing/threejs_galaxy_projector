import Experience from "./Experience"
import Sizes from "./Utils/Sizes"
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
   experience: Experience
   sizes: Sizes
   canvas: HTMLCanvasElement
   scene: THREE.Scene
   instance?: THREE.PerspectiveCamera
   controls?: OrbitControls

   constructor(experience:Experience){
      this.experience = experience
      this.sizes = this.experience.sizes
      this.canvas = this.experience.canvas
      this.scene = this.experience.scene
      this.setInstance()
      this.setOrbitControls()
   }

   setInstance(){
      this.instance = new THREE.PerspectiveCamera(
         35,
         this.sizes.width / this.sizes.height,
         0.2,
         100
      )
      this.instance.position.set(10, 10, 20)
      this.scene.add(this.instance)
   }

   setOrbitControls(){
      this.controls = new OrbitControls(this.instance!, this.canvas)
      // this.controls.enabled = false
      this.controls.enableDamping = false
   }
   resize(){
      this.instance!.aspect = this.sizes.width / this.sizes.height
      this.instance!.updateProjectionMatrix()
   }

   update(){
      this.controls?.update()
   }
}