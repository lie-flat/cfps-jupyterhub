// Reference: https://github.com/chokcoco/iCSS/issues/148
//            https://codepen.io/Chokcoco/pen/NWvYOqW

import styles from './SpaceTravelling.module.scss';
import {Container} from 'react-bulma-components'

const Group = () => (
    <div className={styles.group}>
        <div className={`${styles.item} ${styles.itemRight}`}/>
        <div className={`${styles.item} ${styles.itemLeft}`}/>
        <div className={`${styles.item} ${styles.itemTop}`}/>
        <div className={`${styles.item} ${styles.itemBottom}`}/>
        <div className={`${styles.item} ${styles.itemMiddle}`}/>
    </div>
)

export default function SpaceTraveling({children}) {
    return (
        <>
            <div className={styles.rootContainer}>
                <Container className={styles.content}>
                    {children}
                </Container>
                <div className={styles.container}>
                    <Group/>
                    <Group/>
                </div>
            </div>
        </>
    )
}