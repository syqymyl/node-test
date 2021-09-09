var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？");
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /******** 从这里开始看，上面不要看 ************/

  console.log("有个傻子发请求过来啦！路径（带查询参数）为：" + pathWithQuery);
  /*pathWithQuery表示带查询参数的路径 */
  // console.log("method:")
  // console.log(method)  //GET或POST
  // console.log("request.headers:"); //得到所有的请求头
  // console.log(request.headers);
  // console.log("Accept:"); //得到所有的请求头
  // console.log(request.headers["Accept"]);

  if (path === "/") {
    /*以下为响应内容 */
    response.statusCode = 200; /*已知路径，返回200*/
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    // response.setHeader("syqsmyl", "huhu");
    // var accept = request.headers["accept"];
    // console.log("accept:");
    // console.log(accept);
    response.write(`  
      <!DOCTYPE html>
      <head>
          <link rel="stylesheet" href="/x">
      </head>
      <body>
          <h2>标题</h2>
          <script src="/y"></script>
      </body>
    `);
    response.end();
  } else if (path === "/x") {
    /*此处等同于/x.css，无需写后缀名，文件类型由setHeader中的Content-Type决定*/
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(`body{color: red;}\n`);
    response.end();
  } else if (path === "/y") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(`这是js内容\n`);
    response.end();
  } else {
    response.statusCode = 404; /*未知路径，返回404*/
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在\n`);
    response.end();
  }

  /**********以下是为了学习console.log调试而用的错误代码**********/

  // console.log('Path:' + path)
  // console.log("path === ./style.css" )
  // console.log(path === './style.css')
  // if(path === '/'){
  //   response.statusCode = 200
  //   response.setHeader('Content-Type', 'text/html;charset=utf-8')
  //   response.write(`
  //     <link rel="stylesheet" href="./style.css">
  //     <h1>你好</h1>
  //   `)
  //   response.end()
  // } else if(path === './style.css'){
  //   response.statusCode = 200
  //   response.setHeader('Content-Type', 'style/css;charset=utf-8')
  //   response.write(`h1{color: red;}`)
  //   response.end()
  // } else {
  //   response.statusCode = 404
  //   response.end()
  // }

  /******** 代码结束，下面不要看 ************/
});

server.listen(port);
console.log(
  "监听 " +
    port +
    " 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:" +
    port
);
