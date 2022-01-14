# CFPS JupyterHub

Shandong University (Weihai)

山东大学（威海）数据科学与人工智能实验班 （2020级） 2021 年秋 - 2022 年春 前端开发和数据库课程 大作业 第三部分

选题：JupyterHub

## 安装

假设你在使用 Linux 系统，已经安装好了 Anaconda、Docker 和 Nginx

首先在主机上 Clone 这个 Repo，然后 `cd` 进去，运行：

```bash
conda env create -f environment.yml
conda activate cfps
```

## 系统配置

（假设你所使用的系统用户已在 `docker` 组中，如果没有，请运行：`sudo usermod -aG docker $USER`） 提前下载好我制作的容器镜像

```bash
docker pull rsworktech/cfps-notebook:latest
```

允许 Docker 容器访问主机的 8081 端口

```bash
iptables -A INPUT -i docker0 -p tcp -m tcp --dport 8081 -j ACCEPT
```

生成 Nginx 配置

修改 `generate_nginx_conf.py` 中的 `DOMAIN_NAME`，改为你要部署的域名。

```bash
conda activate cfps
python generate_nginx_conf.py prod
```

如果需要生成用于调试的配置，请把 `prod` 换成 `dev`

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

##  