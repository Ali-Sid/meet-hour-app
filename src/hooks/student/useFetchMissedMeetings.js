import { useEffect } from "react";
import useMissedMeetingsStore from "../../stores/student/missedMeetingStore";
import useUserStore from "../../stores/student/userStore";

const useFetchMissedMeetings = () => {
  const { user, token } = useUserStore();
  const { fetchMissedMeetings } = useMissedMeetingsStore();

  useEffect(() => {
    if (user && token) {
      fetchMissedMeetings(token, user);
    }
  }, [user, token, fetchMissedMeetings]);
};

export default useFetchMissedMeetings;
