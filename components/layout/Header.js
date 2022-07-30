import Head from "next/head";

function Header({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="description" content="A Dapp where you can hire bodyguard and pay them with Crypto" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Header;