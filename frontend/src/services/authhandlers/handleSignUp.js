const handleSignUp = async (
  name,
  email,
  password,
  phone_number,
  toast,
  navigate,
  checkEmailFormat,
  setIsLoading,
  setEmailError,
  setPhoneError,
  setError
) => {
  setIsLoading(true);
  setEmailError("");
  setPhoneError("");
  setError("");

  const emailRegex = /^[0-9a-zA-Z]{12}@kletech\.ac\.in$/;
  const phoneRegex = /^[789]\d{9}$/;
  const trimmedPhone = phone_number.trim();

  if (!emailRegex.test(email)) {
    setEmailError("Use your KLE Tech email!");
    setIsLoading(false);
    return;
  }

  if (!phoneRegex.test(trimmedPhone)) {
    setPhoneError("Phone Number should be 10 digits starting with 7, 8, or 9");
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone_number: trimmedPhone }),
    });

    const data = await response.json();
    console.log("Response data:", data);

    if (response.status === 200) {
      toast.success("Account created successfully. Proceed to the login page!");
      navigate("/login");
    } else if (response.status === 401) {
      setEmailError("Email already exists");
    } else if (response.status === 402) {
      setEmailError("Use your Strathmore email!");
    } else if (response.status === 403) {
      setPhoneError("Phone Number should be 10 digits starting with 7, 8, or 9");
    } else {
      setError(data.message || "Unexpected error. Please try again.");
    }
  } catch (error) {
    console.error("Sign up error:", error);
    setError("Unable to send request. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

export default handleSignUp;
