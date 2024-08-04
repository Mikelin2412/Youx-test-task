import { serverURL } from "../constants/constants";

export class UserService {
  static async getAllUsersFromAPI(page: number, limit: number) {
    const data = await fetch(`${serverURL}api/user/all?page=${page}&limit=${limit}`);
    return data.json();
  }

  static async createNewUser(user: FormData) {
    const data = await fetch(`${serverURL}api/user`, {
      method: 'POST',
      body: user,
    });
    return data.json();
  }

  static async deleteUserById(id: number) {
    const data = await fetch(`${serverURL}api/user/${id}`, {
      method: 'DELETE',
    });
    return data.json();
  }

  static async changeUserInfo(id: number, user: FormData) {
    const data = await fetch(`${serverURL}api/user/${id}`, {
      method: 'PATCH',
      body: user,
    });
    return data.json();
  }
}