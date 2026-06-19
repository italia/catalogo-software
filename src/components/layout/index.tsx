import Footer from "./Footer";
import Header from "./Header";
import Seo from "./Seo";

export default function Layout(props: React.PropsWithChildren) {

  return (
    <>
      <Seo />
      <Header />
      <main>{props?.children}</main>
      <Footer />
    </>
  )

}
