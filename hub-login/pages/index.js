import {FullPage, Slide} from 'react-full-page';
import Head from '../components/slides/head';

export default function Home() {
  return (
      <>
        <FullPage>
          <Slide>
              <Head/>
          </Slide>
          <Slide>
            <h1>Inner slide content</h1>
          </Slide>
          <Slide>
            <h1>Another slide content</h1>
          </Slide>
        </FullPage>
      </>
  )
}
