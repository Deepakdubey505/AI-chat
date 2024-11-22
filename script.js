const key = "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";
const inputText = document.getElementById("input");
const image  = document.getElementById("image");
const GnBtn  = document.getElementById("btn");
const svg = document.getElementById("svg");
const load = document.getElementById("loading");
const reset = document.getElementById("Reset");
const downloadbtn = document.getElementById("Download");
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob();
    image.style.display="block";
	load.style.display="none";
	return result;
}

async function generate() {
    
load.style.display="block";

query().then((response) => {
	const objectUrl = URL.createObjectURL(response);
    image.src = objectUrl;
	downloadbtn.addEventListener("click" , ()=>{
		download(objectUrl);
	})
});
}

GnBtn.addEventListener("click",()=>{
    generate();
     svg.style.display="none"
})

inputText.addEventListener ("keydown" , (e)=>{
    if(e.key == "Enter")
    {
        generate();
         svg.style.display="none"
		 
    }
	reset.addEventListener("click" , ()=>{
		inputText.value =""
		window.location.reload();
	})
      
	// function download(objectUrl){

	// 	fetch(objectUrl).then(res=>res.blob())
	// 	.then(file=>{
	// 		let a = document.createElement("a");
	// 		a.href = URL.createObjectURL(file);
	// 		a.download = new Date().getTime();
	// 		a.click();
	// 	})
	// 	.catch(()=> alert("failed download"));
	// }


})
function download(objectUrl){

	fetch(objectUrl).then(res=>res.blob())
	.then(file=>{
		let a = document.createElement("a");
		a.href = URL.createObjectURL(file);
		a.download = new Date().getTime();
		a.click();
	})
	.catch(()=> alert("failed download"));
}