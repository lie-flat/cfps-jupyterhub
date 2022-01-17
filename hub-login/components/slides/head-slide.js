import SpaceTraveling from './space-travelling';
import {Button, Heading} from "react-bulma-components";
import IconText from "../icon-text";
import {faBilibili, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const IntroText = styled.p`
  margin-top: 1em;
`

const ThinButton = styled(Button)`
  width: 7em;
`

export default function HeadSlide() {
    return (
        <SpaceTraveling>
            <Heading renderAs='h1' size={1}>CFPS JupyterHub</Heading>
            <Heading renderAs='h2' size={4}>山东大学 (威海) 数据科学与人工智能实验班</Heading>
            <Heading renderAs='h2' size={5}>前端开发和数据库课程大作业</Heading>
            <Button.Group>
                <ThinButton color='warning' renderAs='a' href="https://github.com/lie-flat/cfps-jupyterhub">
                    <IconText size="sm" icon={faGithub}>Github</IconText>
                </ThinButton>
                <ThinButton color='danger' renderAs='a' href="#">
                    <IconText size="sm" icon={faBilibili}>Bilibili</IconText>
                </ThinButton>
            </Button.Group>
            <Button color='primary' renderAs='a' href="/jupyter" style={{width: '10em'}}>
                <IconText size='sm' icon={faPlay}>立即试用</IconText>
            </Button>
            <IntroText>还没想好？下滑查看介绍</IntroText>
        </SpaceTraveling>
    )
}