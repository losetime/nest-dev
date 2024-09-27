import gulp from 'gulp';
import { exec } from 'child_process';
import fs from 'fs';

// 定义一个 Gulp 任务来启动 http-server
gulp.task('file-system', function (cb) {
  // 启动 http-server，监听当前目录
  const folderPath = './File-System';
  const folderExists = fs.existsSync(folderPath);
  if (!folderExists) {
    return cb(new Error('文件目录不存在，请检查...'));
  }
  const port = 4002; // 端口号
  const server = exec(
    `npx http-server ${folderPath} -p ${port} --cors`,
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    },
  );

  // 确保在子进程（如 http-server）关闭时,执行回调 cb 通知 Gulp 任务结束
  // cb: [Function: done]
  server.on('close', cb);

  // 打印服务启动后的访问信息
  server.stdout.on('data', function (data) {
    console.log(data);
  });
});
