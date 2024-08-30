import { useEffect } from "react";
import useCompletedMeetingsStore from "../../stores/student/completedMeetingStore";
import useUserStore from "../../stores/student/userStore";

const useFetchCompletedMeetings = () => {
  const { user, token } = useUserStore();
  const { fetchCompletedMeetings } = useCompletedMeetingsStore();

  useEffect(() => {
    if (user && token) {
      fetchCompletedMeetings(token, user);
    }
  }, [user, token, fetchCompletedMeetings]);
};

export default useFetchCompletedMeetings;
