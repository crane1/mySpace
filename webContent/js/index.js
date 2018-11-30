window.onload = function(){
	var btn_submit = $('#btn_submit');
	var text_submit = $('#text_submit');


	btn_submit.click(function(){
		var subText = text_submit.val();
		var subTime = getCurTime();

		var talk_item = {
			usrname: "xiaosiban",
			time: subTime,
			msg: subText
		}


		sendCmdStr("webAddTalk", talk_item, function(){
			var newLiNode = $("ul .li-talk").eq(0).clone(true);
			newLiNode.find("#talk-submit-time").text(subTime);
			newLiNode.find("#talk-content").text(subText);
			newLiNode.appendTo('.ul-talk')

			$("#submit_tips").addClass("inlinebl").removeClass("hide");
			window.setTimeout(function(){
				$("#submit_tips").addClass("hide").removeClass("inlinebl");
			}, 3000);
		});
	})


}