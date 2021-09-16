import * as React from "react";

import Avatar from "@components/Avatar";
import StarIcon from "@components/StarIcon";
import "./RepoTile.css";

import { RepoItem } from "../../store/GitHubStore/types";

export type Props = {
  item: RepoItem;
  onClick: (e: React.MouseEvent) => void;
};

function get_first_letter(name: string) {
  return name[0];
}

const RepoTile: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div className="container" onClick={onClick}>
      <Avatar
        src={item.avatar_url}
        letter={get_first_letter(item.owner_login)}
      />
      <div className="right-content">
        <div className="title">{item.name}</div>
        <div className="author">
          <a href={item.owner_url}>{item.owner_login}</a>
        </div>
        <div className="additional-data">
          <div className="stars">
            <span className="gold-star">
              <StarIcon />
            </span>
            {" " + item.stargazers_count}
          </div>
          <div className="date">{item.updated_at}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RepoTile);
