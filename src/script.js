import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

//geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**POSITIONING
 * u can put this position anywhere, ngga tergantung sama peletakan selama masih di atas renderer.render
 */
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

//set method -> to pass each property x,y,z 
mesh.position.set(0.7,-0.6,1)

/**SCALE */
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2,0.5,0.5)

/**NORMALIZE */
// mesh.position.normalize()
// normalize it value -> ngejadiin mesh jadi 1 

/**AXES HELPER */
//Axes Helper -> garis axis pembantu
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)


//sizes
const sizes = {
  width : 800,
  height : 600
}

//camera
//75 is field of view, like the one in camera, the normal field of view is around 35, the higher the number, the smaller the field of view, the smaller the number, the wider field of view
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
//add camera to scene is optional, but if you dont, it might result in a bug in some situation, better add


//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
/**
 * at first, it was all pitch black, why?
 * because at start, the object, and the camera are put on position 0,0,0
 * while the object has a volume of 1,1,1 ; the camera placed on 0,0,0. 
 * so basically at start, the camera is inside the object, we need to move the object or move the camera, so that we can see the whole object 
 * 
 * we can transform object using 'position', 'rotation', and 'scale'
 * 
 * camera is an object, so we can use the above property
 * 
 * position has three poperties : x, y, z
 */

