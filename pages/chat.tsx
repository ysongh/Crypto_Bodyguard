import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AppWithoutSSR = dynamic(() => import('../components/App'), {
  ssr: false,
})

function Chat({ pageProps }: AppProps) {
  return (
    <AppWithoutSSR>
      <div {...pageProps} />
    </AppWithoutSSR>
  )
}

export default Chat;
