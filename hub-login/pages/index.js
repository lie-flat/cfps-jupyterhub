import {FullPage, Slide} from 'react-full-page';
import HeadSlide from '../components/slides/head-slide';
import FootSlide from '../components/slides/foot-slide';
import 'bulma/css/bulma.min.css';
import {createGlobalStyle} from "styled-components";
import SlideLayout from "../components/slide-layout";
import {faStar, faStickyNote, faBoxOpen, faWandMagicSparkles, faLock} from "@fortawesome/free-solid-svg-icons";
import SimpleMessage from "../components/simple-message";
import 'react-lazy-load-image-component/src/effects/blur.css';
import LazyImage from "../components/lazy-image";
import Head from "next/head";
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
            <Head>
                <title>CFPS JupyterHub</title>
            </Head>
            <GlobalStyles/>
            <FullPage duration={400}>
                <Slide>
                    <HeadSlide/>
                </Slide>
                <Slide>
                    <SlideLayout direction="-45deg" gradients='#ee7752, #e73c7e, #23a6d5, #23d5ab' imagePosition='left'>
                        <LazyImage width={360} height={112.717} src="/pictures/cfps.gif" alt="CFPS（China Family Panel Studies）"/>
                        <SimpleMessage color='info' icon={faStar} title="基于 CFPS 数据的多人大数据分析平台">
                            我们使用 JupyterHub 和 JupyterLab 搭建了一个多人大数据分析平台，可以供一个团队对 CFPS 数据集进行在线的数据分析和可视化。<br/>
                            中国家庭追踪调查（China Family Panel
                            Studies，CFPS）旨在通过跟踪收集个体、家庭、社区三个层次的数据，反映中国社会、经济、人口、教育和健康的变迁，为学术研究和公共政策分析提供数据基础。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                    <SlideLayout imagePosition='left' direction="60deg"
                                 gradients='  hsl(240deg 100% 20%) 0%,
                                              hsl(259deg 100% 23%) 11%,
                                              hsl(279deg 100% 27%) 22%,
                                              hsl(298deg 100% 30%) 33%,
                                              hsl(318deg 100% 33%) 44%,
                                              hsl(337deg 100% 37%) 56%,
                                              hsl(357deg 100% 40%) 67%,
                                              hsl(16deg 100% 43%) 78%,
                                              hsl(36deg 100% 47%) 89%,
                                              hsl(55deg 100% 50%) 100%
                                            '>
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
                    <SlideLayout imagePosition='left' direction="135deg"
                                 gradients='hsl(240deg 100% 20%) 0%,
                                            hsl(230deg 100% 25%) 8%,
                                            hsl(220deg 100% 30%) 15%,
                                            hsl(210deg 100% 35%) 23%,
                                            hsl(200deg 100% 41%) 31%,
                                            hsl(190deg 100% 46%) 38%,
                                            hsl(180deg 100% 51%) 46%,
                                            hsl(171deg 100% 56%) 54%,
                                            hsl(161deg 100% 61%) 62%,
                                            hsl(151deg 100% 66%) 69%,
                                            hsl(141deg 100% 71%) 77%,
                                            hsl(131deg 100% 77%) 85%,
                                            hsl(121deg 100% 82%) 92%,
                                            hsl(111deg 100% 87%) 100%
                                            '>
                        <LazyImage width={400} height={296.45} src="/pictures/docker.png" alt="Docker"/>
                        <SimpleMessage color='warning' icon={faDocker} title="使用 Docker 容器">
                            每一个用户的 Jupyter Lab 实例都运行在一个单独的 Docker 容器中。<br/>
                            我们使用 Docker 容器保证了宿主机与用户之间的隔离，还有各个用户之间的隔离，大幅度的提升了系统的安全性。<br/>
                            例如，我们规定了容器内可以访问到的主机的哪些端口，防止了用户对宿主机的非法访问。
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                    <SlideLayout imagePosition='left' direction="225deg"
                                 gradients='  hsl(46deg 100% 62%) 1%,
                                              hsl(56deg 100% 62%) 38%,
                                              hsl(66deg 100% 61%) 46%,
                                              hsl(76deg 100% 61%) 50%,
                                              hsl(86deg 100% 60%) 51%,
                                              hsl(96deg 100% 60%) 51%,
                                              hsl(106deg 100% 59%) 50%,
                                              hsl(115deg 100% 58%) 50%,
                                              hsl(126deg 100% 58%) 49%,
                                              hsl(135deg 100% 57%) 49%,
                                              hsl(145deg 100% 57%) 50%,
                                              hsl(155deg 100% 56%) 54%,
                                              hsl(165deg 100% 56%) 62%,
                                              hsl(175deg 100% 55%) 99%
                                            '>
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
                                 gradients='  hsl(0deg 0% 0%) 0%,
                                              hsl(0deg 0% 8%) 8%,
                                              hsl(0deg 0% 15%) 15%,
                                              hsl(0deg 0% 23%) 23%,
                                              hsl(0deg 0% 31%) 31%,
                                              hsl(0deg 0% 38%) 38%,
                                              hsl(0deg 0% 46%) 46%,
                                              hsl(0deg 0% 54%) 54%,
                                              hsl(0deg 0% 62%) 62%,
                                              hsl(0deg 0% 69%) 69%,
                                              hsl(0deg 0% 77%) 77%,
                                              hsl(0deg 0% 85%) 85%,
                                              hsl(0deg 0% 92%) 92%,
                                              hsl(0deg 0% 100%) 100%
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
                    <SlideLayout imagePosition='left' direction="315deg"
                                 gradients='  hsl(300deg 93% 65%) 0%,
                                              hsl(282deg 93% 62%) 7%,
                                              hsl(264deg 93% 59%) 14%,
                                              hsl(246deg 93% 56%) 21%,
                                              hsl(229deg 92% 53%) 29%,
                                              hsl(211deg 93% 51%) 36%,
                                              hsl(193deg 93% 48%) 43%,
                                              hsl(175deg 92% 45%) 50%,
                                              hsl(150deg 91% 46%) 57%,
                                              hsl(125deg 89% 46%) 64%,
                                              hsl(100deg 88% 47%) 71%,
                                              hsl(75deg 86% 48%) 79%,
                                              hsl(50deg 84% 49%) 86%,
                                              hsl(25deg 83% 50%) 93%,
                                              hsl(0deg 81% 50%) 100%
                                            '>
                        <LazyImage width={200} height={200} src="/pictures/oauth2.png" alt="OAuth2"/>
                        <SimpleMessage color='primary' icon={faLock} title="安全的登录认证">
                            我们全站配置了 SSL 和 HTTPS, 确保了通信的安全。<br/>
                            我们使用 OAuth2 标准进行 Jupyter Hub 的登录认证。<br/>
                        </SimpleMessage>
                    </SlideLayout>
                </Slide>
                <Slide>
                    <FootSlide/>
                </Slide>
            </FullPage>
        </>
    )
}
