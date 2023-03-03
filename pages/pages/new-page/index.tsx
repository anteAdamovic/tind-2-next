import { useState } from "react";
import { mapHostToTenant } from "../../../utils";
import { Editor, Button, InputText } from "@tindtechnologies/tind-components/components";

//editor theme
import "primereact/resources/primereact.min.css";
import styles from "./NewPage.module.css";
import CustomInput from "../../../components/custom-input/CustomInput";

export default function HomePage({ tenantInfo }: any) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const createNewPage = () => {
    location.href = `/pages?title=${encodeURIComponent(name)}&text=${encodeURIComponent(text)}`;    
  };

  const goBack = () => {
    history.back();
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
          <div style={{ marginBottom: "10px", padding: "0 10px" }}>
            <h2 style={{ fontWeight: 100 }}>Create new page</h2>
          </div>
          <div className={styles.inputs}>
            <CustomInput
              placeholder="Name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
          <div style={{ padding: "10px" }}>
            <Editor
              value={text}
              onChange={(e) => setText(e.htmlValue as string)}
            />
          </div>
          <div className={styles.actions}>
            <div>
              <a href="/pages">
                <Button
                  type="primary"
                  outlined={true}
                  label="Cancel"
                  onClick={goBack}
                />
              </a>
            </div>
            <div>
              <Button
                type="success"
                label="Save"
                icon="pi pi-check"
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
