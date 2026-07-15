import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import Seo from "./Seo";

export default function Layout(props: React.PropsWithChildren) {

  return (
    <>
      <Seo />
      <Banner />
      <Header />
      {props?.children}
      <Footer />
    </>
  )

}
