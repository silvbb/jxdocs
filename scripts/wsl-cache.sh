#!/bin/bash

# 创建一个脚本来将频繁访问的文件缓存到 WSL 本地文件系统：
# 先授权命令
# chmod +x /mnt/f/project_space/jxdocs-mnt/scripts/wsl-cache.sh
# 再运行脚本
# /mnt/f/project_space/jxdocs-mnt/scripts/wsl-cache.sh

# 显示当前工作目录
echo "当前工作目录: $(pwd)"

# 创建缓存目录
WSL_CACHE_DIR="/home/jwisdom/wsl_cache/jxdocs"
mkdir -p $WSL_CACHE_DIR
echo "缓存目录已创建: $WSL_CACHE_DIR"

# 检查 node_modules 状态
if [ -L "node_modules" ]; then
  echo "node_modules 已经是符号链接，跳过缓存"
elif [ ! -d "node_modules" ]; then
  echo "node_modules 目录不存在，跳过缓存"
else
  echo "缓存 node_modules 到 WSL 本地文件系统..."
  rsync -av node_modules/ $WSL_CACHE_DIR/node_modules/
  if [ $? -eq 0 ]; then
    mv node_modules node_modules.bak
    ln -s $WSL_CACHE_DIR/node_modules node_modules
    echo "node_modules 缓存完成"
  else
    echo "rsync 命令失败，请检查错误信息"
  fi
fi

# 缓存其他频繁访问的目录
for dir in ".vite_cache" "cache"; do
  if [ -L "$dir" ]; then
    echo "$dir 已经是符号链接，跳过缓存"
  elif [ ! -d "$dir" ]; then
    echo "$dir 目录不存在，跳过缓存"
  else
    echo "缓存 $dir 到 WSL 本地文件系统..."
    rsync -av $dir/ $WSL_CACHE_DIR/$dir/
    if [ $? -eq 0 ]; then
      mv $dir $dir.bak
      ln -s $WSL_CACHE_DIR/$dir $dir
      echo "$dir 缓存完成"
    else
      echo "rsync $dir 命令失败，请检查错误信息"
    fi
  fi
done

echo "WSL 缓存设置完成！"