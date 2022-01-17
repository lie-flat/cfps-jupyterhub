// Reference: https://github.com/chokcoco/iCSS/issues/148
//            https://codepen.io/Chokcoco/pen/NWvYOqW

import styles from './Head.module.scss';
import {Container, Button, Heading} from 'react-bulma-components'
import styled from 'styled-components';
import IconText from "../icon-text";
import {faGithub, faBilibili} from "@fortawesome/free-brands-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

const Group = () => (
    <div className={styles.group}>
        <div className={`${styles.item} ${styles.itemRight}`}/>
        <div className={`${styles.item} ${styles.itemLeft}`}/>
        <div className={`${styles.item} ${styles.itemTop}`}/>
        <div className={`${styles.item} ${styles.itemBottom}`}/>
        <div className={`${styles.item} ${styles.itemMiddle}`}/>
    </div>
)

const IntroText = styled.p`
  margin-top: 1em;
`

const ThinButton = styled(Button)`
  width: 7em;
`

const Information = () => (
    <Container className={styles.content}>
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
            <IconText icon={faPlay}>立即试用</IconText>
        </Button>
        <IntroText>还没想好？下滑查看介绍</IntroText>
    </Container>
)

export default function Head() {
    return (
        <>
            <div className={styles.rootContainer}>
                <Information/>
                <div className={styles.container}>
                    <Group/>
                    <Group/>
                </div>
            </div>
        </>
    )
}