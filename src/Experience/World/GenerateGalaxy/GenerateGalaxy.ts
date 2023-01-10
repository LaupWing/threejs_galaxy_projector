import * as THREE from "three"
import Experience from "../../Experience"
import Debug from "../../Utils/Debug"

export default class GenerateGalaxy {
   amount: number
   geometry: THREE.BufferGeometry
   scene: THREE.Scene
   debug: Debug

   constructor(amount:number, experience: Experience){
      this.amount = amount
      this.geometry = new THREE.BufferGeometry()
      this.scene = experience.scene
      this.debug = experience.debug
      this.setDebug()
   }

   setDebug(){

   }

   initialize(){
      const positions = new Float32Array(this.amount * 3)
      
      const array = [...Array(this.amount)]
      array.forEach((_, i:number) => {
         const i3 = i * 3

         positions[i3]     = (Math.random() - 0.5) * 3
         positions[i3 + 1] = (Math.random() - 0.5) * 3
         positions[i3 + 2] = (Math.random() - 0.5) * 3
      })

      this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({
         size: 0.02,
         sizeAttenuation: true,
         depthWrite: false,
         blending: THREE.AdditiveBlending
      })
      const points = new THREE.Points(this.geometry, material)
      this.scene.add(points)
   }
}