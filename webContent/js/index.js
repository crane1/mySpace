window.onload = function(){
	var btn_submit = $('#btn_submit');
	var text_submit = $('#text_submit');


	btn_submit.click(function(){
		var subText = text_submit.val();
		var newLiNode = $("ul .li-talk").eq(0).clone(true);
		newLiNode.find("#talk-submit-time").text(getCurTime());
		newLiNode.find("#talk-content").text(subText);

		newLiNode.appendTo('.ul-talk')
	})


}