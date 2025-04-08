module.exports = {
  write: {
    platform: 'notion',
    notion: {
      token: process.env.NOTION_TOKEN,
      databaseId: process.env.NOTION_DATABASE_ID,
      filter: true, // {property: 'status', select: {equals: '已发布'}}
      sorts: 'sortAsc'
    },
  },
  deploy: {
    platform: 'local',
    local: {
      outputDir: './docs/notion/docs/',
      filename: 'urlname',
      format: 'markdown',
      frontMatter: {
        enable: true,
        exclude: ['cover', 'status'],
      }
    }
  },
  image: {
    enable: false,
    platform: 'local',
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
