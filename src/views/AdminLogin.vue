<template>
    <div class="container-fluid">
      <div class="form-signin">
          <h3 class="form-signin-heading text-center">登录到管理员系统</h3>
          <label for="login-adminName" class="sr-only">管理员帐号</label>
          <input type="text" class="form-control" placeholder="管理员帐号" autofocus v-model="user.userName" />
          <label for="login-adminPwd" class="sr-only">密码</label>
          <input type="password" class="form-control" placeholder="密码" v-model="user.passWord" @keyup.enter="adminLogin()"/>
          <div class="checkbox">
              <label>
                  <input type="checkbox" value="remember-me" @click="rememberBro()"/> 记住哥
              </label>
          </div>
          <button class="btn btn-md btn-primary btn-block" @click="adminLogin()">安全登录</button>
      </div>
    </div>
</template>

<script>


export default {
    name: 'adminLogin',
    components: {
        
    },
    mounted(){
    },
    data(){
        return {
            user : {
                userName : "",
                passWord : ""
            }
        }
    },
    computed:{

    },
    methods : {
        /**
         * 记住哥
         */
        rememberBro(){
            return this.$swal("记住个毛，就你一个人", "", "success");
        },
        /**
         * 前往新世界
         */
        adminLogin(){
            const that = this;
            const params = that.user;

            that.$http.post("user/login", params)
                .then( (result) =>{
                    if(result.code == 0){
                        const router = {
                            path : result.data.link
                        }
                        that.$store.commit("recodeToken", result.data.token);
                        that.$router.push(router);
                    }else{
                        that.$swal(result.detailMsg, "", "success");
                    }
                });
        }
    }
}
</script>

<style lang="scss" scoped>
    .container-fluid {
        padding: 0px;
        padding-top: 158px;
        padding-bottom: 40px;
    }
    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
        background: white;
        border-radius: 7px;
        box-shadow: -4px 0 4px rgba(7, 17, 27, .1),
        4px 0 4px rgba(7, 17, 27, .1),
        0 -4px 4px rgba(7, 17, 27, .1),
        0 4px 4px rgba(7, 17, 27, .1);
    }

    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 40px;
    }

    .form-signin .checkbox {
        font-weight: normal;
    }

    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 12px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>