import HttpService from './http.service';
import { DataCountry, DataGov } from '../interfaces/login.interface';

class LoginService {
  async getLoginGov(): Promise<DataGov> {
    try {
      const response = await HttpService.get<DataGov>(
        'gov',
        '/resource/gt2j-8ykr.json'
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLoginCountry(): Promise<DataCountry> {
    try {
      const response = await HttpService.get<DataCountry>(
        'country',
        '/john-guerra/43c7656821069d00dcbc/raw/3aadedf47badbdac823b00dbe259f6bc6d9e1899/colombia.geo.json'
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new LoginService();
