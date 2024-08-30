import { create } from "zustand";
import ApiServices from "meet-hour-react-web-sdk";

const useMissedMeetingsStore = create((set) => ({
  missedMeetings: [],
  meetingIds: [],
  isMissedLoading: false,
  missedError: null,
  fetchMissedMeetings: async (token, user) => {
    set({ isMissedLoading: true });
    try {
      const response = await ApiServices.missedMeetings(token, {
        limit: 10,
        page: 1,
      });
      const meetings = response.meetings;
      set({
        missedMeetings: meetings,
        meetingIds: meetings.map((meetingID) => meetingID.meeting_id),
      });

      console.log(meetings, "get the meetings data...");
      // Fetch meeting details for each meeting ID
      const meetingDetails = await Promise.all(
        meetings.map((meeting) =>
          ApiServices.viewMeeting(token, { meeting_id: meeting.meeting_id })
        )
      );
      console.log(
        meetingDetails,
        "viewMeeting================================"
      );

      // Filter meeting emails based on the user's email
      const meetingEmails = meetingDetails.flatMap((detail) => {
        console.log(detail, "all details: ");
        return detail.meeting_attendees
          .filter((attendee) => attendee.email === user.email)
          .map(() => detail.meeting.meeting_id);
      });
      console.log(meetingEmails, "email meetiiiiiiiiiiiing details");

      // Find matched missed meetings
      const matchedMissedMeetings = get().meetingIds.filter((id) =>
        meetingEmails.includes(id)
      );
      console.log(matchedMissedMeetings, "meetings maatccheeddd!!!");

      // Filter missed meetings based on matched IDs
      const filteredMissedMeetings = meetings.filter((meeting) =>
        matchedMissedMeetings.includes(meeting.meeting_id)
      );

      set({ missedMeetings: filteredMissedMeetings });
    } catch (error) {
      set({ missedError: error.message });
    } finally {
      set({ isMissedLoading: false });
      console.log(get().missedMeetings, "Filtered missed meetings");
    }
  },
}));

export default useMissedMeetingsStore;
