import { RequestService, StorageService } from '../libraries';

export class RevenuesService {
  static async listRevenues() {
    const userId = StorageService.get('user_id');
    const response = await RequestService().get('revenues', { user_id: userId });

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async findRevenue(id: number) {
    const response = await RequestService().get(`revenues/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async createRevenue(title: string, description: string, recurrence: string, value: number) {
    const userId = StorageService.get('user_id');
    const body = { title, description, recurrence, value, user_id: parseInt(userId as string) };

    const response = await RequestService().post('revenues', body);

    if (response.statusCode !== 201) return response;

    const { data } = response;

    return data;
  }

  static async updateRevenue(id: number, title: string, description: string, recurrence: string, value: number) {
    const body = { title, description, recurrence, value };
    const response = await RequestService().patch(`revenues/${id}`, body);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async deleteRevenue(id: number) {
    const response = await RequestService().delete(`revenues/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }
}