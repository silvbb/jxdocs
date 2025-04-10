@echo off
chcp 65001 >nul
echo 正在查询当前端口映射...
echo.
netsh interface portproxy show all
echo.
echo 查询完成，按 Enter 键退出...
pause >nul