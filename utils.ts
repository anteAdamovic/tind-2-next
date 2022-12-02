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
    case "tind2-qa.tind.io": {
      return {
        tenantId: "tind2-qa",
        config: {
          CFG_SITE_NAME: "TIND QA",
        },
      };
    }
    case "tind2-ante.tind.io": {
      return {
        tenantId: "tind2-ante",
        config: {
          CFG_SITE_NAME: "TIND Ante",
        },
      };
    }
    case "tind2-test.tind.io": {
      return {
        tenantId: "tind2-test",
        config: {
          CFG_SITE_NAME: "TIND Test",
        },
      };
    }
    default: {
      return {
        tenantId: "unknown",
        config: {
          CFG_SITE_NAME: "unknown"
        }
      };
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
