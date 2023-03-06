import { Button } from "@tindtechnologies/tind-components/components";
import { mapHostToTenant } from "../../../utils";

export default function HomePage({ tenantInfo, pageInfo }: any) {
  const goBack = () => {
    history.back();
  };

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
        <div style={{ "width": "70%", "marginTop": "20px" }}>
          <h1>{pageInfo.name}</h1>
          <hr />
          <p dangerouslySetInnerHTML={{ __html: pageInfo.text }} style={{ "marginTop": "20px" }}></p>

          <div style={{ marginTop: "16px" }}>
            <span style={{ marginRight: "8px" }}>
              <Button type="primary" label="Back to table" onClick={goBack} outlined={true}></Button>
            </span>
            <Button icon="pi pi-check" type="primary" label="Publish"></Button>
            <span style={{ "float": "right" }}>
              <Button type="danger" label="Delete"></Button>
            </span>
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

  const fetchPage = async () => {
    const getPageResponse: any = await fetch("https://6ayskb90d7.execute-api.eu-west-1.amazonaws.com/Prod/api-pages/" + query.name, { headers: { "TIND-TENANT-ID": tenantInfo.tenantId } });
    console.log("response", getPageResponse);
    const page = await getPageResponse.json();
    return page ? page : {};
  }

  const page = await fetchPage();

  return {
    props: {
      tenantInfo,
      pageInfo: {
        ...page
      },
    },
  };
};
