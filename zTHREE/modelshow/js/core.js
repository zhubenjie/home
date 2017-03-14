(function(){
	// 本来应该用 mrdoob写的 control
			var camera, scene, renderer;
			var mouseX = 0, mouseY = 0;
			var pcFlag=false;
			var pceX,pceY,contRotX,contRotY;
			wiW=window.innerWidth
			wiH=window.innerHeight-3
			init();
			animate();
			function init() {
				
				var divcanvas=document.querySelector('.canvas')
				var loaddd=document.querySelector('.loaddd')
				 console.log(divcanvas)
				// render
				renderer = new THREE.WebGLRenderer({antialias :true});
				renderer.setClearColor('#333',0.5)
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( wiW,wiH );
				divcanvas.appendChild( renderer.domElement );
				// camera
				camera = new THREE.PerspectiveCamera( 45, wiW/wiH, 1, 3000 );
				// scene
				scene = new THREE.Scene();

				// light  一个环境光 一个方向光
				var ambient = new THREE.AmbientLight( 'white',2 );
				scene.add( ambient );
				var	directionalLight = new THREE.DirectionalLight( 'white' ,0);
				directionalLight.position.set( 0, 0, 1 ).normalize();
				// scene.add( directionalLight );
				var onProgress = function ( xhr ) {
					if ( xhr.lengthComputable ) {
						var percentComplete = xhr.loaded / xhr.total * 100;
						loaddd.style.width=percentComplete+'%'
					}
				};

				var t=new THREE.Texture(canvasBg())
				t.needsUpdate=true
				var bg=new THREE.Mesh(new THREE.PlaneGeometry(666,666),new THREE.MeshBasicMaterial({map:t}))
				scene.add(bg)
				bg.position.z=-300

				var mtlLoader = new THREE.MTLLoader();
				// mtlLoader.setPath( 'obj/male02/' );
				 zbj=new THREE.Object3D()
				// var mtl = $("#mtl").val();
				// var obj = $("#obj").val();
				mtlLoader.load( 'obj/fo/fo.mtl', function( materials ) {
					materials.preload();
					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials );
					// objLoader.setPath( 'obj/male02/' );
					objLoader.load( 'obj/fo/fo.obj', function ( object ) {
						zbj.add(object)
						scene.add(zbj)
						zbj.scale.set(2,2,2)
						document.querySelector('.logo').style.display='none'
					}, onProgress );
				});

				 
				camera.position.z = 350;

// ==================================event=========================================
				window.addEventListener( 'resize', onWindowResize,false );
				divcanvas.addEventListener('mousedown',pcMouseDown,false);
				divcanvas.addEventListener('mousemove',pcMouseMove,false);
				divcanvas.addEventListener('mouseup',pcMouseUp,false);
				divcanvas.addEventListener('mousewheel',mouseWheel,false)
				divcanvas.addEventListener('DOMMouseScroll',mouseWheel,false)
				divcanvas.addEventListener('touchend',mobiUp,false)
				divcanvas.addEventListener('touchstart',mobiDown,false)
				divcanvas.addEventListener('touchmove',mobiMove,false)
			}
			// init over
			
			function onWindowResize() {
			wiW=window.innerWidth
			wiH=window.innerHeight-3
				camera.aspect = wiW / wiH;
				camera.updateProjectionMatrix();
				renderer.setSize( wiW, wiH );
			}
		
			function animate() {
				requestAnimationFrame( animate );
				render();
			}

			function render() {
				renderer.render( scene, camera );
			}
			
			//control
			function pcMouseDown(e){
				contRotX=zbj.rotation.y
				contRotY=zbj.rotation.x
				pceX=e.clientX
				pceY=e.clientY
				pcFlag=true;
			}
			function pcMouseMove(e){
				if(pcFlag){
						 zbj.rotation.y=contRotX+(e.clientX-pceX)/200;
						 zbj.rotation.x=contRotY+(e.clientY-pceY)/200;
				}
			}
			function pcMouseUp(e){
				contRotX=zbj.rotation.y
				contRotY=zbj.rotation.x
				pcFlag=false
			}
			
			// 下面为什么阻止冒泡默认很难解释为了安卓微信端 。。
			function mobiDown(e){
				
				switch ( e.touches.length ) {
						 case 1:
						e.preventDefault()
						e.stopPropagation()
						contRotX=zbj.rotation.y
						contRotY=zbj.rotation.x
						mobX=e.touches[0].clientX
						mobY=e.touches[0].clientY
						 break;
						 case 2:
						 	 e.preventDefault()
							 e.stopPropagation()
					var dx = e.touches[ 0 ].clientX - e.touches[ 1 ].clientX;
				    var dy = e.touches[ 0 ].clientY - e.touches[ 1 ].clientY;
				    cc = Math.sqrt( dx * dx + dy * dy )
				    a1=zbj.scale.x
						 break;
						 }
			}

			function mobiMove(e){

						 switch ( e.touches.length ) {
						 case 1:
						 e.preventDefault()
				e.stopPropagation();
						 zbj.rotation.y=contRotX+(e.touches[0].clientX-mobX)/160
						 zbj.rotation.x=contRotY+(e.touches[0].clientY-mobY)/160
						 break;

					case 2:
					e.preventDefault()
				e.stopPropagation();
						var dx = e.touches[ 0 ].clientX - e.touches[ 1 ].clientX;
						var dy = e.touches[ 0 ].clientY - e.touches[ 1 ].clientY;
						_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy )

						yyy=_touchZoomDistanceEnd-cc
						zbj.scale.x=zbj.scale.y=zbj.scale.z=a1+(_touchZoomDistanceEnd-cc)/260
					
						break;

				}
					
			}
			function mobiUp(e){
				// 这里只是为了双手滑动放大 缩小
				 if(e.touches.length>0){
				 	mobX=e.touches[0].clientX
					mobY=e.touches[0].clientY
					e.preventDefault()
					e.stopPropagation()
				 }


					
			}

			function mouseWheel(e){
				e.preventDefault()
					 if(e.wheelDelta ){
					 	if(e.wheelDelta>0 && camera.position.z>251){
					 		camera.position.z-=e.wheelDelta/12
					 	}
					 	else if(e.wheelDelta<0 && camera.position.z<601){ 
					 		camera.position.z-=e.wheelDelta/12
					 	}
					 } 
					 if(e.detail ){
					 	if(e.detail>0 && camera.position.z<601){//firefox
					 		camera.position.z+=e.detail*3
					 	}
					 	else if(e.detail<0 && camera.position.z>251){ 
					 		camera.position.z+=e.detail*3
					 	}
					 } 
			}

			function canvasBg(){
				var c=document.createElement('canvas')
				c.width=512
				c.height=512
				var ctx=c.getContext("2d");
				var grd=ctx.createRadialGradient(256,256,0,256,256,200);
				grd.addColorStop(0,"rgb(90,90,90)");
				grd.addColorStop(1,"rgb(26,26,26)");

				// Fill with gradient
				ctx.fillStyle=grd;
				ctx.fillRect(0,0,512,512);
				return c
			}
			
})()
// www.zhubenjie.com