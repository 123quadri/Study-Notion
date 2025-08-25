// utils/constants.js with CommonJS syntax
const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
}

const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
}

const CACHE_EXPIRATION = 24 * 3600;

const CACHE_KEY = {
  ALL_COURSES: "all_courses",
}

module.exports = {
  ACCOUNT_TYPE,
  COURSE_STATUS,
  CACHE_EXPIRATION,
  CACHE_KEY
}