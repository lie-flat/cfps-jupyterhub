import sys

sys.path.append("/home/jovyan/data/cfps-analyze/process")

from cfps_shell import *

sys.path.append("/home/jovyan/data")

from cfps_dvapis import *

from pyecharts.globals import CurrentConfig, NotebookType

CurrentConfig.NOTEBOOK_TYPE = NotebookType.JUPYTER_LAB
