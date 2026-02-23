import { toast } from "react-toastify";
const raw = localStorage.getItem("userData");
const userData = JSON.parse(raw !== null ? raw : "null");
const BASE_URL =  "http://52.23.14.165:8081"; //  "http://localhost:8081"; // 
const TOKEN = userData?.accessToken;

export const api = {

  
  async getPartners(pageNumber = 0, pageSize = 10) {
    const res = await fetch(
      `${BASE_URL}/partner?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) throw new Error("Failed to fetch partners");
    return await res.json();
  },

  async getPartnerById(id: string) {
    const res = await fetch(`${BASE_URL}/partner/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch partner");
    return await res.json();
  },

  async createPartner(data: any) {
    const res = await fetch(`${BASE_URL}/partner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (res.status === 409) {
      // handle conflict
      toast.error(await res.text());
    }
    if (!res.ok) {
      throw new Error("Failed to create partner");
    }

    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
    toast.success(result);
    return result;
  },

  async getVintageById(id: string) {
    const res = await fetch(`${BASE_URL}/partner/${id}/vintage`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch partner");
    return await res.json();
  },

  async postUploadPurchase(data: any, uploadId: any) {
    const formData = new FormData();
    formData.append("name", data.file.file);
    const res = await fetch(
      `${BASE_URL}/partner/${data.id}/upload?fico=${data.criteria.fico}&enrolledDebt=${data.criteria.enrolledDebt}&epf=${data.criteria.epf}&uploadId=${uploadId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        body: formData
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to Upload");
    }
    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
    return result;
  },

  async postUploadPurchaseExecute(data: any) {
    const formData = new FormData();
    formData.append("name", data.file.file);
    const res = await fetch(
      `${BASE_URL}/partner/${data.id}/upload/executePurchase?fico=${data.criteria.fico}&enrolledDebt=${data.criteria.enrolledDebt}&epf=${data.criteria.epf}&purchasePrice=${data.formData.purchasePrice}&chargeBackReduction=${data.formData.chargeBackReduction}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        body: formData
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to Upload");
    }
    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
   
    if (!result) {
      result = { success: true };
    }
   

    return result;
  },

  async getPartnerPerformanceId(id: string) {
    const res = await fetch(`${BASE_URL}/partner/${id}/performance`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch partner");
    return await res.json();
  },

  async getPerformance() {
    const res = await fetch(`${BASE_URL}/performance`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch performance");
    return await res.json();
  },

  async getPerformanceMonitorId(id: string) {
    const res = await fetch(`${BASE_URL}/partner/${id}/performance-monitor`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Data");
    return await res.json();
  },

  async getVintagePerformance(id: string, vintageId: string) {
    const res = await fetch(
      `${BASE_URL}/partner/${id}/${vintageId}/performance-monitor`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
    if (!res.ok) throw new Error("Failed to fetch Data");
    return await res.json();
  },

  /* User APIS */

  async getUsers() {
    const res = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Users");
    return await res.json();
  },

  async createUser(data: any) {
    let result: any;
    const res = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      // Success
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text(); // fallback for plain text
      }
      toast.success(result);
    } else if (res.status === 409) {
      // handle conflict
      toast.error(await res.text());
    } else {
      throw new Error("Failed to create User");
    }

    return result;
  },

  async deleteUser(id: number | string) {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    if (!res.ok) throw new Error("Failed to Delete User");

    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
    toast.success(result);
    return result;
  },

  async updateUser(id: number | string, payload: any) {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to Update User");

    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
    toast.success(result);
    return result;
  },
  async downloadPerformanceCSV() {
    const res = await fetch(`${BASE_URL}/performance/download`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "text/csv"
      }
    });

    if (!res.ok) throw new Error("Failed to download CSV");
    const cd = res.headers.get("content-disposition") || "";
    const blob = await res.blob();

    // create download
    let filename = `performance_data_${Date.now()}.csv`;

    const match = cd.match(/filename="?([^"]+)"?/i);
    if (match && match[1]) {
      filename = match[1];
    }
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
  },

  async checkUserExists(emailId: string) {
    const res = await fetch(`${BASE_URL}/user/user-exists?emailId=${emailId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) console.log("Failed to fetch Data");
    return await res.json();
  },

  async fetchColumnMappingData(id: string) {
    const res = await fetch(`${BASE_URL}/column-mapping/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Data");
    return await res.json();
  },

  async saveColumnMapping(data: any, id: string) {
    let result: any;
    const res = await fetch(`${BASE_URL}/column-mapping/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });
    if (res.status === 200) {
      // Success
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text(); // fallback for plain text
      }
      toast.success(result);
    } else if (res.status === 409) {
      // handle conflict
      toast.error(await res.text());
    } else {
      throw new Error("Failed to Save Mapping");
    }

    return result;
  },

  async postUploadPurchaseGenerate(data: any) {
    const formData = new FormData();
    formData.append("name", data.file.file);
    let fileName = new Date()
      .toLocaleString("en-GB", { hour12: false })
      .replace(/[\/,: ]/g, "_");
    fileName = "uploadFile_" + fileName;

    const res = await fetch(
      `${BASE_URL}/partner/${data.id}/upload/generate?fileName=${fileName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        body: formData
      }
    );
    // if (res.status !== 200) {
    //   throw new Error("Failed to Upload");
    // }
    let result: any;

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      result = await res.json();
    } else {
      result = await res.text(); // fallback for plain text
    }
    return result;
  },

  async getUploadedGenerateData(partnerId: any, uploadId: any) {
    const res = await fetch(
      `${BASE_URL}/partner/${partnerId}/upload/generate/${uploadId}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (!res.ok) throw new Error("Failed to fetch partners");
    return await res.json();
  },

  async updatePartnerName(data: any) {
    const payload = {
      partnerName: data.partnerName
    };
    let result: any;
    const res = await fetch(`${BASE_URL}/partner/${data.partnerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(payload)
    });
    if (res.status === 200) {
      // Success
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text(); // fallback for plain text
      }
      toast.success(result);
    } else if (res.status === 409) {
      // handle conflict
      toast.error(await res.text());
      ``;
    } else {
      throw new Error("Failed to Update Partner");
    }

    return result;
  },

  async adjustSplit(data: any) {
    let result: any;
    const params = {
      phase: data.phase,
      adjustment: data.splitChange,
      commnets: "",
      operation: data.operation
    };
    const res = await fetch(
      `${BASE_URL}/partner/${data.partnerId}/${data.vintageId}/split-adjustment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      }
    );
    if (res.status === 200) {
      // Success
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text(); // fallback for plain text
      }
      toast.success(result);
    } else if (res.status === 409) {
      // handle conflict
      toast.error(await res.text());
    } else {
      throw new Error("Failed to Update History");
    }

    return result;
  }
};
