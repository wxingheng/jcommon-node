/*
 * @Author: wuxh
 * @Date: 2020-08-27 13:56:56
 * @LastEditTime: 2020-08-27 14:23:06
 * @LastEditors: wuxh
 * @Description: 
 * @FilePath: /jcommon-node/src/file/cp.js
 */
const fs = require('fs')
/**
 * 允许被复制的文件后缀列表
 * @type {string[]}
 */
// const copyExt = ['.html', '.php']
/**
 * 复制一个文件夹下的文件到另一个文件夹
 * @param src 源文件夹
 * @param dst 目标文件夹
 */
const copyDir = function (src, dst) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err
    }
    paths.forEach(function (path) {
      const _src = src + '/' + path
      const _dst = dst + '/' + path
      let readable
      let writable
      fs.stat(_src, function (err, st) {
        if (err) {
          throw err
        }
        // 判断是否为文件
        if (st.isFile()) {
          // 允许的后缀才可以被复制
          //   if (contains(copyExt, _src)) {
          // 创建读取流
          readable = fs.createReadStream(_src)
          // 创建写入流
          writable = fs.createWriteStream(_dst)
          // 通过管道来传输流
          readable.pipe(writable)
          //   } else {
          // console.log(_src + ' 不允许被复制!!!')
          //   }
        }
        // 如果是目录则递归调用自身
        else if (st.isDirectory()) {
          exists(_src, _dst, copyDir)
        }
      })
    })
  })
}
/**
 * 在复制目录前需要判断该目录是否存在，
 * 不存在需要先创建目录
 * @param src
 * @param dst
 * @param callback
 */
const exists = function (src, dst, callback) {
  let c = callback || copyDir
  // 如果路径存在，则返回 true，否则返回 false。
  if (fs.existsSync(dst)) {
    c(src, dst)
  } else {
    fs.mkdir(dst, function () {
      c(src, dst)
    })
  }
}
/**
 * 判断数组中的元素是否包含此字符串
 * @param arr
 * @param obj
 * @returns {boolean}
 */
const contains = function (arr, obj) {
  return true
  //   let flag = false
  //   arr.map((val) => {
  //     if (obj.includes(val)) {
  //       flag = true
  //     }
  //   })
  //   return flag
}
// 复制目录
// exists('../dist/', '../temp/', copyDir)

module.exports = {
  exists
}
