import { toast } from "react-toastify";
const raw = localStorage.getItem("userData");
const userData = JSON.parse(raw !== null ? raw : "null");

const BASE_URL = "http://localhost";

const TOKEN = userData?.accessToken;

export const api = {
  async getBrands() {
    const res = await fetch(`${BASE_URL}/brands`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Brands");
    return await res.json();
  },

  async createBrands(data: any) {
    console.log("Creating brand with data:", data);
    const res = await fetch(`${BASE_URL}/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (res.status === 409) {
      toast.error(await res.text());
    }
    if (!res.ok) {
      throw new Error("Failed to create partner");
    }

    const result = await res.json();
    toast.success(result.message || "Brand created successfully");
    return result;
  },

  async deleteBrand(id: string) {
    const res = await fetch(`${BASE_URL}/brand/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch partner");
    const result = await res.json();
    toast.success(result.message || "Brand Deleted successfully");
  },

  async getBrandById(id: string) {
    const res = await fetch(`${BASE_URL}/brand/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Brand");
    const result = await res.json();
    return result;
  },

  async updateBrand(data: any) {
    const res = await fetch(`${BASE_URL}/brand/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (res.status === 409) {
      toast.error(await res.text());
    }
    if (!res.ok) {
      throw new Error("Failed to create partner");
    }

    const result = await res.json();
    toast.success(result.message || "Brand Updated successfully");
    console.log(result);
    return result;
  },

  async getCategories() {
    const res = await fetch(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Categories");
    return await res.json();
  },

  async createCategory(data: any) {
    const res = await fetch(`${BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (res.status === 409) {
      toast.error(await res.text());
    }
    if (!res.ok) {
      throw new Error("Failed to create partner");
    }

    const result = await res.json();
    toast.success(result.message || "Category created successfully");
    return result;
  },

  async deleteCategory(id: string) {
    const res = await fetch(`${BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Category");
    const result = await res.json();
    toast.success(result.message || "Category Deleted successfully");
  },

  async getCategoryById(id: string) {
    const res = await fetch(`${BASE_URL}/category/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) throw new Error("Failed to fetch Category");
    const result = await res.json();
    return result;
  },

  async updateCategory(data: any) {
    const res = await fetch(`${BASE_URL}/category/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (res.status === 409) {
      toast.error(await res.text());
    }
    if (!res.ok) {
      throw new Error("Failed to Update Category");
    }

    const result = await res.json();
    toast.success(result.message || "Category Updated successfully");
    console.log(result);
    return result;
  },

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

  async checkUserExists(emailId: string) {
    const res = await fetch(`${BASE_URL}/user/user-exists?emailId=${emailId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });
    if (!res.ok) console.log("Failed to fetch Data");
    return await res.json();
  }
};
