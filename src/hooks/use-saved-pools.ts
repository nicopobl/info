import { useEffect, useState } from "react";
import { rows } from "../components/pools-table/data";

const useSavedPools = () => {
  const [savedPoolsIds, setSavedPoolsIds] = useState<string[]>([]);
  const savedPools = rows.filter((row) => savedPoolsIds.includes(row.id));

  useEffect(() => {
    const savedPoolsIds = localStorage.getItem("savedPoolsIds") || "[]";
    const parsedSavedPoolsIds = JSON.parse(savedPoolsIds);
    setSavedPoolsIds(parsedSavedPoolsIds);
  }, []);

  const handleSavePool = (id: string) => {
    if (savedPoolsIds.includes(id)) {
      const newSavedPoolsIds = savedPoolsIds.filter((poolId) => poolId !== id);
      localStorage.setItem("savedPoolsIds", JSON.stringify(newSavedPoolsIds));
      setSavedPoolsIds(newSavedPoolsIds);
    } else {
      const newsavedPoolsIds = [...savedPoolsIds, id];
      localStorage.setItem("savedPoolsIds", JSON.stringify(newsavedPoolsIds));
      setSavedPoolsIds(newsavedPoolsIds);
    }
  };

  const isPoolSaved = (id: string) => {
    return savedPoolsIds.includes(id);
  };

  return { savedPools, savedPoolsIds, handleSavePool, isPoolSaved };
};

export default useSavedPools;
