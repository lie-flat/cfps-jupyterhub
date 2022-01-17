import SpaceTraveling from './space-travelling';
import {Button, Heading} from "react-bulma-components";
import IconText from "../icon-text";
import {faBilibili, faGithub} from "@fortawesome/free-brands-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const HeadingWithMargin = styled(Heading)`
  margin-top: 1em;
`

const ThinButton = styled(Button)`
  width: 8em;
`

export default function Head() {
    return (
        <SpaceTraveling>
            <Heading renderAs='h4' size={1}>心动不如行动</Heading>
            <Heading renderAs='h5' size={4}>不妨现在就去试试？</Heading>
            <Button.Group>
                <ThinButton color='warning' renderAs='a' href="https://github.com/lie-flat/cfps-jupyterhub">
                    <IconText size="sm" icon={faGithub}>Github</IconText>
                </ThinButton>
                <ThinButton color='danger' renderAs='a' href="#">
                    <IconText size="sm" icon={faBilibili}>Bilibili</IconText>
                </ThinButton>
            </Button.Group>
            <Button color='primary' renderAs='a' href="/jupyter" style={{width: '10em'}}>
                <IconText size="sm" icon={faPlay}>立即试用</IconText>
            </Button>
            <HeadingWithMargin renderAs='h5' size={4}>友情链接</HeadingWithMargin>
            <Button.Group>
                <ThinButton color='info' renderAs='a' href="https://www.isss.pku.edu.cn/cfps/">CFPS 官网</ThinButton>
                <ThinButton color='success' renderAs='a' href="https://www.isss.pku.edu.cn/cfps/">kxxt 的个人网站</ThinButton>
            </Button.Group>
        </SpaceTraveling>
    )
}