(function(){
  document.addEventListener("onOverlayDataUpdate", function(e){
    console.log(JSON.stringify(e.detail));
  });
})();
