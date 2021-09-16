import { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

import "./RepoPage.scss";

const RepoPage: React.FC = () => {
  const params: any = useParams();
  const id: string = params.id;

  const [info, setInfo] = useState({
    name: "",
    description: "",
    owner: "",
    stargazers_count: 0,
  });

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `http://api.github.com/repositories/${id}`,
      });

      setInfo({
        name: result.data.name,
        description: result.data.description,
        owner: result.data.owner.login,
        stargazers_count: result.data.stargazers_count,
      });
    };

    fetch();
  }, []);

  return (
    <div className="repoPage">
      <div className="infoItem">Name: {info.name}</div>
      <div className="infoItem">Description: {info.description}</div>
      <div className="infoItem">Owner login: {info.owner}</div>
      <div className="infoItem">Stargazers count: {info.stargazers_count}</div>
    </div>
  );
};

export default RepoPage;
