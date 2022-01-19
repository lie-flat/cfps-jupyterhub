import '../styles/globals.css'
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false

function MyApp({Component, pageProps}) {
    return <Component {...pageProps} />
}

export default MyApp
