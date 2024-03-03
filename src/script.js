import * as THREE from 'three'

//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

/************************************* */
//geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**POSITIONING
 * u can put this position anywhere, ngga tergantung sama peletakan selama masih di atas renderer.render
 */
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

//set method -> to pass each property x,y,z 
// mesh.position.set(0.7,-0.6,1)

/**SCALE */
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// mesh.scale.set(2,0.5,0.5)

/**ROTATION */
/**
 * with rotation or with quaternion
 * updating one will automatically update the other
 */
//A-ROTATION'
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
//the value of these axes is expressed in radian
//hal rotation is something like 3.14.. or use Math.PI
//be careful when rotate an axis, u might rotate other axis
//the rotation by default goes in x, y, z order
//but u can get strange result like an axis not working anymore, it called "gimbal lock"
//to avoid this u can change the order by using reoder(...) :
  //object.rotation.reorder('YXZ')
  //do it before changing the rotation value

/**QUARTENION */
//quartenion also express rotation, but in a more mathematical way
//when u update quartenion it'll update the rotation, and vice versa

//you can combine transformation(position, rotation, scale) in any order

/**SCENE GRAPH */
//you can put object inside groups and use position, rotation, and scale on those
//so u can move the whole group
//to do that, use Group class

/************************************* */


const group = new THREE.Group()
scene.add(group)



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


/**LookAt */
//Object33D instance has a method called lookAt, it'll make the object look at a certain position
//the target must be a vector3
// camera.lookAt(mesh.position)


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

