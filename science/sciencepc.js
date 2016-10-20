var container;
var camera, scene, renderer,controls;
var loader2;
var famele;

window.onload=function(){

    init();
    animate();
    function init() {
        //====================相机及其设置============================================================================================================
        container = document.getElementById( "container" );
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.z = 400;
        camera.position.y = 50;
        controls = new THREE.OrbitControls( camera );
        controls.addEventListener( 'change',  controls.update() );
        //controls.minDistance =50;   //控制缩放最近距离的
        //controls.maxDistance =200;  //控制缩放最远距离的
        //====================场景============================================================================================================
        scene = new THREE.Scene();
        //====================光线及其设置============================================================================================================
        var ambient = new THREE.AmbientLight( 0xdddddd );
        ambient.position.set(200, 100,-1000);
        scene.add( ambient );

        var directionalLight = new THREE.DirectionalLight( 0xffeedd );
        directionalLight.position.set( 1, 0, 0 ).normalize();
        scene.add( directionalLight );

        var PointLight=new THREE.PointLight(0xFFFFFF);
        PointLight.position.set(1500, 1500,1500);
        scene.add(PointLight);

        //====================自绘画及其设置============================================================================================================
        //var geometry = new THREE.BoxGeometry(60, 100, 0.1, 1, 2, 3);
        //var crateTexture = new THREE.ImageUtils.loadTexture("resource/model/room3/female clothes01.png");
        //var material = new THREE.MeshBasicMaterial({map: crateTexture,transparent:true});
        //var cube = new THREE.Mesh(geometry, material);
        //     cube.position.x=51;
        //     cube.position.y=-11;
        //     cube.position.z=-171;
        //     cube.rotation.y=0.6;
        //      scene.add(cube);

        //====================房子模型加载============================================================================================================
        var onProgress1 = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded1' );
            }
        };
        var onError1 = function ( xhr ) { };

        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
        var loader1 = new THREE.OBJMTLLoader();
        loader1.load( 'resource/model/room4/room.obj', 'resource/model/room4/room.mtl', function ( object ) {
            object.position.y = - 120;
            scene.add( object );
        }, onProgress1, onError1 );
        ////====================身体模型============================================================================================================
        //var onProgress2 = function ( xhr ) {
        //    if ( xhr.lengthComputable ) {
        //        var percentComplete = xhr.loaded / xhr.total * 100;
        //        console.log( Math.round(percentComplete, 2) + '% downloaded2' );
        //    }
        //};
        //var onError2 = function ( xhr ) { };
        //loader2 = new THREE.OBJMTLLoader();
        //loader2.load( 'resource/modeldepart/body/body01.obj', 'resource/modeldepart/body/body01.mtl', function ( object ) {
        //    object.position.y = - 120;
        //    famele=object;
        //    scene.add( famele );
        //    //scene.add( object );
        //}, onProgress2, onError2 );
        //////====================衣服模型===================================================================================================
        //var onProgress3 = function ( xhr ) {
        //        if ( xhr.lengthComputable ) {
        //            var percentComplete = xhr.loaded / xhr.total * 100;
        //            console.log( Math.round(percentComplete, 2) + '% downloaded3' );
        //        }
        //    };
        //var onError3 = function ( xhr ) { };
        //    loader2 = new THREE.OBJMTLLoader();
        //    loader2.load( 'resource/modeldepart/clothes/clothes01_1.obj', 'resource/modeldepart/clothes/clothes01_1.mtl', function ( object ) {
        //        object.position.y = - 120;
        //        famele=object;
        //        scene.add( famele );
        //    }, onProgress3, onError3 );
        //====================衣柜里挂起的模型===================================================================================================
        var onProgress4 = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded4' );
            }
        };
        var onError4 = function ( xhr ) { };
             loader3 = new THREE.OBJMTLLoader();
             loader3.load( 'resource/model/boxclothes/boxclothes.obj', 'resource/model/boxclothes/boxclothes.mtl', function ( object ) {
                 object.position.y = - 120;
                 //object.material.transparent=true;
                 scene.add( object );
                }, onProgress4, onError4 );



        //====================渲染器及其设置===================================================================================================
        renderer=new THREE.WebGLRenderer({
            antialias:true,       //是否开启反锯齿
            precision:"highp",    //着色精度选择
            //alpha:true,           //是否可以设置背景色透明
            transparent:true,
            //depthWrite:false,
            premultipliedAlpha:false,
            stencil:false,
            preserveDrawingBuffer:true, //是否保存绘图缓冲
            maxLights:5          //maxLights:最大灯光数
        });
       
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth-100 ,window.innerHeight );
        container.appendChild( renderer.domElement );
        //
        window.addEventListener( 'resize', onWindowResize, false );
    }
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( 1000, 600);
        controls.handleResize();
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    function render() {
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
    }

};


function aa(){
        roo=setInterval(function(){
            famele.rotation.y+=0.01;
        }, 10);
}
