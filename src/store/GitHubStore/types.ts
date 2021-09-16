/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

// Параметры запроса
export type GetOrganizationReposListParams = {
  organizationName: string;
};

export type RepoItem = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  owner_login: string;
  updated_at: string;
  avatar_url: string;
  owner_url: string;
};

export type ApiResp<RepoItem> =
  | {
      success: true;
      data: RepoItem;
    }
  | {
      success: false;
      data: any;
    };

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResp<RepoItem[]>>;
}
