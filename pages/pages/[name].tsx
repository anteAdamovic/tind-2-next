import { getPageStaticInfo } from "next/dist/build/analysis/get-page-static-info";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPageInfo, mapHostToTenant } from "../../utils";

export default function HomePage({ tenantInfo, pageInfo }: any) {
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
          <a href="/search">Search</a>
          <a href="/submit">Submit</a>
        </div>
        <a href="/youraccount/login">Login</a>
      </div>
      <div className="brand">
        <h1>{tenantInfo?.config.CFG_SITE_NAME}</h1>
      </div>
      <div className="container">
        <div>
          <h1>{pageInfo.name}</h1>
          <p>{pageInfo.text}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const { host } = req.headers;

  const fetchPage = async () => {
    const getPageResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages/" + query.name, { headers: { "TIND-TENANT-ID": "tind2-ante" } });
    const page = await getPageResponse.json();
    return page ? page : {};
  }

  const page = await fetchPage();

  return {
    props: {
      tenantInfo: mapHostToTenant(host),
      pageInfo: {
        ...page
      },
    },
  };
};
