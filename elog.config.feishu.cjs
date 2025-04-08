module.exports = {
  write: {
    platform: 'feishu',
    feishu: {
      type: 'space', // 不填默认为从我的空间下载
      folderToken: process.env.FEISHU_FOLDER_TOKEN,
      appId: process.env.FEISHU_APP_ID,
      appSecret: process.env.FEISHU_APP_SECRET,
      // Add rate limiting configuration
      limit: 1,           // 每次只处理一个文档
      delay: 30000,       // 每次请求间隔 30 秒
      maxRetry: 2         // 最大重试次数设为 2
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs/feishu/docs',
      filename: 'urlname',
      format: 'markdown',
      catalog: true,// 按照文件夹生成文档和目录
      frontMatter: {
        enable: true,
      }
    }
  },
  image: {
    enable: true,
    platform: 'local',//cos
    local: {
      outputDir: './docs/feishu/asset/images',
      prefixKey: '/feishu/asset/images',
    },
    cos: {
      secretId: process.env.COS_SECRET_ID,
      secretKey: process.env.COS_SECRET_KEY,
      bucket: process.env.COS_IMAGE_BUCKET,
      region: process.env.COS_IMAGE_REGION,
      host: process.env.COS_HOST,
      prefixKey: 'jxdocs-images',
      secretExt: '', // 可选
    }
  },
}
