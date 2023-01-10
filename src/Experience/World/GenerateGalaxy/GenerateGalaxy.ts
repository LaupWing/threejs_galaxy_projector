import * as THREE from "three"
import Experience from "../../Experience"

export default class GenerateGalaxy {
   geometry: THREE.BufferGeometry
   scene: THREE.Scene

   constructor(amount:number, experience: Experience){
      this.geometry = new THREE.BufferGeometry()
      this.scene = experience.scene
      const positions = new Float32Array(amount * 3)
      
      const array = [...Array(amount)]
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