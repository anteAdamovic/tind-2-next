import { mapHostToTenant } from "../../utils";
import styles from "./Pages.module.css";

import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function HomePage({ tenantInfo, pages }: any) {
  const [_pages, setPages] = useState([]);

  const fetchPages = async () => {
    const getPagesResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages", { headers: { "TIND-TENANT-ID": tenantInfo.tenantId } });
    console.log(getPagesResponse);
    setPages(getPagesResponse.items);
  }

  console.log(pages);

  // useEffect(() => {
  //   fetchPages();
  // }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateRows: "34px 200px 1fr",
      }}
    >
      <div className="nav">
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <a href="/">Search</a>
          <a href="#">Submit</a>
        </div>
        <a href="#">Login</a>
      </div>
      <div className="brand">
        <h1>{tenantInfo?.config.CFG_SITE_NAME}</h1>
      </div>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.col1}>
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontWeight: 100 }}>
                Search and Browse Static Pages
              </h2>
            </div>
            <div>
              {pages.map((_page: any) => {
                return <a
                  style={{ width: "100%" }}
                  className={styles.pageLink + " p-button-info p-button-outlined"}
                  href={"/pages/" + _page.name}
                  target="_blank"
                >{_page.name}</a>
              })}
            </div>
          </div>
          <div className={styles.col1}>
            <div>
              <a href="/pages/new-page" style={{ margin: 0 }}>
                <Button
                  style={{ width: "100%" }}
                  label="Create new page"
                  className="p-button-info"
                  onClick={() => { }}
                />
              </a>
            </div>
            <div>
              <h2
                style={{ fontWeight: 100, marginTop: "10px", color: "#3B82F6" }}
              >
                Pages
              </h2>
              <div style={{ fontWeight: 100, marginTop: "10px" }}>
                <text>
                  Pages are different way to discover content. Instead of
                  <br></br> browsing different categories and sub-categories,
                  you <br></br> can create custom pages to suit your needs.
                  Curators of<br></br> this repository have carefully put
                  together content in a<br></br> meaningful way. Enjoy!
                </text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const { host } = req.headers;


  const fetchPages = async () => {
    const getPagesResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages", { headers: { "TIND-TENANT-ID": "tind2-ante" } });
    const pages = await getPagesResponse.json();
    return pages.items ? pages.items : [];
  }

  const pages = await fetchPages();

  return {
    props: {
      tenantInfo: mapHostToTenant(host),
      pages
    },
  };
};
