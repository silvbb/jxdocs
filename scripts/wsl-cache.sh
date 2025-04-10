#!/bin/bash

# 创建一个脚本来将频繁访问的文件缓存到 WSL 本地文件系统：
# 先授权命令
# chmod +x /mnt/f/project_space/jxdocs-mnt/scripts/wsl-cache.sh
# 再运行脚本
# /mnt/f/project_space/jxdocs-mnt/scripts/wsl-cache.sh
# 创建缓存目录
WSL_CACHE_DIR="/home/jwisdom/wsl_cache/jxdocs"
mkdir -p $WSL_CACHE_DIR

# 缓存 node_modules 到 WSL 本地文件系统
if [ ! -L "node_modules" ] && [ -d "node_modules" ]; then
  echo "缓存 node_modules 到 WSL 本地文件系统..."
  rsync -a node_modules/ $WSL_CACHE_DIR/node_modules/
  mv node_modules node_modules.bak
  ln -s $WSL_CACHE_DIR/node_modules node_modules
fi

# 缓存其他频繁访问的目录
for dir in ".vite_cache" "cache"; do
  if [ ! -L "$dir" ] && [ -d "$dir" ]; then
    echo "缓存 $dir 到 WSL 本地文件系统..."
    rsync -a $dir/ $WSL_CACHE_DIR/$dir/
    mv $dir $dir.bak
    ln -s $WSL_CACHE_DIR/$dir $dir
  fi
done

echo "WSL 缓存设置完成！"