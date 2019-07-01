/**
 * Module dependencies.
 */
const fs = require('fs')
const OSS = require('ali-oss')
const client = new OSS({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: ''
})

/**
 * Path.
 * localPath:本地文件夹
 * ossDirPath： oss上传目录
 */
const localPath = 'build'
const ossDirPath = process.env.CDN_PATH

/**
 * Command.
 */
;(async function() {
  console.log('Start to Add UiStatic to OSS')

  //检查对应版本目录是否存在，存在则失败
  try {
    const result = await client.list({
      prefix: ossDirPath,
      delimiter: '/'
    })
    const targetDir = ossDirPath + '/'
    if (result && result.prefixes) {
      if (result.prefixes.indexOf(targetDir) > -1) {
        console.error('Error: The Target Version Dir Had Exist')
        process.exit(1)
      } else {
        //开始上传文件
        await addFileToOssSync(localPath, ossDirPath)
        console.log('Add UiStatic to OSS Success!')
      }
    } else {
      console.error('Error: Load Target Dirs Error!')
      process.exit(1)
    }
  } catch (error) {
    console.error('Error: Load Target Dirs Error, ', error)
    process.exit(1)
  }
})()

/**
 * Functions.
 */
async function putOSS(src, dist) {
  try {
    const result = await client.put(dist, src)
    if (result && result.res && result.res.status == 200) {
      console.log('Pushed to ' + dist)
    } else {
      console.error('Error: Upload Files Error, ', result)
      process.exit(1)
    }
  } catch (error) {
    console.error('Error: Upload Files Error, ', error)
    process.exit(1)
  }
}

async function addFileToOssSync(src, dist) {
  const docs = fs.readdirSync(src)
  for (const doc of docs) {
    const _src = src + '/' + doc,
      _dist = dist + '/' + doc
    const st = fs.statSync(_src)
    // 判断是否为文件
    if (st.isFile() && doc !== '.DS_Store') {
      await putOSS(_src, _dist)
    }
    // 如果是目录则递归调用自身
    else if (st.isDirectory()) {
      await addFileToOssSync(_src, _dist)
    }
  }
}
