import { Button } from "primereact/button";
import { useState } from "react";
import { mapHostToTenant } from "../../../utils";
import { Editor } from "primereact/editor";

//editor theme
import "primereact/resources/primereact.min.css";
import styles from "./NewPage.module.css";
import CustomInput from "../../../components/custom-input/CustomInput";

export default function HomePage({ tenantInfo }: any) {
  const [form, setForm] = useState({
    title: "",
    link: "",
    text: "",
  });

  const createNewPage = () => {};

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
        <a href="/pages">Pages</a>
      </div>
      <div className="brand">
        <h1>{tenantInfo?.config.CFG_SITE_NAME}</h1>
      </div>
      <div className="container">
        <div className={styles.container}>
          <div style={{ marginBottom: "10px", padding: "0 10px" }}>
            <h2 style={{ fontWeight: 100 }}>Create new page</h2>
          </div>
          <div className={styles.inputs}>
            <CustomInput
              placeholder="Title"
              value={form.title}
              onChange={(e: any) => setForm({ ...form, title: e.target.value })}
            />
            <CustomInput
              placeholder="Link"
              value={form.link}
              onChange={(e: any) => setForm({ ...form, link: e.target.value })}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <Editor
              style={{ height: "320px" }}
              value={form.text}
              onTextChange={(e) =>
                setForm({ ...form, text: e.htmlValue as any })
              }
            />
          </div>
          <div className={styles.actions}>
            <div>
              <a href="/pages">
                <Button
                  style={{ width: "100%" }}
                  label="Cancel"
                  className="p-button-danger"
                  onClick={createNewPage}
                />
              </a>
            </div>
            <div>
              <Button
                style={{ width: "100%" }}
                label="Create new"
                className="p-button-info"
                onClick={createNewPage}
              />
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
