const $container =  document.querySelector('.container');

(async ()=>{
	const medidas = ['250x250','500x250','250x500','250x750'];
	for (let i = 0; i< 30; i++){
		let randomNumber =  Math.floor(Math.random() * 4);
		// console.log(randomNumber);
		const res = await fetch(`https://source.unsplash.com/random/${medidas[randomNumber]}`);
		cargar(res.url);
	}
})()

async function cargar(url){
	 async function getMeta(url){   
	    const img = new Image();
	    img.src = url;
	    function getSize(img){
	    	return new Promise((resolve,reject)=>{
		    	img.addEventListener("load", (e)=>{
		    		const data = [img.naturalWidth,img.naturalHeight];
		    		resolve(data);
	    		});
	    	});
	    }

	    const size = await getSize(img)
	    return size;
	}
	function template(url,size){
		console.log(`${size[0]*2} ${size[1]}`);
		if (size[1]>size[0]) {
			if (size[1]>(size[0]*2)){
				return addClassUrl(url,'vertical-l');	
			}else {
				return addClassUrl(url,'vertical');
			}
		}else if (size[1]==size[0]) {
			return addClassUrl(url,'square');
		}else if (size[1]<size[0]) {
			return addClassUrl(url,'horizontal');
		}
	}
	function addClassUrl(url,clase){
		return `<div class="item ${clase}">
			<img src="${url}" alt="">
			</div>`;
	}
	const size = await getMeta(url);
	// console.log(size[0],size[1]);
	$container.innerHTML += template(url,size);
}