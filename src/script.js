import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Objects
 */
//MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

//MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//MeshMatcapMaterial
//for a good visual, and good performance
//need a reference texture that looks like a sphere
//it looks iluminated, but its an illusion created by the texture
//the result is the same regarding the orientation -> we cant update the lights
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

//MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial()

//MeshLambertMaterial
//need light
//most performant material that uses light
//but it's not the most realistic, not convenient
// const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial
const material = new THREE.MeshToonMaterial()
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
material.gradientMap = gradientTexture

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1,1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 30)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




// import * as THREE from 'three'
// import gsap from 'gsap'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'

// /**************Textures****************/
// // const image = new Image()
// // const texture = new THREE.Texture(image)
// // texture.colorSpace = THREE.SRGBColorSpace

// // image.onload = () => {
// //   // const texture = new THREE.Texture(image)
// //   // we need to use the texture in the material
// //   //but the texture variable has been declared in a function and we can't access it outside the function
  
// //   //so we can create the texture outside of the function, and update it once the image is loaded with needUpdate = true
// //   texture.needsUpdate = true

// // }

// // image.src = '/textures/door/color.jpg'

// //we can't use the image directly, we need to convert it to a texture


// /******Texture loader ********/
// //instantiate a variable using TextureLoader class and use its .load(...) method to create a texture


// /******Using the loading manager ******/
// //we can use the loading manager to keep track of the loading process of multiple resources
// //create an instance of the LoadingManager class and pass it to TextureLoader

// const loadingManager = new THREE.LoadingManager()
// //loadingManager has 3 methods : onStart, onProgress, and onLoad, onError
// // loadingManager.onStart = () => {
// //   console.log('onStart');
// // }
// // loadingManager.onLoad = () => {
// //   console.log('onLoad');
// // }
// // loadingManager.onProgress = () => {
// //   console.log('onProgress');
// // }
// // loadingManager.onError = () => {
// //   console.log('onError');
// // }

// const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/minecraft.png')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// colorTexture.colorSpace = THREE.SRGBColorSpace

// //one texture loader can load multiple textures
// //we can send 3 functions after the path :
// //1- load : when the image load successfully
// //2- progress : when the image is loading -> never worked
// //3- error : when the image fail to load

// /******* UV Unwrapping ******/
// //UV unwrapping is the process of creating a 2D representation of a 3D model
// //it's like cutting a 3D object and unfold it to make it flat
// //each vertex will have a UV coordinate, which is a 2D coordinate that tells the texture where to be placed on the 3D model
// //we can see those UV coodinates in geometry.attributes.uv

// //those UV coordinates are generated by Three.js
// //if creating a custom geometry, we need to generate the UV coordinates manually
// //if making geometry using 3D software, we have to do the UV unwrapping


// /******* Transforming Texture ******/
// /**repeat*/
// //we can repeat the texture by using the repeat property
// //its a Vector2 with x and y properties
// // colorTexture.repeat.x = 2
// // colorTexture.repeat.y = 3

// // /**Repeat wrapping */
// // //by default, the texture didnt repeat, and the last picture get stretched, we can change that using THREE.RepeatWrapping on the wrapS and wrapT property
// // colorTexture.wrapS = THREE.MirroredRepeatWrapping
// // colorTexture.wrapT = THREE.MirroredRepeatWrapping
// // //we can alternate the direction of the repeat using THREE.MirroredRepeatWrapping
// // //maybe for a seamless texture

// // /**Offset */
// // //we can offset the texture using the offset property which is a Vector2
// // colorTexture.offset.x = 0.5
// // colorTexture.offset.y = 0.5

// // /**Rotation */
// // //we can rotate the texture using rotation property
// // colorTexture.rotation = Math.PI * 0.25
// // //move the pivot point to the center
// // colorTexture.center.x = 0.5
// // colorTexture.center.y = 0.5

// /**Filtering and MipMapping */
// //MipMapping is a technique to optimize the rendering of a texture
// //it consist of creating half a smaller version of a texture again and again until we get a 1x1 texture
// //all those texture variations are sent to the GPU, and the GPU will use the most appropriate texture depending on the distance of the object to the camera

// //Minification Filter
// //it happens when the pixels of texture are smaller than the pixels of the render.
// //or the texture is too big for the surface it covers
// //we can use the minFilter property to change the minification filter

// colorTexture.generateMipmaps = false
// colorTexture.minFilter = THREE.NearestFilter
// //when using nearestFilter on minFilter, we dont need the mipmaps
// //we can deactivate the mipmaps generation with colorTexture.generateMipmaps = false

// //it makees sharper
// //we can change the magnification filter using magFilter property with those 2 values : THREE.NearestFilter, THREE.LinearFilter
// colorTexture.magFilter = THREE.NearestFilter
// //it makes the texture more pixelated or sharper

// //using nearestfilter is better for performances, will get better framerate



// /*****Texture format and optimisation */
// //when preparing your textures, keep in mind 3 crucial elements : the weight, the size or resolution, the data

// //1- the weight : the size of the file
// //the users will have to download the textures, choose the right type of file
// //jpg - lossy compression but usually lighter
// //png - lossless compression but usually heavier
// //u can use compresssion website like TinyPNG

// //2- the size or resolution
// //each pixels of the texture will have to be stored on the GPU regardless image's weight
// //GPU has storage limitation
// // it's even worse because mipmapping increase the number of pixels to store, so try to reduce the size as much as possible
// //the mipmapping will produce a half smaller version of the texture repeatedly until 1x1
// //because of that, the texture width and height must be a power of 2
// //ex : 512x512, 1024x1024, 512x2048, 4096x4096, etc

// //3- the data
// //Textures support transparency but we cant have transparency in .jpg
// //u can send two jpg with the same name, one with .jpg and the other with .alpha.jpg
// //or use .png
// //it depends on the project, if the project is a game, we need to optimize the texture as much as possible
// //the performance is better with .jpg, but the quality is better with .png
// //if we are using normal texture, we want to have the exact values, we better use .png
// //we can combine different data into one texture by using the RGBA channels separately

// /***************DEBUG UI *********** */
// // //debug UI
// // const gui = new GUI({
// //   width: 340,
// //   title : 'Debug Panel',
// //   closeFolders : true
// // })
// // // gui.close()
// // // gui.hide()
// // window.addEventListener('keydown', (event) => {
// //   if(event.key == 'h') {
// //     gui.show(gui._hidden)
// //   }
// // })
// // const debugObject = {}

// /**GUI Setup */
// //lil-gui is flexible and we can use some parameters, methods, and etc
// //A- width


// //cursor
// //get coordinate from the mouse
// const cursor = {
//   x : 0,
//   y: 0
// }
// window.addEventListener('mousemove', (event) => {
//   //if it's just like this, the coordinate will go too far outside the canvas
//   // console.log(event.clientY);
//   //to make the value from 0 to 1, we can divide it by the width size
//   //add - 0.5 to create a negative and positive num
//   cursor.x = event.clientX / sizes.width - 0.5
//   cursor.y = -(event.clientY / sizes.height - 0.5)
//   //the y axis must be negated because the cursor.y is positive when going down, while the three.js y is positive when going up
// })

// //canvas
// const canvas = document.querySelector('canvas.webgl')

// //scene
// const scene = new THREE.Scene()

// //add debug object
// // debugObject.color = '#3a6ea6'

// /************************************* */
// //geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
// // console.log(geometry.attributes.uv);

// //u can use this method :
// // const positionsArray = new Float32Array(9)
// // //first vertex
// // positionsArray[0] = 0 //x
// // positionsArray[1] = 0 //y
// // positionsArray[2] = 0 //z
// // //second vertex
// // positionsArray[3] = 0
// // positionsArray[4] = 1
// // positionsArray[5] = 0
// // //third vertex
// // positionsArray[6] = 1
// // positionsArray[7] = 0
// // positionsArray[8] = 0

// //or this one
// // const geometry = new THREE.BufferGeometry()
// // const positionsArray = new Float32Array(
// //   [
// //     0, 0, 0, //vertex 1
// //     0, 1, 0, //vertex 2
// //     1, 0, 0  //vertex 3
// //   ]
// // )

// // //we can convert the folat32array to a buffer attribute
// // const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// // // if using x,y,z coordinates so the number after positionsArray is 3
// // //if using uv coordinates, the number after positionsArray is 2

// // //we can add this buffer attribute to the buffer geometry using the setAttribute method

// // geometry.setAttribute('position', positionsAttribute)
// // //why using position? because it's the name that will be used by the shader to get the position of the vertex


// //** */
// // //we can also create a bunch of random triangle 
// // const count  =  500
// // const positionsArray = new Float32Array(count * 3 * 3)
// // //why multiplying by 3 * 3 ? because each triangle are composed by 3 vertices, and each vertex has 3 coordinates

// // //filled the positionsArray with random value
// // for(let i = 0;  i < count * 3 * 3; i++) {
// //   positionsArray[i] = (Math.random() - 0.5) * 5
// // }

// // const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// // geometry.setAttribute('position', positionsAttribute)

// const material = new THREE.MeshBasicMaterial({ 
//   // color: debugObject.color, 
//   // color: '#3a6ea6', 
//   map : colorTexture,
//   // wireframe: true
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// /***************Debug UI***************/
// // /**Folder */
// // //the debug UI can get crowded, we can use folder to organize the tweak
// // //using addFolder()
// // const cubeTweaks = gui.addFolder('Cube Tweaks')
// // // cubeTweaks.close() // to make it default close the tab

// // //different type of control
// // //A- Range : for number with minimum and maximum value
// // //B- color : for color with various format
// // //C - Text : for simple text
// // //D - Checkbox : for boolean value
// // //E - Select : for a choice from a list of value
// // //F- Button : to trigger function


// // //most of the tweaks can be added using gui.add(...), with parameters : the object, and the property of the object

// // /**Range*/
// // //gui.add(mesh.position, 'y', -3, 3, 0.01)
// // //specify the minimum, the maximum, and precision with the next parameter
// // //or u can also write it like this one :
// // cubeTweaks
// //   .add(mesh.position, 'y')
// //   .min(-3)
// //   .max(3)
// //   .step(0.01)
// //   .name('elevation')


// // /**Checkbox*/
// // cubeTweaks.add(mesh, 'visible')

// // cubeTweaks.add(material, 'wireframe')

// // /**Colors */
// // //the color property is not a string, a boolean, or a number, it's an instance of Three.js color class
// // // we need to use addColor(...) instead of add(...)
// // cubeTweaks
// //   .addColor(debugObject, 'color')
// //   .onChange(()=> {
// //     material.color.set(debugObject.color)
// //   })

// // //if we try to take the color value from the tweak, we end up with the wrong colot
// // //THREE.js aply some color menagement in order to optimize the rendering
// // //the color value that is being displayed in the tweal isnt the same value as the one being used internally
// // //so we can retrive the color used internally by THREE.js with the getHexString() method


// // /**dealing with non-modified color only */
// // //we need to save the color somewhere outside three.js
// // //bcs right now, we change it, and use three.js color whic becam an issue bcs the color result is not the same as the one we use
// // //we're going to create an object whose purpose is to hold properties
// // //we can call it global, parameters, debugObject, etc


// // /**button / function */
// // //sometimes we just want to trigger instruction on demand
// // //ex: we want to make the cube perform a spin animation when we click a button

// // //u can add property inside debugObject
// // debugObject.spin = () => {
// //   gsap.to(mesh.rotation, { y : mesh.rotation.y + Math.PI * 2})
// // }
// // cubeTweaks.add(debugObject, 'spin')


// // /********Tweak the geometry */
// // //widthSegments will be used to generate the whole geometry only once
// // //since its not a property, we need to add a subdivision property to the debugObject and apply our tweak on it
// // debugObject.subdivision = 2
// // cubeTweaks
// //   .add(debugObject, 'subdivision')
// //   .min(1)
// //   .max(20)
// //   .step(1)
// //   .onFinishChange(() => {
// //     //building a new geometry using debugObject subdivision and associate it with the mesh by assigning it to the geometry property
// //     mesh,geometry.dispose()
// //     mesh.geometry = new THREE.BoxGeometry(
// //       1, 1, 1,
// //       debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
// //     )
// //     //but the old geometry is still in the memory, we need to destroy it, or it can create memory leak, add .dispose() to the old geometry
// //   })

// // //we named it subdivision so that we can use it on all three widthSegment, heightSegment, and depthSegment
// // //when the tweak value changes, we are going to destroy the old geometry and build a brand-new one
// // //!!building a geometry can be arather lengthy process for the CPU
// // //the change event can be triggered a lot if the user drags and drios the range tweak too much, i'll cause performace issue
// // //so instead of using onChange, we can use onFinishChange




// /***********Geometries************** */

// /**Geometries */
// //composed of vertices (point of coordinates in 3D space) and faces (triangles that connect the vertices)
// //all of the threejs geometries inherit from BufferGeometry
// // by combining all the geometries from BufferGeometry class, we can make complex geometries

// /**Geometry subdivision */
// //have 6 parameters :
// //width, height, depth, widthSegments, heightSegments, depthSegments
// //suvbddivision corresponding to how much triangles shoud compose a face
// //the more segments, the more triangles, the more detailed the geometry
// //ex : 1 = 2 triangle per face
// // 2 = 8 triangle per face

// /**Buffer Geometry */
// //before creating a geometry, we need to understand how to store buffer geometry data
// //using Float32Array -> native JS
// //-typed array
// //-can only store float
// //-fixed length
// //-easiar to handle for computer

// /**Geometry Index */
// //some geometry has faces that share common vertices
// //when creaating a BufferGeometry, we can specify a bunch of vertices and then the indices to create the faces and reuse vertices multiple times
// //this is useful to optimize the memory usage and the performance of the GPU
// //but its hard bcs we have to organize the vertices and the indices manually




// /**POSITIONING
//  * u can put this position anywhere, ngga tergantung sama peletakan selama masih di atas renderer.render
//  */
// // mesh.position.x = 0.7
// // mesh.position.y = -0.6
// // mesh.position.z = 1

// //set method -> to pass each property x,y,z 
// // mesh.position.set(0.7,-0.6,1)

// /**SCALE */
// // mesh.scale.x = 2
// // mesh.scale.y = 0.5
// // mesh.scale.z = 0.5
// // mesh.scale.set(2,0.5,0.5)

// /**ROTATION */
// /**
//  * with rotation or with quaternion
//  * updating one will automatically update the other
//  */
// //A-ROTATION'
// // mesh.rotation.reorder('YXZ')
// // mesh.rotation.x = Math.PI * 0.25
// // mesh.rotation.y = Math.PI * 0.25
// //the value of these axes is expressed in radian
// //hal rotation is something like 3.14.. or use Math.PI
// //be careful when rotate an axis, u might rotate other axis
// //the rotation by default goes in x, y, z order
// //but u can get strange result like an axis not working anymore, it called "gimbal lock"
// //to avoid this u can change the order by using reoder(...) :
//   //object.rotation.reorder('YXZ')
//   //do it before changing the rotation value

// /**QUARTENION */
// //quartenion also express rotation, but in a more mathematical way
// //when u update quartenion it'll update the rotation, and vice versa

// //you can combine transformation(position, rotation, scale) in any order

// /**SCENE GRAPH */
// //you can put object inside groups and use position, rotation, and scale on those
// //so u can move the whole group
// //to do that, use Group class

// /************************************* */

// /***********GROUP************************** */
// // const group = new THREE.Group()
// // group.position.y = 1
// // group.scale.y = 2
// // group.rotation.y = 1
// // //add group to the scene
// // scene.add(group)

// // //create object
// // const cube1 = new THREE.Mesh(
// //   new THREE.BoxGeometry(1, 1, 1),
// //   new THREE.MeshBasicMaterial({ color: 0xff0000 })
// // )
// // //add object to the group
// // group.add(cube1)

// // const cube2 = new THREE.Mesh(
// //   new THREE.BoxGeometry(1, 1, 1),
// //   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// // )
// // cube2.position.x = -2
// // group.add(cube2)

// // const cube3 = new THREE.Mesh(
// //   new THREE.BoxGeometry(1, 1, 1),
// //   new THREE.MeshBasicMaterial({ color: 0x0000ff })
// // )
// // cube3.position.x = 2
// // group.add(cube3)

// /************************************* */


// /**NORMALIZE */
// // mesh.position.normalize()
// // normalize it value -> ngejadiin mesh jadi 1 

// /**AXES HELPER */
// //Axes Helper -> garis axis pembantu
// const axesHelper = new THREE.AxesHelper()
// // scene.add(axesHelper)


// //sizes
// const sizes = {
//   width : window.innerWidth,
//   height : window.innerHeight
// }

// window.addEventListener('resize', () => {
//   //update sizes
//   sizes.width = window.innerWidth
//   sizes.height = window.innerHeight

//   //update camera
//   camera.aspect = sizes.width / sizes.height
//   camera.updateProjectionMatrix()

//   //update renderer
//   renderer.setSize(sizes.width, sizes.height)

//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// //fullscreen
// window.addEventListener('dblclick', () => {
//   //this won't work on safari
//   // if(!document.fullscreenElement) {
//   //   canvas.requestFullscreen()
//   // } else {
//   //   document.exitFullscreen()
//   // }

//   //u need to do this instead if want to accomodate safari
//   const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement
//   if(!fullscreenElement) {
//     if(canvas.requestFullscreen) {
//       canvas.requestFullscreen()
//     } else if(canvas.webkitRequestFullScreen) {
//       canvas.webkitRequestFullScreen()
//     }
//   } else {
//     if(document.exitFullscreen) {
//       document.exitFullscreen()
//     } else if(document.webkitExitFullScreen) {
//       document.webkitExitFullScreen()
//     }
//   }
// })


// //camera
// //75 is field of view, like the one in camera, the normal field of view is around 35, the higher the number, the smaller the field of view, the smaller the number, the wider field of view
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// // const aspectRatio = sizes.width / sizes.height
// // const camera = new THREE.OrthographicCamera(
// //   -1 *aspectRatio, 
// //   1*aspectRatio, 
// //   1, 
// //   -1, 
// //   0.1, 
// //   100)
// // camera.position.x = 2
// // camera.position.y = 2
// camera.position.z = 3
// camera.lookAt(mesh.position)
// scene.add(camera)
// //add camera to scene is optional, but if you dont, it might result in a bug in some situation, better add

// //Controls
// const controls = new OrbitControls(camera, canvas)
// //canvas is the dom element where the renderer is rendering, where the mouse event is happening
// //Target
// //by default, the camera is looking at the center of the scene, we can change the target by using the target property
// // controls.target.y = 2
// // controls.update()

// /**Damping */
// //the damping will smooth the animation by adding some kind of acceleration and friction
// // to enable damping, swith the property enableDamping to true
// controls.enableDamping =  true


// /************************************* */
// /**Cameras */
// //camera is an abstract class
// //you're not supposed to use it directly
// //A- Array Camera
// //it render the scene from multiple cameras on specific areas of the render

// //B-Stereo Camera
// //render the scene from two cameras, one for each eye, for VR

// //C-Cube Camera
// //do 6 renders, each one for each face of a cube, for reflection mapping
// //can render the surrounding for things like environment mapping, reflection, or shadow map

// //D-Orthographic Camera
// //render the scene without perspective
// //it's like a camera that has no depth, it's like a 2D camera
// //instead of FoV, we provide how far the camera can see in each direction(left, right, top, bottom, near, far)

// //E-Perspective Camera
// //render the scene with perspective
// //have 3 parameters : field of view, aspect ratio, and near and far clipping plane
// //a- field of view is how wide the camera can see

// //b- aspect ratio is the width of the render divided by the height of the render

// //c, d- near and far clipping plane is the distance from the camera where the render starts and ends
// //anything closer than the near clipping plane, or further than the far clipping plane will not be rendered
// // do not use extremely value like 0.001 or 1000000, it'll result in a bug(z-fighting)

// /**Custom coordinate */
// //di atas sendiri setelah import

// /**LookAt */
// //Object33D instance has a method called lookAt, it'll make the object look at a certain position
// //the target must be a vector3
// // camera.lookAt(mesh.position)


// //renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// //always do this, so when the user's device has higher pixel ratio, it will be max 2 pixel ratio, if not, it'll have performance issue with higher pixel ratio

// // renderer.render(scene, camera)

// /**
//  * at first, it was all pitch black, why?
//  * because at start, the object, and the camera are put on position 0,0,0
//  * while the object has a volume of 1,1,1 ; the camera placed on 0,0,0. 
//  * so basically at start, the camera is inside the object, we need to move the object or move the camera, so that we can see the whole object 
//  * 
//  * we can transform object using 'position', 'rotation', and 'scale'
//  * 
//  * camera is an object, so we can use the above property
//  * 
//  * position has three poperties : x, y, z
//  */


// /************************************* */
// /**Animation */
// //animating is like doing stop motion 
// //move the object, take a picture, move the object, take a picture, and so on
// //most scene run at 60FPS(frame per second)
// //we need to update object and do render on each frame
// //can be don in a function, and call the function with window.requestAnimationFrame(...)
// //the purpose of requestAnimationFrame is to call the function on the next frame
// //jadi misal buat function, di dalam function itu kita manggil requestAnimationFrame


// /**Using Time */
// //time
// // let time = Date.now()

// // const tick = () => {
// //   //time
// //   const currentTime = Date.now()
// //   //to get the current timestamp in milisecond
// //   const deltaTime = currentTime - time
// //   time = currentTime
// //   //why using delta time ?
// //   //so that our animation is frame rate independent 
// //   //if we use time, the animation will be faster on a faster computer, and slower on a slower computer
  
// //   //update object
// //   mesh.rotation.y += 0.002 * deltaTime

// //   //render
// //   renderer.render(scene, camera)

// //   window.requestAnimationFrame(tick)

// //   //konsepnya animation di sini adalah: gerakin object -> render -> panggil function ulang ->gerakin object
// // }

// // tick()

// /**Using Clock */
// // //clock is a built in class in three.js
// // //it's used to keep track of time
// // //it's more accurate than using Date.now()
// // //instantiating clock and use its getElapsedTime() method

// // //Clock
// // const clock = new THREE.Clock()
// // const tick = () => {
// //   const elapsedTime = clock.getElapsedTime()
// //   //elapsedTime is the time that has passed since the clock was created
// //   //it's in seconds, not in milisecond

// //   //update object
// //   camera.position.x = Math.sin(elapsedTime)
// //   camera.position.y = Math.cos(elapsedTime)
// //   camera.lookAt(mesh.position)
// //   //not incrementing it, but setting it to the elapsedTime
// //   //pake sin x akan naik turun, sesuai graphic sin 
// //   //bisa move camera juga, ngga cuma objectnya


// //   //render
// //   renderer.render(scene, camera)

// //   window.requestAnimationFrame(tick)

// // }

// // tick()


// /**Using Library */
// // //why using a library?
// // //if u want to have more control, like create tweens, or more complex animation, u can use a library like GSAP

// // // console.log(gsap);

// // gsap.to(mesh.position, {duration: 1, delay: 1, x : 2})
// // gsap.to(mesh.position, {duration: 1, delay: 2, x : 0})

// // //greensock has it's own tick, so the library doing requestAnimationFrame for us
// // //but we still need to render it by ourselves

// // const tick = () => {
 
// //   //render
// //   renderer.render(scene, camera)

// //   window.requestAnimationFrame(tick)

// // }

// // tick()


// const clock = new THREE.Clock()
// const tick = () => {
//   const elapsedTime = clock.getElapsedTime()

//   //// Update objects
//   // mesh.rotation.y = elapsedTime;

//   // //update camera for mouse movement
//   // //for a 360 degree rotation, we can use sin and cos
//   // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
//   // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
//   // camera.position.y = cursor.y * 5

//   //increase the amplitude by multipying the cursor.x and cursor.y
//   //ask the camera to look at the mesh position
  
//   // camera.lookAt(mesh.position)

//   //three.js has multiple classes called controls to help us control the camera :
//   //1 - DeviceOrientationControls
//   //will automatically retrive the device orientation and move the camera accordingly
//   //useful to create immersive universe or VR experience

//   //2- FlyControls
//   //enable to moving the camera like if u were on a spaceship
//   //u can rotate on all 33 axes, go forward, and backward

//   //3- FirstPersonControls
//   //like flycontrol, but can't go up or down

//   //4- PointerLockControls
//   //lock the mouse to the canvas, and move the camera like in a first person game
//   //uses the pointer lock javascript API
//   //hard to use and almost only handle the pointer lock, and camera rotation, not the movement
//   //if want to added the movement, need to do it manually using the keyboard event

//   //5- OrbitControls
//   //enable to orbit around a target

//   //6- TrackballControls
//   //like orbit controls, but without the vertical angle limitation

//   //7- TransformControls
//   //has nothing to do with camera
//   //it's a tool to move, rotate, and scale objects in the scene

//   //8- DragControls
//   //has nothing to do with camera
//   //it's a tool to drag objects in the scene

//   // Render
  
//   //orbitcontrol class cannot be access with just 'OrbitControls', we need to import it from the library

//   //update controls
//   controls.update()
//   //if u're using the damping, dont forget to update the controls on each frame just like this

//   renderer.render(scene, camera)

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick)
// }

// tick()


// /***********Textures*****************/

// /**Color texture / albedo */
// //most simple one
// //appliend on geometry

// /**Alpha */
// //grayscale image
// //white visible, black not visible

// /**Height / displacement */
// //grayscale image
// //move the vertices to create some relief
// //move up or down the vertices
// //need enough subdivision

// /**Normal */
// //add details, mostly about lighting
// //doesnt need subdivision
// //the vertices wont move
// //lure the light about the face orientation
// //better performance than adding a height texture with a lot of subdivision

// /**Ambient Occlusion */
// //grayscale image
// //add fake shadows in crevices
// //not physically accurate
// //helps create contrast and see details

// /**Metalness */
// //grayscale image
// //white is metal, black is not
// //mostly for reflection

// /**Roughness */
// //grayscale image
// //in duo with metalness
// //white is rough, black is smooth
// //mostly for light dissipation

// //all of those textures follow PBR(Physically Based Rendering) rules
// //many technics that tend to follow real-life directions to get realistic result
// //becoming the standard for realistic rendering
// //many software, enginers and libraries are using PBR


// //to load texture we need the url of the image file

