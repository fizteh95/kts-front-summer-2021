import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod } from "../../shared/store/ApiStore/types";
import {
  IGitHubStore,
  GetOrganizationReposListParams,
  ApiResp,
  RepoItem,
} from "./types";

function date_to_updated(date: string) {
  const clear_date: string = date.split("T")[0];
  const splitted: Array<string> = clear_date.split("-");
  const day: string = splitted[2];
  const month: string = splitted[1];

  const month_dict: Record<string, string> = {
    "1": "Jan",
    "2": "Feb",
    "3": "Mar",
    "4": "Apr",
    "5": "May",
    "6": "Jun",
    "7": "Jul",
    "8": "Aug",
    "9": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  const result = `Updated ${day} ${month_dict[String(Number(month))]}`;
  return result;
}

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com"); // TODO: не забудьте передать baseUrl в конструктор

  // TODO: реализовать интерфейс IGitHubStore

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResp<RepoItem[]>> {
    // TODO: Здесь сделайте вызов из this.apiStore и верните результат
    // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
    const requestParams = {
      method: HTTPMethod.GET,
      endpoint: "/orgs/" + params.organizationName + "/repos",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      data: null,
    };
    const test = await this.apiStore.request(requestParams);
    const result = test.data.map(function parse(elem: any) {
      return {
        id: elem.id,
        name: elem.name,
        description: elem.description,
        stargazers_count: elem.stargazers_count,
        html_url: elem.stargazers_count,
        owner_login: elem.owner.login,
        updated_at: date_to_updated(elem.updated_at),
        avatar_url: elem.owner.avatar_url,
        owner_url: elem.owner.html_url,
      };
    });

    const response: ApiResp<RepoItem[]> = {
      success: true,
      data: result,
    };

    return response;
  }
}
