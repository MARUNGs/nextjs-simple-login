// after
export const USERNAME_VALIDATION = {
  min: {
    value: 5,
    message: "사용자명은 5자 이상입니다.",
  },
  required: {
    message: "사용자명을 입력하세요.",
  },
  invalid: {
    message: "올바른 형식으로 입력하세요.",
  },
};

export const EMAIL_VALIDATION = {
  regex: {
    value: /@zod.com/g,
    message: "오직 [@zod.com]이메일만 허용됩니다.",
  },
  email: {
    message: "이메일 형식으로 작성하세요.",
  },
  required: {
    message: "이메일을 입력하세요.",
  },
  invalid: {
    message: "올바른 형식으로 입력하세요.",
  },
};

export const PASSWORD_VALIDATION = {
  min: {
    value: 10,
    message: "비밀번호는 10자 이상입니다.",
  },
  regex: {
    value: /[0-9]+/g,
    message: "비밀번호는 1개 이상의 숫자를 포함합니다.",
  },
  required: {
    message: "비밀번호를 입력하세요.",
  },
};

// before
export const USERNAME_MIN = 5;
export const USERNAME_MIN_ERROR = "사용자명은 5자 이상입니다.";

export const EMAIL_REGEX = /@zod.com/g;
export const EMAIL_REGEX_ERROR = '오직 "@zod.com"이메일만 허용됩니다.';

export const PASSWORD_MIN = 10;
export const PASSWORD_MIN_ERROR = "비밀번호는 10자 이상입니다.";
export const PASSWORD_REGEX = /[0-9]+/g;
export const PASSWORD_REGEX_ERROR = "비밀번호는 1개 이상의 숫자를 포함합니다.";

export const invalid_type_error = "올바른 형식으로 입력하세요.";
export const required_error = "이메일을 입력하세요.";
