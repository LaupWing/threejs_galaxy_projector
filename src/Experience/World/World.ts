import Experience from "../Experience"
import * as THREE from "three"

export default class World {
   experience: Experience
   scene: THREE.Scene

   constructor(experience: Experience){
      this.experience = experience
      this.scene = experience.scene

      const testCube = new THREE.Mesh(
         new THREE.BoxGeometry(1, 1),
         new THREE.MeshBasicMaterial({color: "orange"})
      )
      console.log(this.scene)
      this.scene.add(testCube)
   }
}