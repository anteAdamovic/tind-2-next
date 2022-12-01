export function mapHostToTenant(host: string) {
  switch (host) {
    case "localhost:5000": {
      return {
        tenantId: "localhost",
        config: {
          CFG_SITE_NAME: "TIND",
        },
        pageInfo: "Local Institute of Fictive Science",
      };
    }
    case "localhost:3000": {
      return {
        tenantId: "localhost",
        config: {
          CFG_SITE_NAME: "TIND",
        },
      };
    }
    default: {
      return null;
    }
  }
}

export async function getPageInfo(host: string) {
  const { tenantId }: any = mapHostToTenant(host);

  return {
    tenantId,
    // ...(await fetch("neki url", { headers: { TENANT_ID: tenantId } })),
  };
}
