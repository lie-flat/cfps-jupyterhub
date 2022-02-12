import {FullPage, Slide} from 'react-full-page';
import 'bulma/css/bulma.min.css';
import {createGlobalStyle} from "styled-components"; //
import SlideLayout from "../components/slide-layout"; //
import {faStar, faStickyNote, faBoxOpen, faWandMagicSparkles, faLock} from "@fortawesome/free-solid-svg-icons";
import SimpleMessage from "../components/simple-message"; //
import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyImage from "../components/lazy-image";//
import {faDocker} from "@fortawesome/free-brands-svg-icons";
import '@fortawesome/fontawesome-svg-core/styles.css'

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #fafafa;
  }
`

export default function Home() {
    return (
        <>
            
            <GlobalStyles/>
            <FullPage duration={400}>
                
                <Slide>
                    <SlideLayout direction="-45deg" gradients='#609895,#72a6a3,#c3d9d8,#ebf2f2'  imagePosition='left'>
                    
                        <LazyImage width={360} height={112.717} src="/pictures/cfps.gif" alt="CFPS（China Family Panel Studies）"/>
                        <SimpleMessage color='info' icon={faStar} title="基于 CFPS 数据的多人大数据分析平台">
                            我们使用 JupyterHub 和 JupyterLab 搭建了一个多人大数据分析平台，可以供一个团队对 CFPS 数据集进行在线的数据分析和可视化。<br/>
                            CFPS，全称中国家庭追踪调查（China Family Panel
                            Studies，CFPS），旨在通过跟踪收集个体、家庭、社区三个层次的数据，反映中国社会、经济、人口、教育和健康的变迁，为学术研究和公共政策分析提供数据基础。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                <SlideLayout direction="-45deg" gradients='#f2997d,#f7c1b1' imagePosition='left'>
                        <LazyImage width={400} height={202.283} src="/pictures/jupyterlab.png" alt="Project Jupyter"/>
                        <SimpleMessage color='link' icon={faStickyNote} title="我们使用了 Jupyter Lab 而非 Jupyter Notebook">
                            相比于 Jupyter Notebook, JupyterLab 更加安全，也提供了更多的功能。 <br/>
                            根据官方的<a href='https://github.com/jupyter/docker-stacks/issues/1217'>公告</a>，Jupyter Notebook
                            即将被淘汰。<br/>
                            因此，我们选择使用 JupyterLab。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                    <SlideLayout direction="-45deg" gradients='#1a94a0,#1a94a0,#3acfdf,#b9eef4,#dcf7f9' imagePosition='left'>
                        <LazyImage width={400} height={296.45} src="/pictures/docker.png" alt="Docker"/>
                        <SimpleMessage color='warning' icon={faDocker} title="使用 Docker 容器">
                            Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中,容器是完全使用沙箱机制,相互之间不会有任何接口。<br/>
                            我们使用 Docker 容器，让每一个用户的 Jupyter Lab 实例都运行在一个单独的Docker容器中，
                            保证了宿主机与用户之间的隔离，还有各个用户之间的隔离，大幅度的提升了系统的安全性。<br/>
                            例如，我们规定了容器内可以访问到的主机的哪些端口，防止了用户对宿主机的非法访问。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                <SlideLayout direction="-45deg" gradients='#dbc815,#f9f3be,#fbf7d4' imagePosition='left'>
                        <LazyImage width={250} height={250} src="/pictures/ootb.jpg" alt="开箱即用"/>
                        <SimpleMessage color='light' icon={faBoxOpen} title="开箱即用">
                            我们为 Jupyter Lab 编写插件，并且进行了深入的设置，使 Jupyter Lab 开箱即用。<br/>
                            你再也不需要在每一个笔记本的开头都 <code>import</code> 一大堆库了。<br/>
                            我们已经提前进行了配置，常用的包已经预先在笔记本之外加载了。<br/>
                            除此之外，我们也提前配置好了数据库连接，用户可以无感知的使用数据库。<br/>
                            直接调用 <code>sql</code> 函数就可以从数据库中调取数据，用户不需要手动配置数据库连接。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                    <SlideLayout imagePosition='left' direction="270deg"
                                 gradients='  
                                              hsl(0deg 0% 15%) 15%,
                                              hsl(0deg 0% 23%) 23%,
                                              hsl(0deg 0% 31%) 31%,
                                              hsl(0deg 0% 38%) 38%,
                                              hsl(0deg 0% 46%) 46%,
                                              hsl(0deg 0% 54%) 54%,
                                              hsl(0deg 0% 62%) 62%,
                                              hsl(0deg 0% 69%) 69%,
                                              hsl(0deg 0% 77%) 77%,
                                              hsl(0deg 0% 85%) 85%                                            
                                            '>
                        <LazyImage width={360} height={240} src="/pictures/data.webp" alt="（图文无关）"/>
                        <SimpleMessage color='success' icon={faWandMagicSparkles} title="两种数据调取方式">
                            你既可以通过数据库调取数据，也可以直接从文件读取数据。<br/>
                            两种方式任你选择。<br/>
                            我们在大作业第一阶段开发的 CFPS Shell 可以很方便的从文件中调取感兴趣的数据。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                <SlideLayout direction="-45deg" gradients='#074922,#68f09f,#a9f7c8,#e9fdf1'  imagePosition='right'>
                        <LazyImage width={200} height={200} src="/pictures/oauth2.png" alt="OAuth2"/>
                        <SimpleMessage color='primary' icon={faLock} title="安全的登录认证">
                            我们全站配置了 SSL 和 HTTPS, 确保了通信的安全。<br/>
                            我们使用 OAuth2 标准进行 Jupyter Hub 的登录认证。<br/>
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                
            </FullPage>
        </>
    )
}