(function(){
	var homePage = {
		btn_submit: $('#btn_submit'),
		text_submit: $('#text_submit'),

		initDom: function(){
			this.btn_submit.click(function(){
				handleSubmit();
			});
		},

		webGetTalkList: function(){
			sendCmdStr("webGetTalkList", "", loadTalkList);
		}
	}
	
	

	function handleSubmit(){
		var subText = homePage.text_submit.val();
		debugger;
		if(!subText) {
			var msg = "Please input your talk!";
			showInfoMsgTime("error", msg, "submit_tips");
			return;
		}

		var subTime = getCurTime();

		var talk_item = {
			usrname: "xiaosiban",
			time: subTime,
			msg: subText
		}


		sendCmdStr("webAddTalk", talk_item, function(){
			sendCmdStr("webGetTalkList", "", loadTalkList);
			showInfoMsgTime("info", "Submit succeed", "submit_tips");
		});

	}

	function loadTalkList(talkList) {
		var talkHtml = '';
		talkList.forEach(function(item, i){
			talkHtml += loadTalkItem(i, item)
		})
		$("#ulTalk").html(talkHtml);
		homePage.text_submit.val("");
	}

	function loadTalkItem(index, item){
		return '<li class="li-talk" id="liTalk' + index + '">' +
				'<div class="talk-item">' +
					'<div class="talk-head">' +
						'<img class="talk-usr-img" src="webContent/img/user.jpg">' +
						'<span id="talk-submit-usr' + index + '">' + item.usrname + '</span>' +
						'<span id="talk-submit-time' + index + '">' + item.time + '</span>' +
					'</div>' +
					'<div class="div-talk-content">' +
						'<span id="talk-content' + index + '">' + item.msg + '</span>' +
					'</div>' +					
				'</div>' +
			'</li>';
	}
	homePage.initDom();
	homePage.webGetTalkList();

})(window)