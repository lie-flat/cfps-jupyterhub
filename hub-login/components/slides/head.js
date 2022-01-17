// Reference: https://github.com/chokcoco/iCSS/issues/148
//            https://codepen.io/Chokcoco/pen/NWvYOqW

import styles from './Head.module.scss';

const Group = () => (
    <div className={styles.group}>
        <div className={`${styles.item} ${styles.itemRight}`}/>
        <div className={`${styles.item} ${styles.itemLeft}`}/>
        <div className={`${styles.item} ${styles.itemTop}`}/>
        <div className={`${styles.item} ${styles.itemBottom}`}/>
        <div className={`${styles.item} ${styles.itemMiddle}`}/>
    </div>
)

export default function Head() {
    return (
        <div className={styles.rootContainer}>
            <div className={styles.container}>
                <Group/>
                <Group/>
            </div>
        </div>
    )
}