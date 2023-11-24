import { RequestService, StorageService } from '../libraries';

export class UsersService {
  static async signIn(email: string, password: string) {
    const response = await RequestService({ useToken: false }).post('login', { email, password });

    if (response.statusCode !== 200) return response;

    const { data: { id, access_token, name } } = response;

    StorageService.setN({ access_token, name, email, user_id: id, is_logged_in: 'true' });

    return response;
  }

  static async listUsers() {
    const response = await RequestService().get('users');

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async findUser(id: number) {
    const response = await RequestService().get(`users/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async createUser(name: number, cpf: string, email: string, password: string) {
    const body = { name, cpf, email, password };
    const response = await RequestService().post('users', body);

    if (response.statusCode !== 201) return response;

    const { data } = response;

    return data;
  }

  static async updateUser(id: number, name: string, email: string, password: string) {
    const body = { name, email, password };
    const response = await RequestService().patch(`users/${id}`, body);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async deleteUser(id: number) {
    const response = await RequestService().delete(`users/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }
}