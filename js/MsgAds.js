const msgAdsContainer = document.getElementById("ads");

const showAdBtn = document.getElementById("show-ad-btn");

const adsUI = [];

const adTitleMaxLetters = 32;

const testAds = [
	{image: "imgs/ad1.jpg", title: "Do you love babies?", url: "https://ad1"},
	{image: "imgs/ad2.jpg", title: "Learn graphic design now!", url: "https://ad2"},
	{image: "imgs/ad3.jpg", title: "How to make moroccan tea? start learning now", url: "https://ad3"},
	{image: "imgs/ad4.jpg", title: "The greatest culture of Morocco", url: "https://ad4"},
	{image: "imgs/ad5.jpg", title: "Learn low poly modeling for free!", url: "https://ad5"},
	{image: "imgs/ad6.jpg", title: "5 secrets about Vegetables", url: "https://ad6"},
];

let i = 0;

showAdBtn.addEventListener("click", ShowAd);

function ShowAd(){
	//create ad UI
	let key = i;
	let ad = testAds[i++];

	if (i >= testAds.length) 
		i = 0;

	let adUI = CreateAd(key, ad.image, ad.title, ad.url);

	//show ad UI
	msgAdsContainer.append(adUI);

	Animate(adUI,"AddElementAnim","200ms","ease-out");
}

/*

<div id="ad">
	<div id="ad-image"></div>
	<span id="ad-title">This is a test ad! lor great ad network</span>
	<button id="ad-close-btn"></button>
</div>

*/
function CreateAd(key, adImage, adTitle, adUrl){
	let adUI = document.createElement("div");
	adUI.setAttribute("id", "ad");
	adUI.setAttribute("data-key", key);
	adUI.addEventListener("click", OnAdClick);

	let adImageUI = document.createElement("div");
	adImageUI.setAttribute("id", "ad-image");
	adImageUI.style.backgroundImage=`url(${adImage})`;

	let adTitleUI = document.createElement("span");
	adTitleUI.setAttribute("id", "ad-title");
	adTitleUI.appendChild(document.createTextNode(SafeTextLength(adTitle,adTitleMaxLetters)));

	let adButtonUI = document.createElement("button");
	adButtonUI.setAttribute("id", "ad-close-btn");
	adButtonUI.addEventListener("click", OnAdClose);

	adUI.append(adImageUI);
	adUI.append(adTitleUI);
	adUI.append(adButtonUI);

	return adUI;
}

function OnAdClose(e){
	e.stopPropagation();

	e.target.removeEventListener("click", OnAdClose);
	e.target.parentNode.removeEventListener("click", OnAdClick);

	Animate(e.target.parentNode,"RemoveElementAnim","200ms","ease-out");
	setTimeout(()=>msgAdsContainer.removeChild(e.target.parentNode), 200);
	
}

function OnAdClick(e){
	let key;
	if (e.target.getAttribute("id") != "ad")
		key = e.target.parentNode.getAttribute("data-key"); 
	else
		key = e.target.getAttribute("data-key"); 

	console.log(testAds[key].url);
	window.open(testAds[key].url, '_blank');
}

function SafeTextLength(text, maxLetters){
	return (text.length>maxLetters) ? `${text.substr(0,maxLetters-3)}...` : text ;
}

ShowAd();




function Animate(element, animName, duration, ease="linear"){
	element.style.animation = "none";
	setTimeout(()=>{ element.style.animation = `${animName} ${ease} ${duration}`; },0);
}
