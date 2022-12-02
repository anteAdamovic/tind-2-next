import { useState } from "react";
import CustomInput from "../components/custom-input/CustomInput";
import { mapHostToTenant } from "../utils";
import styles from "./Home.module.css"

export default function HomePage({ tenantInfo }: any) {
  const [search, setSearch] = useState("");

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
      <div className={styles.container}>
        <div
          style={{
            width: "50%",
            height: "175px",
            marginTop: "120px",
          }}
        >
          <div>
            <CustomInput
              placeholder="Search"
              isVisible
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ paddingTop: "8px" }}>
            <a className={styles.link} href="/docs/search-guide?ln=en">Search Tips</a> ::{" "}
            <a className={styles.link} href="">Collections</a> :: <a className={styles.link} href="/pages">Pages</a>
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

  return {
    props: {
      tenantInfo,
    },
  };
};
