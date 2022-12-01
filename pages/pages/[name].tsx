import { getPageStaticInfo } from "next/dist/build/analysis/get-page-static-info";
import { useRouter } from "next/router";
import { useState } from "react";
import { getPageInfo } from "../../utils";

export default function HomePage(props: any) {
  console.log("props", props);

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
          <a href="#">Search</a>
          <a href="#">Submit</a>
        </div>
        <a href="#">Login</a>
      </div>
      <div className="brand">
        {/* <h1>{tenantInfo?.config.CFG_SITE_NAME}</h1> */}
      </div>
      <div className="container">
        <div style={{ width: "50%", height: "175px", marginTop: "120px" }}>
          <div style={{ paddingTop: "8px" }}>
            <a href="/docs/search-guide?ln=en">Search Tips</a> ::{" "}
            <a href="">Collections</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const { req, query, res, asPath, pathname } = context;
  const { host } = req.headers;
  console.log("query", query);
  return {
    props: {
      pageInfo: {
        ...(await getPageInfo(host)),
        name: query.name,
        text: "Neki text",
        title: "Neki Title",
      },
    },
  };
};
