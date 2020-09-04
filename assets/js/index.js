$(function () {
  getUserInfo();
  var layer = layui.layer;
  //   点击按钮,实现退出
  $("#btnLogout").on("click", function () {
    layer.confirm("确认退出登录?", { icon: 3, title: " 提示" }, function () {
      // 清空本地储存
      localStorage.removeItem("token");
      // 跳转登陆页面
      location.href = "/new/login.html";
      //   关闭提示框
      layer.close(index);
    });
  });
});
// 获取用户信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      console.log(res);
      if (res.status === 0) {
        renderAvatar(res.data);
      }
    },
  });
}
// 渲染用户头像

function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
