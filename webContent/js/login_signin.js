(function(window){
    var loginPage = {
        //注册页面按钮
        btn_login: $("#login"),
        btn_signin: $("#sign-in"),
        tx_username: $("#tx-username"),
        tx_password: $("#tx-password"),
        tx_name_tips: $("#tx_name_tips"),
        tx_pwd_tips: $("#tx_pwd_tips"),

        initPage:function(){
            var self = this;
            self.btn_login.click(function(){

                var username = self.tx_username.val();
                var password = self.tx_password.val();
                
                var pass = self.checkNamePwd(username, password);

                var data = {
                    username: username,
                    password: password
                }


                if(pass){
                   console.log("check pass");
                   sendCmdStr("webLogin", data, self.repLogin);
                }
            })
            self.btn_signin.click(function(){
                checkNamePwd();
            })
        },
        
        //检测密码和用户名
        checkNamePwd: function(username, password){
            var self = this;
            var nameChecked = checkName(username);
            showCheckedInfo(nameChecked, this.tx_name_tips);
            
            var pwdChecked = checkPWD(password);
            showCheckedInfo(pwdChecked, this.tx_pwd_tips);

            return nameChecked && pwdChecked;
        },

        //登录成功的回调
        repLogin(result){
            console.log("repLogin " + result.data);
            if(result.data == 0){
                window.location.href = "/index.html"

            }else{
                alert("用户名或哦密码错误，登录失败");
            }
        }

    };
    
    //展示检测信息
    function showCheckedInfo(isPass, element){
        if(isPass){
            element.addClass("glyphicon-ok text-success").removeClass("glyphicon-remove text-warning");
        }else{
            element.addClass("glyphicon-remove text-warning").removeClass("glyphicon-ok text-success");
        }
        showElement(element);
    }

    //检测用户名，不能为空
    function checkName(txt){
        if(txt && txt.trim()){
            return true;
        }
        return false;
    }

    //检测密码输入，不能为空
    function checkPWD(pwd){
        if(pwd && pwd.trim()){
            return true;
        }
        return false;
    }
    loginPage.initPage();
    
})(window)
