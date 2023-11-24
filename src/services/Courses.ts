import { RequestService } from '../libraries';

export class CoursesService {
  static async listCourses() {
    const response = await RequestService().get('courses');

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async findCourse(id: number) {
    const response = await RequestService().get(`courses/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async createCourse(name: string, description: string, duration: number) {
    const body = { name, description, duration: Number(duration) };

    const response = await RequestService().post('courses', body);

    if (response.statusCode !== 201) return response;

    const { data } = response;

    return data;
  }

  static async updateCourse(id: number, name: string, description: string, duration: number) {
    const body = { name, description, duration: Number(duration) };
    const response = await RequestService().patch(`courses/${id}`, body);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }

  static async deleteCourse(id: number) {
    const response = await RequestService().delete(`courses/${id}`);

    if (response.statusCode !== 200) return response;

    const { data } = response;

    return data;
  }
}