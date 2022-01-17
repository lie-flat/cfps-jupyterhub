import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Card} from 'react-bulma-components'

export default function LazyImage({alt, ...props}) {
    return (
        <Card>
            <div className='card-image'>
                <LazyLoadImage
                    alt={alt}
                    effect="blur"
                    threshold={100}
                    {...props}
                />
            </div>
            <Card.Footer>
                <Card.Footer.Item>
                    {alt}
                </Card.Footer.Item>
            </Card.Footer>
        </Card>

    );
}