# Configuration file for jupyterhub.
import os
import sys
import pathlib

sys.path.append(str(pathlib.Path(__file__).parent.resolve()))

from backend.config import HUB_CLIENT_ID, HUB_CLIENT_SECRET, port

c = get_config()

c.JupyterHub.active_server_limit = 4
c.JupyterHub.cleanup_servers = True
c.JupyterHub.concurrent_spawn_limit = 3
c.JupyterHub.cookie_max_age_days = 7
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'

c.JupyterHub.bind_url = 'http://127.0.0.1:8000/jupyter'  # 因为有 nginx, 所以代理只监听 127.0.0.1:8000 即可

c.JupyterHub.hub_ip = '172.17.0.1'  # 设置为 Docker 虚拟网卡的 IP
c.DockerSpawner.hub_ip_connect = '172.17.0.1'
c.DockerSpawner.hub_connect_url = "http://172.17.0.1:8081/"
print(c.JupyterHub.hub_ip)

notebook_dir = os.environ.get(
    'DOCKER_NOTEBOOK_DIR') or '/home/jovyan'
c.DockerSpawner.notebook_dir = notebook_dir
c.DockerSpawner.container_image = "rsworktech/cfps-notebook:latest"
c.DockerSpawner.volumes = {
    'jupyterhub-user-{username}': notebook_dir,
    'cfps-common-data': {'bind': '/home/jovyan/data',
                         'mode': 'ro'},
    'cfps-team-shared': '/home/jovyan/team-shared'
}
c.Spawner.mem_limit = '0.9G'

c.JupyterHub.authenticator_class = "oauthenticator.generic.GenericOAuthenticator"
c.GenericOAuthenticator.oauth_callback_url = '/jupyter/oauth_callback'
c.GenericOAuthenticator.client_id = HUB_CLIENT_ID
c.GenericOAuthenticator.client_secret = HUB_CLIENT_SECRET
c.GenericOAuthenticator.login_service = '统一身份认证服务'
c.GenericOAuthenticator.userdata_url = f'http://127.0.0.1:{port}/user-data'
c.GenericOAuthenticator.token_url = f'http://127.0.0.1:{port}/token'
c.GenericOAuthenticator.authorize_url = '/login'
c.GenericOAuthenticator.username_key = 'username'
