# Configuration file for jupyterhub.
import os

c.JupyterHub.active_server_limit = 4
c.JupyterHub.cleanup_servers = True
c.JupyterHub.concurrent_spawn_limit = 3
c.JupyterHub.cookie_max_age_days = 7
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'


notebook_dir = os.environ.get(
    'DOCKER_NOTEBOOK_DIR') or '/home/jovyan/persistent'
c.DockerSpawner.notebook_dir = notebook_dir
c.DockerSpawner.container_image = "rsworktech/cfps-notebook:latest"
c.DockerSpawner.volumes = {
    'jupyterhub-user-{username}': notebook_dir,
    'cfps-common-data': {'bind': '/home/jovyan/data',
                         'mode': 'ro'},
    'cfps-team-shared': '/home/jovyan/team-shared'
}
c.Spawner.mem_limit = '0.9G'
