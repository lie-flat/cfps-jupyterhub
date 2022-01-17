import {Columns, Container} from "react-bulma-components";
import styles from "./SlideLayout.module.scss";

const SlideLayout = ({
                         imagePosition = 'right',
                         children,
                         direction = '-45deg',
                         gradients = '#ee7752, #e73c7e, #23a6d5, #23d5ab'
                     }) => {
    const imageColumn = <Columns.Column key={0}>{children[0]}</Columns.Column>
    const contentColumn = <Columns.Column key={1}>{children[1]}</Columns.Column>
    return (
        <div className={styles.background} style={{backgroundImage: `linear-gradient(${direction}, ${gradients})`}}>
            <Container className={styles.slideLayoutContainer}>
                <Columns
                    className={`${styles.slideLayout} ${imagePosition === 'right' ? styles.columnNormal : styles.columnReverse}`}>
                    {imagePosition === 'right' ? [contentColumn, imageColumn] : [imageColumn, contentColumn]}
                </Columns>
            </Container>
        </div>
    )
}

export default SlideLayout;