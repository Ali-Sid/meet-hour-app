import { create } from "zustand";
import ApiServices from "meet-hour-react-web-sdk";

const useCompletedMeetingsStore = create((set) => ({
  completedMeetings: [],
  isCompletedLoading: false,
  completedError: null,
  fetchCompletedMeetings: async (token, user) => {
    set({ isCompletedLoading: true });
    try {
      const response = await ApiServices.completedMeetings(token, {
        limit: 10,
        page: 1,
        show_all: 1,
      });
      const completedMeetingIds = response.meetings.map(
        (meeting) => meeting.meeting_id
      );
      const completedMeetingDetails = await Promise.all(
        completedMeetingIds.map((id) =>
          ApiServices.viewMeeting(token, { meeting_id: id })
        )
      );

      const completedMeetingEmails = completedMeetingDetails.flatMap((detail) =>
        detail.meeting_attendees
          .filter((attendee) => attendee.email === user.email)
          .map(() => detail.meeting.meeting_id)
      );

      const matchedCompletedMeetings = completedMeetingIds.filter((meetData) =>
        completedMeetingEmails.includes(meetData)
      );

      const filteredCompletedMeetings = response.meetings.filter((meeting) =>
        matchedCompletedMeetings.includes(meeting.meeting_id)
      );

      set({ completedMeetings: filteredCompletedMeetings });
    } catch (error) {
      set({ completedError: error.message });
    } finally {
      set({ isCompletedLoading: false });
    }
  },
}));

export default useCompletedMeetingsStore;
