$(function () {
  // 定义一个查询的参数对象,将来请求数据的时候,
  // 需要将请求参数对象提交到服务器
  var q = {
    pagenum: 1, //页码值
    pagesize: 2, //每页显示几条数据
    cate_id: "", //文章分类的 id
    state: "", //文章的发布状态
  };
  initTable();
  initCate();
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  // 获取文章文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取失败");
        }
        //   使用模板引擎渲染页面数据
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        // 调用渲染分页的方法
        // renderPage(res.total);
      },
    });
  }
  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    var dt = new Date(date);

    var y = padZero(dt.getFullYear());
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + "" + hh + ":" + mm + ":" + ss;
  };
  function padZero(n) {
    return n > 9 ? n : "0" + n;
  }
  // 初始化文章的方法
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        // 通过 layui 重新渲染表单区域的UI结构
        form.render();
      },
    });
  }
  // 为筛选表单绑定 submit 事件
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    // 获取表单中选中项的值
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id;
    q.state = state;
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable();
  });
});
