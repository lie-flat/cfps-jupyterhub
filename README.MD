# CFPS JupyterHub

Shandong University (Weihai)

山东大学（威海）数据科学与人工智能实验班 （2020级） 

2021 年秋 - 2022 年春 前端开发和数据库课程 大作业 第三部分

选题：JupyterHub

## 安装

假设你在使用 Linux 系统，已经安装好了 Anaconda、Docker 和 Nginx

同时假设您已完成大作业的第一部分的配置，MySQL 跑在默认的端口 3306 上。

首先在主机上 Clone 这个 Repo，然后 `cd` 进去，运行：

```bash
conda env create -f environment.yml
conda activate cfps
pip install -r requirements.txt
cd hub-login
yarn install
cd ..
```

## 应用程序配置

### 环境变量配置

编辑 `.env` 文件，写入需要配置的环境变量

```bash
INVITE_CODES=邀请码，用;隔开，用户注册的时候需要
API_RATE_LIMIT=API调用频率上限，比如"30/minute"
API_SECRET_KEY=后端密钥
API_HUB_CLIENT_ID=JupyterHub客户端ID
API_HUB_CLIENT_SECRET=JupyterHub客户端密钥
APP_DOMAIN_NAME=部署域名
DOCKER_INTERFACE_IP=Docker 网卡 IP
APP_PROFILE=部署环境，可选值：dev(开发环境), prod(生产环境)
```

然后运行 `source load_env_vars.sh` 将 `.env` 文件中的环境变量加载到当前 shell 中

### 配置存储

我们创建两个 docker volume，一个用来存储只读的共享数据，另一个用来存储所有用户都可读写的数据。

> 注：每个用户的私有存储将会自动创建，无需手动配置

```bash
mkdir -p /home/$USER/jupyterhub-data/{data,shared}
docker volume create --driver local -o o=bind -o type=none -o device="/home/$USER/jupyterhub-data/data" cfps-common-data
docker volume create --driver local -o o=bind -o type=none -o device="/home/$USER/jupyterhub-data/shared" cfps-team-shared
```

然后将大作业的 [第一部分](https://github.com/lie-flat/cfps-analyze) 的代码和数据复制到 `/home/$USER/data` 中, 目录结构应该如下：

其中，dataset 目录的结构应该根据 https://github.com/lie-flat/cfps-analyze/blob/master/README.MD 进行配置

根据相关保密要求，我们不能提供 CFPS 数据集文件，请从官方渠道申请并下载。

此 Repo 的 `cfps_dvapis` 文件夹也应该被复制到 `/home/$USER/data` 中

```
/home/$USER/data
├── cfps-analyze
│   ├── dataset
│   ├── process
│   ├── docs
│   ├── .gitignore
│   ├── .gitmodules
│   ├── .whitesource
│   ├── LICENSE
│   ├── README.MD
│   └── requirements.txt
├── cfps_dvapis
```


## 系统配置

（假设你所使用的系统用户已在 `docker` 组中，如果没有，请运行：`sudo usermod -aG docker $USER`） 提前下载好我制作的容器镜像

```bash
docker pull rsworktech/cfps-notebook:latest
```

允许 Docker 容器访问主机的 8081 端口和部署在 3306 端口的 MySQL

```bash
sudo iptables -A INPUT -i docker0 -p tcp -m tcp --dport 8081 -j ACCEPT
sudo iptables -A INPUT -i docker0 -p tcp -m tcp --dport 3306 -j ACCEPT
```

持久化 iptables 的设置，防止重启系统之后上面的设置失效

如果没有安装 `iptables-persistent`, 则先运行 `sudo apt install iptables-persistent`

```bash
sudo dpkg-reconfigure iptables-persistent
```

生成 Nginx 配置

```bash
conda activate cfps
python generate_nginx_conf.py
```

安装 Nginx 配置并启用

```bash
sudo cp hub.kxxt.tech.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/hub.kxxt.tech.conf /etc/nginx/sites-enabled/hub.kxxt.tech.conf
```

配置 SSL 证书 (假设你已经装好了 `certbot`)

```bash
(cfps) kxxt@kxxtserver:~/cfps-jupyterhub$ sudo certbot
Saving debug log to /var/log/letsencrypt/letsencrypt.log

Which names would you like to activate HTTPS for?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
5: hub.kxxt.tech
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 5
Requesting a certificate for hub.kxxt.tech

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/hub.kxxt.tech/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/hub.kxxt.tech/privkey.pem
This certificate expires on 2022-04-14.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for hub.kxxt.tech to /etc/nginx/sites-enabled/hub.kxxt.tech.conf
Congratulations! You have successfully enabled HTTPS on https://hub.kxxt.tech
```

