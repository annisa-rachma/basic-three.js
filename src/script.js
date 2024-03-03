import * as THREE from 'three'
import './style.css'
import gsap from 'gsap'
//canvas
const canvas = document.querySelector('canvas.webgl')

//scene
const scene = new THREE.Scene()

/************************************* */
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

/***********GROUP************************** */
// const group = new THREE.Group()
// group.position.y = 1
// group.scale.y = 2
// group.rotation.y = 1
// //add group to the scene
// scene.add(group)

// //create object
// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// //add object to the group
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// )
// cube2.position.x = -2
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 0x0000ff })
// )
// cube3.position.x = 2
// group.add(cube3)

/************************************* */


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
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
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

// renderer.render(scene, camera)

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


/************************************* */
/**Animation */
//animating is like doing stop motion 
//move the object, take a picture, move the object, take a picture, and so on
//most scene run at 60FPS(frame per second)
//we need to update object and do render on each frame
//can be don in a function, and call the function with window.requestAnimationFrame(...)
//the purpose of requestAnimationFrame is to call the function on the next frame
//jadi misal buat function, di dalam function itu kita manggil requestAnimationFrame


/**Using Time */
//time
// let time = Date.now()

// const tick = () => {
//   //time
//   const currentTime = Date.now()
//   //to get the current timestamp in milisecond
//   const deltaTime = currentTime - time
//   time = currentTime
//   //why using delta time ?
//   //so that our animation is frame rate independent 
//   //if we use time, the animation will be faster on a faster computer, and slower on a slower computer
  
//   //update object
//   mesh.rotation.y += 0.002 * deltaTime

//   //render
//   renderer.render(scene, camera)

//   window.requestAnimationFrame(tick)

//   //konsepnya animation di sini adalah: gerakin object -> render -> panggil function ulang ->gerakin object
// }

// tick()

/**Using Clock */
// //clock is a built in class in three.js
// //it's used to keep track of time
// //it's more accurate than using Date.now()
// //instantiating clock and use its getElapsedTime() method

// //Clock
// const clock = new THREE.Clock()
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime()
//   //elapsedTime is the time that has passed since the clock was created
//   //it's in seconds, not in milisecond

//   //update object
//   camera.position.x = Math.sin(elapsedTime)
//   camera.position.y = Math.cos(elapsedTime)
//   camera.lookAt(mesh.position)
//   //not incrementing it, but setting it to the elapsedTime
//   //pake sin x akan naik turun, sesuai graphic sin 
//   //bisa move camera juga, ngga cuma objectnya


//   //render
//   renderer.render(scene, camera)

//   window.requestAnimationFrame(tick)

// }

// tick()


/**Using Library */
// //why using a library?
// //if u want to have more control, like create tweens, or more complex animation, u can use a library like GSAP

// // console.log(gsap);

// gsap.to(mesh.position, {duration: 1, delay: 1, x : 2})
// gsap.to(mesh.position, {duration: 1, delay: 2, x : 0})

// //greensock has it's own tick, so the library doing requestAnimationFrame for us
// //but we still need to render it by ourselves

// const tick = () => {
 
//   //render
//   renderer.render(scene, camera)

//   window.requestAnimationFrame(tick)

// }

// tick()



/************************************* */
/**Cameras */
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  mesh.rotation.y = elapsedTime;

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
