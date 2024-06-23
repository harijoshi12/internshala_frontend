// src/types/index.ts

// Opportunity related types
export interface Stipend {
  salary: string;
  tooltip: string | null;
  salaryValue1: number;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
  large_stipend_text: boolean;
}

export interface Location {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
}

export interface ApplicationStatusMessage {
  to_show: boolean;
  message: string;
  type: string;
}

export interface UserApplication {
  _id: string;
  status: string;
  userId: string;
  opportunityId: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Opportunity {
  _id: string;
  id: number;
  title: string;
  employment_type: string;
  application_status_message: ApplicationStatusMessage;
  job_title: string | null;
  work_from_home: boolean;
  segment: string;
  segment_label_value: string | null;
  internship_type_label_value: string | null;
  job_segments: string[];
  company_name: string;
  company_url: string;
  is_premium: boolean;
  is_premium_internship: boolean;
  employer_name: string;
  company_logo: string;
  type: string;
  url: string;
  is_internchallenge: number;
  is_external: boolean;
  is_active: boolean;
  expires_at: string;
  closed_at: string;
  profile_name: string;
  part_time: boolean;
  start_date: string;
  duration: string;
  stipend: Stipend;
  salary: string | null;
  job_experience: string | null;
  experience: string;
  posted_on: string;
  postedOnDateTime: number;
  application_deadline: string;
  expiring_in: string;
  posted_by_label: string;
  posted_by_label_type: string;
  location_names: string[];
  locations: Location[];
  start_date_comparison_format: string;
  start_date1: string;
  start_date2: string;
  is_ppo: boolean;
  is_ppo_salary_disclosed: boolean;
  ppo_salary: string | null;
  ppo_salary2: string | null;
  ppo_label_value: string;
  to_show_extra_label: boolean;
  extra_label_value: string;
  is_extra_label_black: boolean;
  campaign_names: string[];
  campaign_name: string;
  to_show_in_search: boolean;
  campaign_url: string;
  campaign_start_date_time: string | null;
  campaign_launch_date_time: string | null;
  campaign_early_access_start_date_time: string | null;
  campaign_end_date_time: string | null;
  labels: string[];
  is_covid_wfh_selected: boolean;
  to_show_card_message: boolean;
  message: string;
  is_application_capping_enabled: boolean;
  application_capping_message: string;
  override_meta_details: string[];
  eligible_for_easy_apply: boolean;
  eligible_for_b2b_apply_now: boolean;
  to_show_b2b_label: boolean;
  is_international_job: boolean;
  to_show_cover_letter: boolean;
  office_days: string | null;
  is_applied: boolean;
  applicationStatus?: string;
  userApplication: UserApplication[];
}

// User related types
export interface User {
  id: number;
  fullName: string;
  email: string;
  avatar: string | null;
  token: string;
}

// Auth related types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// API response types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
}