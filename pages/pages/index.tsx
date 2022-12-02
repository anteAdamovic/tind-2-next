import { mapHostToTenant } from "../../utils";
import styles from "./Pages.module.css";
import { PagesTable } from './components/PagesTable.component';

import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";

export default function HomePage({ tenantInfo, pages }: any) {
  const [_pages, setPages] = useState([]);

  const fetchPages = async () => {
    const getPagesResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages", { headers: { "TIND-TENANT-ID": tenantInfo.tenantId } });
    setPages(getPagesResponse.items);
  }

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
          <a href="/submit">Submit</a>
        </div>
        <a href="/youraccount/login">Login</a>
      </div>
      <div className="brand">
        <h1>{tenantInfo?.config.CFG_SITE_NAME}</h1>
      </div>
      <div className="container">
        <div className={styles.container}>
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontWeight: 100 }}>
                Static Pages
              </h2>
              <Button style={{ float: "right" }}>New Page</Button>
            </div>
            <div style={{ width: "100%" }}>
              <PagesTable pages={pages}/>
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

  const tenantInfo = mapHostToTenant(host);
  const fetchPages = async () => {
    const getPagesResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages", { headers: { "TIND-TENANT-ID": tenantInfo.tenantId } });
    const pages = await getPagesResponse.json();
    return pages.items ? pages.items : [];
  }

  const createNewPage = async () => {
    try {
      const newPage = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages/", {
        method: 'POST',
        body: JSON.stringify({
          name: decodeURIComponent(query.title),
          text: decodeURIComponent(query.text)
        }),
        headers: { "TIND-TENANT-ID": tenantInfo.tenantId }
      });
      console.log("New page created!");
      console.log(JSON.stringify(newPage));
    } catch (e: any) {
      console.log("Failed to create new page", e.message);
      console.error(e);
    }
  };

  if (query.title && query.text) {
    await createNewPage();
    redirect(context.res, "/pages");
  }
  const pages = await fetchPages();

  return {
    props: {
      tenantInfo,
      pages
    },
  };
};
