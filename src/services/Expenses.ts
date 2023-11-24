import { RequestService, StorageService } from '../libraries';

export class ExpensesService {
  static async listExpenses() {
    const userId = StorageService.get('user_id');
    const response = await RequestService().get('expenses', { user_id: userId });

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async findExpense(id: number) {
    const response = await RequestService().get(`expenses/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async createExpense(title: string, description: string, category: string, payment: string, date: string, value: number) {
    const userId = StorageService.get('user_id');
    const body = { title, description, category, payment, date, value, user_id: parseInt(userId as string) };

    const response = await RequestService().post('expenses', body);

    if (response.statusCode !== 201) return response;

    const { data } = response;

    return data;
  }

  static async updateExpense(id: number, title: string, description: string, category: string, payment: string, date: string, value: number) {
    const body = { title, description, category, payment, date, value };
    const response = await RequestService().patch(`expenses/${id}`, body);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async deleteExpense(id: number) {
    const response = await RequestService().delete(`expenses/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }
}