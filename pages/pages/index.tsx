import { mapHostToTenant } from "../../utils";
import styles from "./Pages.module.css";

import { Button } from "primereact/button";

export default function HomePage({ tenantInfo }: any) {
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
              <Button
                style={{ width: "100%" }}
                label="Some page"
                className="p-button-info p-button-outlined"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className={styles.col1}>
            <div>
              <a href="/pages/new-page" style={{ margin: 0 }}>
                <Button
                  style={{ width: "100%" }}
                  label="Create new page"
                  className="p-button-info"
                  onClick={() => {}}
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
  return {
    props: {
      tenantInfo: mapHostToTenant(host),
    },
  };
};
