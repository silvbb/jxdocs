#!/bin/bash

# 分离构建和开发环境
# 已升级为fast-build.js脚本

# 创建临时构建目录
WSL_BUILD_DIR="/home/jwisdom/temp_build"
mkdir -p $WSL_BUILD_DIR

# 复制项目文件到 WSL 本地文件系统
echo "复制项目文件到 WSL 本地文件系统..."
rsync -a --exclude node_modules --exclude .git --exclude dist . $WSL_BUILD_DIR/

# 在 WSL 本地文件系统中构建
echo "在 WSL 本地文件系统中构建..."
cd $WSL_BUILD_DIR
npm install
npm run build

# 复制构建结果回 Windows 文件系统
echo "复制构建结果回 Windows 文件系统..."
rsync -a $WSL_BUILD_DIR/dist/ /mnt/f/project_space/jxdocs-mnt/dist/

echo "快速构建完成！"