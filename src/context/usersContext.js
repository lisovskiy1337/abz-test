import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = useCallback(async (p = 1) => {
    try {
      const url = `https://frontend-test-assignment-api.abz.agency/api/v1/users`;
      const response = await axios.get(url, {
        params: {
          page: p,
          count: 6,
        },
      });

      const { data } = response;
      if (data.success) {
        const newUsers = data.users.map((user) => ({
          ...user,
          id: uuidv4(),
        }));
        setUsers([...newUsers]);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handlePagination = useCallback(async () => {
    try {
      const data = await fetchUsers(page + 1);
      const newUsers = data.users.map((user) => ({
        ...user,
        id: uuidv4(),
      }));
      setUsers([...users, ...newUsers]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(page + 1 !== data.total_pages);
    } catch (error) {
      console.log("Error:", error.message);
    }
  }, [page, fetchUsers, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const value = useMemo(() => {
    return {
      users,
      fetchUsers,
      hasMore,
      handlePagination,
    };
  }, [users, fetchUsers, hasMore, handlePagination]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
