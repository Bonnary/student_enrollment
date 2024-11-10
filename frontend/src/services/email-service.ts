interface EmailParams {
  to: string;
  url: string;
}

const emailApiUrl = import.meta.env.VITE_BACKEND_URL + "/send-email";

export const sendEmail = async (params: EmailParams) => {
  const response = await fetch(emailApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
};
