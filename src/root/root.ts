// Здесь необходимо продемонстрировать создание и использование GitHubStore

import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

export function test_repos() {
  return gitHubStore.getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
  });
}

// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
