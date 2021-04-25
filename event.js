AFRAME.registerComponent('soundControl', {
		init: function () {
			var marker = this.el;
			var entity = document.querySelector('[sound]');
			entity.components.sound.stopSound();
			marker.addEventListener('markerFound', function() {
				var markerId = marker.id;
				console.log('markerFound', markerId);
				entity.components.sound.playSound();
				// TODO: Add your own code here to react to the marker being found.
			});

			marker.addEventListener('markerLost', function() {
				var markerId = marker.id;
				console.log('markerLost', markerId);
				entity.components.sound.pauseSound();
				// TODO: Add your own code here to react to the marker being lost.
			});
		}
	});

AFRAME.registerComponent('selector', {
	init: function(){
		let el = this.el;
		let self = this;
		self.trees = [];              
		el.addEventListener("model-loaded", e =>{
			let tree3D = el.getObject3D('mesh');
			if (!tree3D){return;}    
		  //console.log('tree3D', tree3D);
			tree3D.traverse(function(node){
				if (node.isMesh){   
				  console.log(node);
				  self.trees.push(node);                          
				  //node.material = new THREE.MeshStandardMaterial({color: 0x33aa00});
				}
			});
	  });
	  
	  el.addEventListener('raycaster-intersected', e =>{  
		self.raycaster = e.detail.el;
		let intersection = self.raycaster.components.raycaster.getIntersection(el);
		  console.log('click', intersection.object.name, self.mouseOverObject, 
					intersection.object.name != self.mouseOverObject );  
		if (self.mouseOverObject != intersection.object.name){
		  intersection.object.material.emissive = new THREE.Color(0xFFFF00);
		  intersection.object.material.emissiveIntensity = 0.5; 
		} else {
		   intersection.object.material.emissive = new THREE.Color(0x000000);
		  intersection.object.material.emissiveIntensity = 0.0; 
		}                  
		  self.mouseOverObject = intersection.object.name;
	  });
	  
	   el.addEventListener('raycaster-intersected-cleared', e =>{  
		self.trees.forEach(function(tree){
		   tree.material.emissive = new THREE.Color(0x000000);
		  tree.material.emissiveIntensity = 0.0; 
		});    
		  self.mouseOverObject = null;
	  });
	  
	  el.addEventListener('click', function(){
		console.log(self.mouseOverObject);
		if(self.mouseOverObject === "defaultMaterial"){
		  //console.log('link');
		  let url = 'https://www.reebok.es/instapump_fury';
		  let win = window.open(url, '_blank');
		  win.focus();
		}
		if(self.mouseOverObject === "Mutek001"){
		  //console.log('link');
		  let url = 'https://virtual.mutek.org/en/mutek';
		  let win = window.open(url, '_blank');
		  win.focus();
		}
		if(self.mouseOverObject === "IED"){
		  //console.log('link');
		  let url = 'https://www.sivasdescalzo.com/acg-platform/';
		  let win = window.open(url, '_blank');
		  win.focus();
		}
	  });
	}
});
