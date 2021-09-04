import ApiStore from '../../shared/store/ApiStore';
import {HTTPMethod} from "../../shared/store/ApiStore/types";
import {IGitHubStore, GetOrganizationReposListParams, ApiResp, RepoItem} from "./types";


export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com'); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        const requestParams = {
            method: HTTPMethod.GET,
            endpoint: '/orgs/' + params.organizationName + '/repos',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            data: null
        }
        const test = await this.apiStore.request(requestParams)
        const result = test.data.map(function parse (elem: any) {
            return {
                name: elem.name,
                description: elem.description,
                stargazers_count: elem.stargazers_count,
                html_url: elem.stargazers_count,
                owner_login: elem.owner.login,
                updated_at: elem.updated_at,
                avatar_url: elem.avatar_url
            }
        })

        return result
    }
}