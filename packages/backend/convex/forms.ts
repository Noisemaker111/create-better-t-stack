import { convexForms } from "form-to-inbox/server";

export const {
  submitForm,
  getAllSubmissions,
  getSubmissionsByType,
  getNewSubmissions,
  updateStatus,
  sendNotification,
} = convexForms({
  defaultTo: "btggutters@gmail.com",
  defaultFrom: "noreply@btggutters.com",
  sendEmailOnSubmit: true,
});
