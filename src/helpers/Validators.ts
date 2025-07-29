interface ValidateProps {
  id: string;
  password: string;
  name: string;
  mobile: string;
  email: string;
  gst: string;
  code: string;
  percentage: number;
}

export const ValidateId = (id: ValidateProps["id"]) => {
  if (id?.trim() === "") {
    return 1;
  }
  return false;
};

export const ValidatePassword = (password: ValidateProps["password"]) => {
  if (password?.trim() === "") {
    return 1;
  }
  if (
    !/^(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}$/.test(
      password
    )
  ) {
    return 2;
  }
  return false;
};

export const ValidateLoginPassword = (password: ValidateProps["password"]) => {
  if (password?.trim() === "") {
    return 1;
  }
  if (password?.length < 6) {
    return 2;
  }
  return false;
};

// export const ValidateName = (name: ValidateProps["name"]) => {
//   if (name?.trim() === "") {
//     return 1;
//   }
//   return false;
// };
export const ValidateName = (name: any) => {
  if (name === undefined || name === null) return 1;
  if (typeof name !== "string" && typeof name !== "number") return 1;
  if (String(name).trim() === "") return 1;
  return false;
};

export const ValidateMobile = (mobile: ValidateProps["mobile"]) => {
  if (mobile?.trim() === "") {
    return 1;
  }
  // if (!/^\+65\s?[89]\d{7}$/.test(mobile)) {
  //   return 2;
  // }
  return false;
};

export const ValidateEmail = (email: ValidateProps["email"]) => {
  if (email?.trim() === "") {
    return 1;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    return 2;
  }
  return false;
};

export const ValidatePercentage = (percentage: ValidateProps["percentage"]) => {
  if (percentage > 100 || percentage < 0) {
    return 1;
  }
  return false;
};
