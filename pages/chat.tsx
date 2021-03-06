import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AppWithoutSSR = dynamic(() => import('../components/App'), {
  ssr: false,
})

function Chat({ Component, pageProps }: AppProps) {
  return (
    <AppWithoutSSR>
      <Component {...pageProps} />
    </AppWithoutSSR>
  )
}

export default Chat;
