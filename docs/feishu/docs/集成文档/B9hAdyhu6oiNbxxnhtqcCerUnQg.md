---
title: FastAPI
urlname: B9hAdyhu6oiNbxxnhtqcCerUnQg
date: '2025-03-26 19:12:50'
updated: '2025-03-26 19:21:29'
---
## 1，FastAPI 优势：
1. 自动生成 API 文档

```python
@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation(Verifcation=Depends(verification)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")
```
访问 /docs 可以看到自动生成的交互式 API 文档。
1. 异步支持

```python
@app.get("/playingmusic")
async def playingmusic(did: str = "", Verifcation=Depends(verification)):
    if not xiaomusic.did_exist(did):
        return {"ret": "Did not exist"}
    # ... 异步处理逻辑
```
1. 类型提示和验证

```python
class DidPlayMusic(BaseModel):
    did: str
    musicname: str = ""
    searchkey: str = ""

@app.post("/playmusic")
async def playmusic(data: DidPlayMusic, Verifcation=Depends(verification)):
    # 自动进行类型验证
```
1. 中间件支持

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
1. 依赖注入系统

```python
@app.get("/")
async def read_index(Verifcation=Depends(verification)):
    folder = os.path.dirname(__file__)
    return FileResponse(f"{folder}/static/index.html")
```
1. WebSocket 支持

```python
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
)
```
## 2，FastAPI 的 API 文档配置
访问方式：

1. Swagger UI: http://localhost:8993/docs

2. ReDoc: http://localhost:8993/redoc

3. OpenAPI JSON: http://localhost:8993/openapi.json
![image](/feishu/asset/images/BwjXbpoIpotcuVxu2I9ctZz6nqb.png)

```undefined
@app.get("/docs", include_in_schema=False)
async def get_swagger_documentation(Verifcation=Depends(verification)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

@app.get("/redoc", include_in_schema=False)
async def get_redoc_documentation(Verifcation=Depends(verification)):
    return get_redoc_html(openapi_url="/openapi.json", title="docs")

@app.get("/openapi.json", include_in_schema=False)
async def openapi(Verifcation=Depends(verification)):
    return get_openapi(title=app.title, version=app.version, routes=app.routes)
```
## 3，FastAPI要引入哪些包
1. FastAPI 核心包：

```python
from fastapi import (
    Depends,         # 依赖注入系统
    FastAPI,         # Web 框架核心
    File,           # 文件上传处理
    HTTPException,   # HTTP 异常处理
    Query,          # 查询参数处理
    Request,        # HTTP 请求对象
    UploadFile,     # 文件上传处理
    status,         # HTTP 状态码
)
```
1. FastAPI 中间件和安全相关：

```python
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
```
1. FastAPI 文档和静态文件：

```python
from fastapi.openapi.docs import get_redoc_html, get_swagger_ui_html
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
```
1. 数据验证：

```python
from pydantic import BaseModel
```
1. 响应处理：

```python
from fastapi.responses import RedirectResponse
from starlette.responses import FileResponse, Response
```
1. 其他辅助包：

```python
from starlette.middleware.gzip import GZipMiddleware
from starlette.background import BackgroundTask
```
要安装这些包，可以使用：
```bash
pip install "fastapi[all]"
```
这会安装 FastAPI 及其所有依赖。
