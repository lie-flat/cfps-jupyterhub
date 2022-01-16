# Some of the code is from https://github.com/jupyter/docker-stacks/tree/master/scipy-notebook
# Here are the original licenses of the code:
#  # Copyright (c) Jupyter Development Team.
#  # Distributed under the terms of the Modified BSD License.

FROM rsworktech/minimal-notebook-py310:latest

LABEL maintainer="Levi Zim <levi_zim@outlook.com>"

USER root

# ffmpeg for matplotlib anim & dvipng+cm-super for latex labels
RUN apt-get update --yes && \
    apt-get install --yes --no-install-recommends ffmpeg dvipng cm-super && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /etc/ipython

COPY startup.py /opt/startup.py
COPY ipython_config.py /etc/ipython/ipython_config.py

USER ${NB_UID}

# Install Python 3 packages
RUN mamba install --quiet --yes \
    'altair' \
    'beautifulsoup4' \
    'bokeh' \
    'bottleneck' \
    'cloudpickle' \
    'conda-forge::blas=*=openblas' \
    'cython' \
    'dask' \
    'dill' \
    'h5py' \
    'ipympl'\
    'ipywidgets' \
    'matplotlib-base' \
    'numexpr' \
    'pandas' \
    'patsy' \
    'protobuf' \
    'pytables' \
    'scikit-image' \
    'scikit-learn' \
    'scipy' \
    'seaborn' \
    'sqlalchemy' \
    'statsmodels' \
    'sympy' \
    'widgetsnbextension' \
    'jupyterlab-language-pack-zh-CN' \
    'xlrd' && \
    mamba clean --all -f -y && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

# Install facets which does not have a pip or conda package at the moment
WORKDIR /tmp
RUN git clone https://github.com/PAIR-code/facets.git && \
    jupyter nbextension install facets/facets-dist/ --sys-prefix && \
    rm -rf /tmp/facets && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

# Import matplotlib the first time to build the font cache.
ENV XDG_CACHE_HOME="/home/${NB_USER}/.cache/"

RUN MPLBACKEND=Agg python -c "import matplotlib.pyplot" && \
    fix-permissions "/home/${NB_USER}"

COPY requirements.txt /tmp/requirements.txt
RUN pip3 install --no-cache -r /tmp/requirements.txt

RUN mkdir "/home/${NB_USER}/data" && \
    fix-permissions "/home/${NB_USER}/data" && \
    mkdir "/home/${NB_USER}/team-shared" && \
    fix-permissions "/home/${NB_USER}/team-shared"


USER ${NB_UID}

WORKDIR "${HOME}"
