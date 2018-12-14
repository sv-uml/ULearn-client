import axios from "axios";
import { AxiosResponse } from "axios";
import { configVals } from "./config";

export class CourseService {

    public static async create(title: string, description: string, startDate: number, endDate: number, token: string): Promise<AxiosResponse> {
        return axios.post(configVals.root + configVals.createCourse + "&method=POST&token=" + token, {
            title,
            description,
            startDate,
            endDate
        }, { 
            headers: {
                "Authorization": token
            }
        });
    }

    public static async getAll(token: string): Promise<AxiosResponse> {
        return axios.get(configVals.root + configVals.courses + "&method=GET&token=" + token, {
            headers: {
                "Authorization": token
            }
        });
    }

    public static logout(): void {
        window.localStorage.removeItem("state");
    }
}
