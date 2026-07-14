import { Helmet } from "react-helmet";

type MetaTag = { attr: "name" | "property"; key: string; content: string };
type LinkTag = { rel: string; href: string };

export default function () {
  const title = "Catalogo software open source | Developers Italia"
  const url = "https://catalogo-sofwtare.developers.italia.it"
  const description = "Esplora il catalogo del software open source e a riuso della pubblica amministrazione Italiana. ";
  const iconPath = "/assets/icons/logo-it.png";

  const metaTags: MetaTag[] = [
    { attr: "name", key: "description", content: description },
    { attr: "property", key: "og:title", content: title },
    { attr: "property", key: "og:description", content: description },
    { attr: "property", key: "og:url", content: url },
    { attr: "property", key: "og:image", content: iconPath },
    { attr: "property", key: "og:type", content: "website" },
    { attr: "name", key: "twitter:card", content: "summary" },
    { attr: "name", key: "twitter:title", content: title },
    { attr: "name", key: "twitter:description", content: description },
    { attr: "name", key: "twitter:image", content: iconPath },
  ];

  const linkTags: LinkTag[] = [
    { rel: "canonical", href: url },
    { rel: "icon", href: iconPath },
  ];

  return (
    <Helmet>
      <title>{title}</title>
      {metaTags.map((tag) => (
        <meta key={tag.key} {...{ [tag.attr]: tag.key }} content={tag.content} />
      ))}
      {linkTags.map((tag) => (
        <link key={tag.rel} rel={tag.rel} href={tag.href} />
      ))}
    </Helmet>
  )
}
